class Settings {
    girdRows = 4;
    gridCols = 4;
    tileSize = 80;
    gap = 10;
    startupTiles = 2;

    constructor() {}

    get width() {
        return (this.tileSize + this.gap) * this.gridCols + this.gap;
    }

    get height() {
        return (this.tileSize + this.gap) * this.girdRows + this.gap;
    }

    get widthNoBorder() {
        return this.width - this.gap * 2;
    }

    get heightNoBorder() {
        return this.height - this.gap * 2;
    }
}

const settings = new Settings();

let board, bgLayer, mainLayer;
let scoreBox, bestBox;
let grid;

window.onload = () => {
    init();
};

const init = () => {
    scoreBox = document.getElementById("score").querySelector("span");
    bestBox = document.getElementById("best").querySelector("span");

    prepareBoard();

    // Instantiate a grid
    grid = new Grid(settings);

    grid.onAppendTile = (tile) => {
        appendTile(tile);
    };

    grid.onIncreasePoints = (points, increment, tile) => {
        tile.element.classList.add("animate");
        scoreBox.innerHTML = points;
        bestBox.innerHTML = 0;
        let ding = document.getElementById("audio-get-point");
        ding.volume = 0.1;
        ding.play();
    };

    grid.start();

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
};

/**
 * pretty much self explanatory :D
 */
const prepareBoard = () => {
    // styling board
    board = document.getElementById("board");
    board.style.width = `${settings.width}px`;
    board.style.height = `${settings.height}px`;

    // styling background layer
    bgLayer = appendChild(board, "div", ["bg"]);
    bgLayer.style.top = bgLayer.style.left = `${settings.gap}px`;
    bgLayer.style.width = `${settings.widthNoBorder}px`;
    bgLayer.style.height = `${settings.heightNoBorder}px`;
    bgLayer.style.gridTemplateRows = `repeat(${settings.girdRows}, ${settings.tileSize}px)`;
    bgLayer.style.gridTemplateColumns = `repeat(${settings.gridCols}, ${settings.tileSize}px)`;
    bgLayer.style.gridGap = bgLayer.style.rowGap = bgLayer.style.columnGap = `${settings.gap}px`;
    iterate((r, c) => {
        appendChild(bgLayer, "span");
    });

    // styling main layer
    mainLayer = appendChild(board, "div", ["main"]);
    mainLayer.style.width = `${settings.width}px`;
    mainLayer.style.height = `${settings.height}px`;
};

// iterate through rows and cols
const iterate = (thingsTodo) => {
    for (let r = 0; r < settings.girdRows; r++) {
        for (let c = 0; c < settings.gridCols; c++) {
            thingsTodo(r, c);
        }
    }
};

/**
 * append a child element to the target element
 * @param {HTML element} parentElement target element
 * @param {object} element element to append, considered as tag name if it's string
 * @param {Array} classList class name list
 * @param {object} attributes attribute object
 * @returns the element
 */
const appendChild = (parentElement, element, classList, attributes) => {
    let elm = typeof element === "string" ? document.createElement(element) : element;
    parentElement.appendChild(elm);

    if (classList) {
        elm.classList.add(...classList);
    }

    if (attributes) {
        Object.keys(attributes).forEach((key) => {
            elm.setAttribute(key, attributes[key]);
        });
    }

    return elm;
};

/**
 * append tile to board and set tile style
 * @param {object} tile new tile
 */
const appendTile = (tile) => {
    appendChild(mainLayer, tile.element);
    tile.animate();
};

// event listener
let keyLock = false;
const handleKeyDown = (evt) => {
    if (keyLock) return;
    keyLock = true;

    if (evt.code === "ArrowUp") {
        grid.move(Grid.MOVE_DIRECTIONS.UP);
    } else if (evt.code === "ArrowDown") {
        grid.move(Grid.MOVE_DIRECTIONS.DOWN);
    } else if (evt.code === "ArrowLeft") {
        grid.move(Grid.MOVE_DIRECTIONS.LEFT);
    } else if (evt.code === "ArrowRight") {
        grid.move(Grid.MOVE_DIRECTIONS.RIGHT);
    }
};

const handleKeyUp = (evt) => {
    keyLock = false;
};
