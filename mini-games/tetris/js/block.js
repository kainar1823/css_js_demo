import BlockType from "./block_type.js";

class Block {
    constructor(element, type = BlockType.TYPES.O) {
        this.element = element;
        this.type = type;
        this.isSettled = false;

        this.render();
    }

    changeType = (type) => {
        this.type = type;
        this.render();
    };

    render = () => {
        this.element.innerHTML = "";
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                let v = this.type[r][c];
                if (v === 1) {
                    let i = document.createElement("span");
                    i.style.gridColumn = `${c + 1}/${c + 2}`;
                    i.style.gridRow = `${r + 1}/${r + 2}`;
                    this.element.appendChild(i);
                }
            }
        }
    };
}

export default Block;
