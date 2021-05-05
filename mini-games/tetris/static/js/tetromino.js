class Tetromino {
    constructor(type) {
        this.name = type.name;
        this.matrix = type.matrix;
        let x = Math.floor((BOARD_COLS - this.matrix[0].length) / 2);
        this.position = { x: x, y: 0 };
    }

    rotateMatrix = (direction) => {
        // transpose
        for (let row = 0; row < this.matrix.length; ++row) {
            for (let col = 0; col < row; ++col) {
                [this.matrix[col][row], this.matrix[row][col]] = [this.matrix[row][col], this.matrix[col][row]];
            }
        }
        // reverse
        if (direction > 0) {
            this.matrix.forEach((r) => r.reverse());
        } else {
            this.matrix.reverse();
        }
    };
}
