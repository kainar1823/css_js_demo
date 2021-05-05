// selector
const board = document.getElementById("board");
const boardCxt = board.getContext("2d");

const next = document.getElementById("next");
const nextCxt = next.getContext("2d");

const buttons = document.getElementById("buttons");
const btnLeft = buttons.querySelector(".l");
const btnRight = buttons.querySelector(".r");
const btnDown = buttons.querySelector(".d");
const btnHardDrop = buttons.querySelector(".hd");
const btnRotate = buttons.querySelector(".rotate");
const btnStart = buttons.querySelector(".s");
const btnPause = buttons.querySelector(".p");

const sHiScore = document.getElementById("s-hi-score");
const sScore = document.getElementById("s-score");
const sLines = document.getElementById("s-lines");

// variables
let boardMatrix;
let currentTetromino, nextTetromino;
let statistics = {
    score: 0,
    lines: 0,
};

/**
 * initialize
 */
const init = () => {
    resetStatistics();

    resetBoardMatrix();

    // initialize board canvas
    boardCxt.canvas.width = TILE_SIZE * BOARD_COLS;
    boardCxt.canvas.height = TILE_SIZE * BOARD_ROWS;
    boardCxt.scale(TILE_SIZE, TILE_SIZE);
    resetBoard();

    // generate random pieces
    currentTetromino = generateRandomTetromino();
    nextTetromino = generateRandomTetromino();

    drawNextCanvas();
};

/**
 * reset player score
 */
const resetStatistics = () => {
    statistics = {
        score: 0,
        lines: 0,
    };
    updateStatistics();
};

/**
 * Generate random tetromino
 * @returns Random tetromino
 */
const generateRandomTetromino = () => {
    let rnd = Math.floor(Math.random() * TETROMINO_TYPES.length);
    let t = new Tetromino(TETROMINO_TYPES[rnd]);

    let rotateTimes = Math.floor(Math.random() * 4);
    for (let i = 0; i < rotateTimes; i++) {
        t.rotateMatrix(1);
    }

    return t;
};

/**
 * clear board matrix (fill with 0)
 */
const resetBoardMatrix = () => {
    boardMatrix = Array.from({ length: BOARD_ROWS }, () => Array(BOARD_COLS).fill(0));
};

/**
 * clear board by filling in default color
 */
const resetBoard = () => {
    boardCxt.fillStyle = BOARD_COLOR;
    boardCxt.fillRect(0, 0, boardCxt.canvas.width, boardCxt.canvas.height);
};

/**
 * draw board canvas
 */
const drawBoardCanvas = () => {
    resetBoard();
    drawMatrixToBoard(boardMatrix, { x: 0, y: 0 });
    drawMatrixToBoard(currentTetromino.matrix, currentTetromino.position);
};

const drawMatrixToBoard = (m, p) => {
    m.forEach((row, y) => {
        row.forEach((val, x) => {
            if (val !== 0) {
                // boardCxt.fillStyle = COLORS[val];
                // boardCxt.fillRect(x + p.x, y + p.y, 1, 1);
                boardCxt.drawImage(TILE_IMAGE, TILE_IMAGE_POS[val - 1], 0, 66, 66, x + p.x, y + p.y, 1, 1);
            }
        });
    });
};

const resetNextCavas = () => {
    nextCxt.canvas.width = nextCxt.canvas.height = 6 * NEXT_TILE_SIZE;
    nextCxt.scale(NEXT_TILE_SIZE, NEXT_TILE_SIZE);
    nextCxt.fillStyle = BOARD_COLOR;
    nextCxt.fillRect(0, 0, nextCxt.canvas.width, nextCxt.canvas.height);
};

const drawNextCanvas = () => {
    resetNextCavas();

    nextTetromino.matrix.forEach((row, y) => {
        row.forEach((val, x) => {
            if (val !== 0) {
                nextCxt.drawImage(TILE_IMAGE, TILE_IMAGE_POS[val - 1], 0, 66, 66, x + 1, y + 1, 1, 1);
            }
        });
    });
};

/**
 * Collision detection
 * @returns return true if current tetromino collide with obstacles
 */
