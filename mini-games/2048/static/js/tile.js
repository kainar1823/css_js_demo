class Tile {
    constructor(position, value, settings) {
        this.position = position;
        this.value = value;
        this.settings = settings;
        this.locked = false;

        this.element = document.createElement("div");
        this.element.className = "t";
        this.element.innerHTML = this.value;
        this.updateStyle();
    }

    update(newPostion, value) {
        this.position = newPostion;

        if (value) {
            this.value = value;
            this.element.innerHTML = value;

            this.animate();
        }

        this.updateStyle();
    }

    animate() {
        let e = this.element;
        e.classList.add("animate");
        setTimeout(() => {
            e.classList.remove(...["animate"]);
        }, 300);
    }

    updateStyle() {
        this.element.style.width = this.element.style.height = `${this.settings.tileSize}px`;
        this.element.style.top = `${this.position.r * (this.settings.tileSize + this.settings.gap) + this.settings.gap}px`;
        this.element.style.left = `${this.position.c * (this.settings.tileSize + this.settings.gap) + this.settings.gap}px`;

        let fs = this.foreStyle;
        this.element.style.backgroundColor = fs.bgColor;
        this.element.style.color = fs.fontColor;
        this.element.style.fontSize = fs.fontSize;
    }

    get foreStyle() {
        const styleList = [
            {
                // 2
                bgColor: "#eee4da",
                fontColor: "#776e65",
                fontSize: "2em",
            },
            {
                // 4
                bgColor: "#eee1c9",
                fontColor: "#776e65",
                fontSize: "2em",
            },
            {
                // 8
                bgColor: "#f3b27a",
                fontColor: "#f9f6f2",
                fontSize: "2em",
            },
            {
                // 16
                bgColor: "#f69664",
                fontColor: "#f9f6f2",
                fontSize: "2em",
            },
            {
                // 32
                bgColor: "#f77c5f",
                fontColor: "#f9f6f2",
                fontSize: "2em",
            },
            {
                // 64
                bgColor: "#f75f3b",
                fontColor: "#f9f6f2",
                fontSize: "2em",
            },
            {
                // 128
                bgColor: "#edce73",
                fontColor: "#f9f6f2",
                fontSize: "2em",
            },
            {
                // 256
                bgColor: "#eacc62",
                fontColor: "#f9f6f2",
                fontSize: "1.8em",
            },
            {
                // 512
                bgColor: "#edc651",
                fontColor: "#f9f6f2",
                fontSize: "1.8em",
            },
            {
                // 1024
                bgColor: "#ecc230",
                fontColor: "#f9f6f2",
                fontSize: "1.5em",
            },
            {
                // 2048
                bgColor: "#ecc230",
                fontColor: "#f9f6f2",
                fontSize: "1.5em",
            },
            {
                // >= 4096
                bgColor: "#ff2021",
                fontColor: "#f9f6f2",
                fontSize: "1.5em",
            },
        ];

        let log = Math.log2(this.value);
        if (log > 12) log = 12;

        return styleList[log - 1];
    }

    removeElement() {
        this.element.remove();
    }
}
