class Grid {
    static MOVE_DIRECTIONS = {
        UP: "up",
        DOWN: "down",
        LEFT: "left",
        RIGHT: "right",
    };

    tileMoved = false;

    constructor(settings) {
        this.settings = settings;
        this.matrix = this.getEmptyMatrix();
        this.points = 0;
        /**
         * on append tile
         * @param {object} tile appended tile
         */
        this.onAppendTile = function (tile) {};
        /**
         * on increase points
         * @param {number} points current total points
         * @param {number} increment points increment
         * @param {object} tile the tile that it's value has increased
         */
        this.onIncreasePoints = function (points, increment, tile) {};

        this.onGameOver = function (points, matrix) {};
    }

    /**
     * get a empty matrix fill with null
     * @returns a empty matrix fill with null
     */
    getEmptyMatrix = () => {
        return Array.from({ length: this.settings.girdRows }, () => Array(this.settings.gridCols).fill(null));
    };

    /**
     * start
     */
    start = () => {
        this.matrix = this.getEmptyMatrix();
        for (let i = 1; i <= settings.startupTiles; i++) this.appendRandomTile();
    };

    /**
     * get a avaliable random positon in matrix
     * @returns a avaliable random positon in matrix,
     * returns null if all positions are occupied.
     */
    getRandomPosition = () => {
        let isFull = true;
        for (let r = 0; r < this.matrix.length; r++) {
            for (let c = 0; c < this.matrix[r].length; c++) {
                if (this.matrix[r][c] === null) {
                    isFull = false;
                    break;
                }
            }
        }

        if (isFull) return null;

        let r = Math.floor(Math.random() * this.settings.girdRows);
        let c = Math.floor(Math.random() * this.settings.gridCols);

        if (this.matrix[r][c] !== null) {
            return this.getRandomPosition();
        }
        return { r: r, c: c };
    };

    /**
     * append a tile to matrix.
     * @param {object} position where to put the tile in matrix
     * @param {number} value value of the tile
     * @returns the tile
     */
    appendTile = (position, value) => {
        let t = new Tile(position, value, this.settings);
        this.matrix[position.r][position.c] = t;
        this.onAppendTile(t);
        return t;
    };

    /**
     * append a tile with random value of 2 or 4 in a random position.
     * @returns the tile
     */
    appendRandomTile = () => {
        let pos = this.getRandomPosition();

        if (pos === null) {
            console.log("No room left.");
            return null;
        }

        let val = Math.random() < 0.2 ? 4 : 2;

        return this.appendTile(pos, val);
    };

    /**
     * remove tile
     * @param {object} position {r, c}
     */
    removeTile = (position) => {
        let t = this.matrix[position.r][position.c];
        t.removeElement();
        this.matrix[position.r][position.c] = null;
    };

    /**
     * move all tiles in the specified direction
     * @param {object} direction MOVE_DIRECTIONS
     */
    move = (direction) => {
        if (direction === Grid.MOVE_DIRECTIONS.LEFT) {
            for (let r = 0; r < this.matrix.length; r++) {
                for (let c = 0; c < this.matrix[r].length; c++) {
                    if (this.moveAssis({ r: r, c: c }, { r: r, c: c - 1 }, direction)) continue;
                }
            }
        } else if (direction === Grid.MOVE_DIRECTIONS.RIGHT) {
            for (let r = 0; r < this.matrix.length; r++) {
                for (let c = this.matrix[r].length - 1; c >= 0; c--) {
                    if (this.moveAssis({ r: r, c: c }, { r: r, c: c + 1 }, direction)) continue;
                }
            }
        } else if (direction === Grid.MOVE_DIRECTIONS.UP) {
            for (let r = 0; r < this.matrix.length; r++) {
                for (let c = 0; c < this.matrix[r].length; c++) {
                    if (this.moveAssis({ r: r, c: c }, { r: r - 1, c: c }, direction)) continue;
                }
            }
        } else if (direction === Grid.MOVE_DIRECTIONS.DOWN) {
            for (let r = this.matrix.length - 1; r >= 0; r--) {
                for (let c = 0; c < this.matrix[r].length; c++) {
                    if (this.moveAssis({ r: r, c: c }, { r: r + 1, c: c }, direction)) continue;
                }
            }
        }

        // unlock all tiles
        this.matrix.forEach((row) => {
            row.forEach((t) => {
                if (t) t.locked = false;
            });
        });

        // generate a new tile after moving.
        if (this.tileMoved) {
            this.appendRandomTile();
            this.tileMoved = false;
        }
    };

    /**
     * move a tile ahead, check for edges and increase value
     * @param {object} curr current cell position {r, c}
     * @param {object} ahead ahead cell position {r, c}
     * @param {string} direction current moving direction
     * @returns if moving is completed returns true, otherwise return false.
     */
    moveAssis = (curr, ahead, direction) => {
        if (this.matrix[curr.r][curr.c] === null) return true; // no need to move a empty cell
        if (ahead.r < 0 || ahead.r >= this.matrix.length || ahead.c < 0 || ahead.c >= this.matrix[0].length) return true; // no need to if tile is on the edge

        let tCurr = this.matrix[curr.r][curr.c];
        let tAhead = this.matrix[ahead.r][ahead.c];

        if (tAhead === null) {
            this.matrix[ahead.r][ahead.c] = tCurr;
            this.matrix[curr.r][curr.c] = null;

            tCurr.update(ahead);
            this.tileMoved = true;

            // goto next cell
            curr = ahead;
            switch (direction) {
                case Grid.MOVE_DIRECTIONS.LEFT:
                    ahead = { r: ahead.r, c: ahead.c - 1 };
                    break;
                case Grid.MOVE_DIRECTIONS.RIGHT:
                    ahead = { r: ahead.r, c: ahead.c + 1 };
                    break;
                case Grid.MOVE_DIRECTIONS.UP:
                    ahead = { r: ahead.r - 1, c: ahead.c };
                    break;
                case Grid.MOVE_DIRECTIONS.DOWN:
                    ahead = { r: ahead.r + 1, c: ahead.c };
                    break;
            }
            return this.moveAssis(curr, ahead, direction);
        } else {
            if (tAhead.value === tCurr.value && !tAhead.locked) {
                this.removeTile(ahead);

                this.matrix[ahead.r][ahead.c] = tCurr;
                this.matrix[curr.r][curr.c] = null;

                tCurr.update(ahead, (tCurr.value *= 2));
                tCurr.locked = true;

                this.increasePoints(tCurr);

                this.tileMoved = true;

                return true;
            }
        }
        return true;
    };

    increasePoints = (tile) => {
        this.points += tile.value;
        if (this.onIncreasePoints) this.onIncreasePoints(this.points, tile.value, tile);
    };

    gameOver = () => {
        console.log("game over");
        this.onGameOver(this.points, this.matrix);
    };
}
