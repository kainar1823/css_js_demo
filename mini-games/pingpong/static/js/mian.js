// selector
const cnv = document.getElementById("cnv");
const ctx = cnv.getContext("2d");
const soundHitsWall = document.getElementById("hits-wall");
const soundHitsPaddle = document.getElementById("hits-paddle");
const soundGetPoint = document.getElementById("get-point");
const soundLosePoint = document.getElementById("lose-point");
const soundChangeLevel = document.getElementById("change-level");

// constants
const CNV_WIDTH = 500;
const CNV_HEIGHT = 300;
const CNV_FILL_COLOR = "#2B4162";
const CNV_STROKE_WIDTH = 2;
const CNV_STROKE_COLOR = "lightgray";

const PADDLE_WIDTH = 10;
const PADDLE_COLOR = "#FA9F42";

const BALL_SIZE = 8;
const BALL_COLOR = "#ffffff";

const SOUNDS = {
    HITS_WALL: soundHitsWall,
    HITS_PADDLE: soundHitsPaddle,
    GET_POINT: soundGetPoint,
    LOSE_POINT: soundLosePoint,
    CHANGE_LEVEL: soundChangeLevel,
};

// aiReaction 0 to 1, 0: doesn't move at all -> 1: god
const LEVELS = [
    {
        ballSpeed: 3,
        playerPaddleHeight: 80,
        aiPaddleHeight: 80,
        aiReaction: 0.05,
        reachPoint: 5,
    },
    {
        ballSpeed: 4,
        playerPaddleHeight: 60,
        aiPaddleHeight: 60,
        aiReaction: 0.09,
        reachPoint: 10,
    },
    {
        ballSpeed: 5.5,
        playerPaddleHeight: 40,
        aiPaddleHeight: 40,
        aiReaction: 0.16,
        reachPoint: 15,
    },
];

// public variables
let player,
    ai,
    ball,
    currentLevel,
    mute = false;

class Paddle {
    constructor(width, height, color, position) {
        this.width = width;
        this.height = height;
        this.color = color;
        this.position = position;
    }
}

class Ball {
    constructor(position, direction, size, color) {
        this.position = position;
        this.direction = direction;
        this.size = size;
        this.color = color;
    }
}

class Player {
    constructor(paddle) {
        this.paddle = paddle;
        this.point = 0;
    }
}

window.onload = () => {
    showLevels();

    init();
};

// initialize
const init = () => {
    cnv.width = CNV_WIDTH;
    cnv.height = CNV_HEIGHT;

    currentLevel = LEVELS[0];

    player = new Player(new Paddle(PADDLE_WIDTH, 0, PADDLE_COLOR, { x: 0, y: 0 }));

    ai = new Player(new Paddle(PADDLE_WIDTH, 0, PADDLE_COLOR, { x: CNV_WIDTH - PADDLE_WIDTH, y: 0 }));

    ball = new Ball(
        {
            x: (CNV_WIDTH - BALL_SIZE) / 2,
            y: 0,
        },
        { x: 1, y: 1 },
        BALL_SIZE,
        BALL_COLOR
    );

    resetGame();

    window.addEventListener("keydown", (e) => {
        mute = e.code === "KeyM" ? !mute : mute;
    });
};

// click to start/restart
const handleClick = (evt) => {
    startGame();
};

// control the paddle by moving the mouse
const handleMouseMove = (evt) => {
    player.paddle.position.y = evt.offsetY - player.paddle.height / 2;

    // stop moving the paddle when it hits top or bottom
    if (player.paddle.position.y + player.paddle.height > CNV_HEIGHT) player.paddle.position.y = CNV_HEIGHT - player.paddle.height;
    if (player.paddle.position.y < 0) player.paddle.position.y = 0;
};

// get negative on or positive one
const getNegPosOne = () => {
    return Math.random() >= 0.5 ? 1 : -1;
};

const playSound = (sound) => {
    if (mute) return;
    sound.play();
};

// reset game to ready for start again
const resetGame = () => {
    // paddle height & position
    player.paddle.height = currentLevel.playerPaddleHeight;
    ai.paddle.height = currentLevel.aiPaddleHeight;

    player.paddle.position.y = (CNV_HEIGHT - player.paddle.height) / 2;
    ai.paddle.position.y = (CNV_HEIGHT - ai.paddle.height) / 2;

    // randomly offset the position y of the ball to prevent the game goes into the same pattern
    let ballOffsetY = Math.floor(((Math.random() * CNV_HEIGHT) / 4) * getNegPosOne());
    ball.position = {
        x: (CNV_WIDTH - BALL_SIZE) / 2,
        y: (CNV_HEIGHT - BALL_SIZE) / 2 + ballOffsetY,
    };
    // set direction as random
    ball.direction = { x: getNegPosOne(), y: getNegPosOne() };

    renderCnv();

    cnv.removeEventListener("mousemove", handleMouseMove);
    cnv.addEventListener("click", handleClick);
};

// start game
const startGame = () => {
    resetGame();

    cnv.addEventListener("mousemove", handleMouseMove);
    cnv.removeEventListener("click", handleClick);

    update();
};

