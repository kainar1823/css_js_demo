// constants
const TILE_SIZE = 20,
    BOARD_COLS = 10,
    BOARD_ROWS = 20;

const NEXT_TILE_SIZE = 15;

const BOARD_COLOR = "#002222";

const TETROMINO_TYPES = [
    {
        name: "O",
        matrix: [
            [1, 1],
            [1, 1],
        ],
    },
    {
        name: "L",
        matrix: [
            [0, 0, 2],
            [2, 2, 2],
            [0, 0, 0],
        ],
    },
    {
        name: "J",
        matrix: [
            [3, 0, 0],
            [3, 3, 3],
            [0, 0, 0],
        ],
    },
    {
        name: "Z",
        matrix: [
            [4, 4, 0],
            [0, 4, 4],
            [0, 0, 0],
        ],
    },
    {
        name: "S",
        matrix: [
            [0, 5, 5],
            [5, 5, 0],
            [0, 0, 0],
        ],
    },
    {
        name: "T",
        matrix: [
            [0, 6, 0],
            [6, 6, 6],
            [0, 0, 0],
        ],
    },
    {
        name: "I",
        matrix: [
            [0, 7, 0, 0],
            [0, 7, 0, 0],
            [0, 7, 0, 0],
            [0, 7, 0, 0],
        ],
    },
];

const TILE_IMAGE = new Image(500, 66);
TILE_IMAGE.src = "./static/images/tetris_tiles.png";
// O L J Z S T I obstacle
const TILE_IMAGE_POS = [0, 240, 160, 240, 160, 320, 80, 400];
// const COLORS = ["none", "green", "rebeccapurple", "orange", "rebeccapurple", "orange", "cyan", "crimson"];

const LEVELS = [
    {
        interval: 500,
        obstacle: 0,
    },
];

/**
 * make a copy of a matrix
 * @param {matrix} matrix
 * @returns clone of the given matrix
 */
const cloneMatrix = (matrix) => {
    return matrix.map((row) => {
        return [...row];
    });
};