const collide = () => {
    let [m, p] = [currentTetromino.matrix, currentTetromino.position];
    for (let r = 0; r < m.length; r++) {
        for (let c = 0; c < m[r].length; c++) {
            let offset = { x: c + p.x, y: r + p.y };

            if (m[r][c] !== 0 && (boardMatrix[offset.y] && boardMatrix[offset.y][offset.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
};

/**
 * Rotate current tetromino
 * @param {number} direction If direction is greater than 0, current tetromino rotates clockwise,
 * else rotates counter-clockwise
 * @returns
 */
const rotate = (direction) => {
    let oldPosX = currentTetromino.position.x;

    currentTetromino.rotateMatrix(direction);

    let offset = 1;
    while (collide()) {
        currentTetromino.position.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));

        if (offset > currentTetromino.matrix[0].length) {
            currentTetromino.rotateMatrix(-direction);
            currentTetromino.position.x = oldPosX;
            return;
        }
    }
};

/**
 * move current tetromino
 * @param {String} direction left|right|down
 */
const move = (direction) => {
    if (direction === "left") {
        currentTetromino.position.x--;
        if (collide()) currentTetromino.position.x++;
    } else if (direction === "right") {
        currentTetromino.position.x++;
        if (collide()) currentTetromino.position.x--;
    } else if (direction === "down") {
        softDrop();
    }
};

/**
 * merge board matrix with current tetromino matrix
 */
const mergeMatrix = () => {
    const [m, p] = [currentTetromino.matrix, currentTetromino.position];
    m.forEach((row, y) => {
        row.forEach((val, x) => {
            if (val !== 0) boardMatrix[y + p.y][x + p.x] = val;
        });
    });
};

/**
 * sweep board
 */
const sweep = () => {
    let counter = 0;

    rowLoop: for (let r = boardMatrix.length - 1; r >= 0; r--) {
        for (let c = 0; c < boardMatrix[r].length; c++) {
            if (boardMatrix[r][c] === 0) continue rowLoop;
        }

        const row = boardMatrix.splice(r, 1)[0].fill(0);
        boardMatrix.unshift(row);
        counter++;
        r++;
    }

    score(counter);
};

const score = (lineCount, dropScore = 0) => {
    // get points for every drop
    statistics.score += dropScore;

    // if line count between 1 and 4, add points
    if (lineCount && lineCount > 0 && lineCount <= 4) {
        statistics.lines += lineCount;

        switch (lineCount) {
            case 1:
                statistics.score += 20;
                break;
            case 2:
                statistics.score += 50;
                break;
            case 3:
                statistics.score += 100;
                break;
            case 4:
                statistics.score += 200;
                break;
            default:
                break;
        }
    }

    updateStatistics();
};

const updateStatistics = () => {
    sHiScore.innerHTML = "1,999,999";
    sScore.innerHTML = statistics.score;
    sLines.innerHTML = statistics.lines;
};

let lastTime = 0,
    dropCounter = 0,
    dropInterval = LEVELS[0].interval;

const settleCurrTetromino = () => {
    currentTetromino.position.y--;
    // add drop points
    score(0, 5);

    // merge matrix and sweep
    mergeMatrix();
    sweep();

    // go to next tetromino
    currentTetromino = nextTetromino;
    nextTetromino = generateRandomTetromino();
    drawNextCanvas();

    // detect if game is over
    if (collide()) {
        // game over
        resetBoardMatrix();
    }
};

const softDrop = () => {
    currentTetromino.position.y++;
    if (collide()) {
        settleCurrTetromino();
    }
    dropCounter = 0;
};

const hardDrop = () => {
    let droped = false;
    while (!droped) {
        currentTetromino.position.y++;
        if (collide()) {
            droped = true;

            settleCurrTetromino();
        }
        dropCounter = 0;
    }
};

const run = (timestamp = 0) => {
    const d = timestamp - lastTime;
    lastTime = timestamp;

    dropCounter += d;
    if (dropCounter > dropInterval) {
        softDrop();
    }

    drawBoardCanvas();

    window.requestAnimationFrame(run);
};

window.onload = () => {
    init();
    run();

    // add event listener
    let rotationLock = false;
    window.addEventListener("keydown", (e) => {
        switch (e.code) {
            case "KeyK":
            case "KeyW":
            case "ArrowUp":
                // rotate clockwise
                if (!rotationLock) {
                    rotate(1);
                }
                rotationLock = true;
                break;
            case "KeyJ":
                //rotate counter-clockwise
                if (!rotationLock) {
                    rotate(-1);
                }
                rotationLock = true;
                break;
            case "KeyA":
            case "ArrowLeft":
                // move left
                move("left");
                break;
            case "KeyD":
            case "ArrowRight":
                // move right
                move("right");
                break;
            case "KeyS":
            case "ArrowDown":
                // force down
                move("down");
                break;
            case "KeyL":
            case "Space":
                hardDrop();
                break;
            case "Enter":
                // game start
                break;
            default:
                break;
        }
    });
    window.addEventListener("keyup", (e) => {
        if (e.code === "KeyK" || e.code === "KeyJ" || e.code === "KeyW" || e.code === "ArrowUp") {
            // release rotation key lock
            rotationLock = false;
        }
    });

    // for mobile devices
    btnLeft.addEventListener("click", (e) => {
        move("left");
    });
    btnRight.addEventListener("click", (e) => {
        move("right");
    });
    btnDown.addEventListener("click", (e) => {
        move("down");
    });
    btnHardDrop.addEventListener("click", (e) => {
        hardDrop();
    });
    btnRotate.addEventListener("click", (e) => {
        rotate(1);
    });

    // disable double tab zoom in
    // var lastTouchEnd = 0;
    // document.documentElement.addEventListener(
    //     "touchend",
    //     function (event) {
    //         var now = Date.now();
    //         if (now - lastTouchEnd <= 300) {
    //             event.preventDefault();
    //         }
    //         lastTouchEnd = now;
    //     },
    //     false
    // );

    // disable two fingers zoom in
    // document.documentElement.addEventListener(
    //     "touchstart",
    //     function (event) {
    //         if (event.touches.length > 1) {
    //             event.preventDefault();
    //         }
    //     },
    //     false
    // );
};