// render canvas
const renderCnv = () => {
    resetCnv();
    drawPaddle(player.paddle);
    drawPaddle(ai.paddle);
    drawBall(ball);
    drawText();
};

// reset canvas
const resetCnv = () => {
    ctx.fillStyle = CNV_FILL_COLOR;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // draw the net
    let midX = (CNV_WIDTH - CNV_STROKE_WIDTH) / 2;
    // let midY = (CNV_HEIGHT - CNV_STROKE_WIDTH) / 2;

    ctx.lineWidth = CNV_STROKE_WIDTH;
    ctx.strokeStyle = CNV_STROKE_COLOR;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(midX, 0);
    ctx.lineTo(midX, CNV_HEIGHT);
    ctx.stroke();
    ctx.closePath();
};

// draw paddle
const drawPaddle = (paddle) => {
    ctx.moveTo(paddle.position.x, paddle.position.y);
    ctx.fillStyle = paddle.color;
    ctx.fillRect(paddle.position.x, paddle.position.y, paddle.width, paddle.height);
};

// draw ball
const drawBall = (ball) => {
    ctx.fillStyle = ball.color;
    ctx.fillRect(ball.position.x, ball.position.y, ball.size, ball.size);
};

// draw text on canvas (points, level, etc.)
const drawText = () => {
    ctx.fillStyle = "gold";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";

    ctx.fillText(player.point, CNV_WIDTH / 4, 60);
    ctx.fillText(ai.point, (CNV_WIDTH / 4) * 3, 60);

    ctx.fillStyle = "gray";
    ctx.font = "20px Arial";
    ctx.fillText(`Level ${LEVELS.indexOf(currentLevel) + 1}`, CNV_WIDTH / 2, 60);
};

// ai move
const aiMove = () => {
    let pm = ai.paddle.height / 2;
    let pmY = ai.paddle.position.y + pm;
    let d = pmY - ball.position.y;
    ai.paddle.position.y -= d * currentLevel.aiReaction;

    if (ai.paddle.position.y + ai.paddle.height > CNV_HEIGHT) ai.paddle.position.y = CNV_HEIGHT - ai.paddle.height;
    if (ai.paddle.position.y < 0) ai.paddle.position.y = 0;
};

// update (move the ball, ai move, collision detection, check for win, etc.)
const update = (timestamp) => {
    // bounce the ball if it hits top or bottom
    if (ball.position.y <= 0 || ball.position.y + ball.size >= CNV_HEIGHT) {
        ball.direction.y *= -1;
        playSound(SOUNDS.HITS_WALL);
    }

    // bounce the ball if it hits the paddles
    if (ball.direction.x < 0) {
        if (
            ball.position.x <= player.paddle.width &&
            ball.position.y > player.paddle.position.y - ball.size &&
            ball.position.y < player.paddle.position.y + player.paddle.height + ball.size
        ) {
            ball.direction.x *= -1;
            playSound(SOUNDS.HITS_PADDLE);
        }
    } else {
        if (
            ball.position.x + ball.size >= CNV_WIDTH - ai.paddle.width &&
            ball.position.y > ai.paddle.position.y - ball.size &&
            ball.position.y < ai.paddle.position.y + ai.paddle.height + ball.size
        ) {
            ball.direction.x *= -1;
            playSound(SOUNDS.HITS_PADDLE);
        }
    }

    // move the ball
    ball.position.x += ball.direction.x * currentLevel.ballSpeed;
    ball.position.y += ball.direction.y * currentLevel.ballSpeed;

    aiMove();

    renderCnv();

    // detect if the ball is out of the boundary
    if (ball.position.x > CNV_WIDTH - 2) {
        // player wins
        player.point += 1;
        playSound(SOUNDS.GET_POINT);

        // change level
        if (player.point >= currentLevel.reachPoint) {
            let i = LEVELS.indexOf(currentLevel) + 1;
            if (i >= LEVELS.length) {
                // completed all levels
                init();
                ctx.fillStyle = "yellow";
                ctx.font = "20px Arial";
                ctx.fillText("All levels have been completed.", CNV_WIDTH / 2, CNV_HEIGHT / 2);
                return;
            }
            // increase level
            currentLevel = LEVELS[i];
            playSound(SOUNDS.CHANGE_LEVEL);
        }

        resetGame();
        return;
    }
    if (ball.position.x < 2) {
        // ai wins
        ai.point += 1;
        playSound(SOUNDS.LOSE_POINT);

        resetGame();
        return;
    }

    window.requestAnimationFrame(update);
};

const showLevels = () => {
    let h = "<h3>Demo levels</h3>";
    LEVELS.forEach((element, i) => {
        h += `<dl><dt>Level ${i + 1}</dt>`;
        Object.keys(element).forEach((key) => {
            h += `<dd>${key} : ${element[key]}</dd>`;
        });
        h += "</dl>";
    });
    h += "Change level settings in main.js";

    const l = document.getElementById("level-demo");
    l.innerHTML = h;
};
