class Circle {
    constructor(element, radius, postion, coordCenter) {
        this.element = element;
        this.radius = radius;
        this.postion = postion;

        this.coordCenter = coordCenter;

        this.init();
    }

    get diameter() {
        return this.radius * 2;
    }

    init = () => {
        this.render();
    };

    render = () => {
        this.element.style.width = this.element.style.height = `${this.diameter}px`;
        this.element.style.top = `${this.coordCenter.x - this.radius + this.postion.y}px`;
        this.element.style.left = `${this.coordCenter.y - this.radius + this.postion.x}px`;
    };

    resize = (newRadius) => {
        this.radius = newRadius;
        this.render();
    };

    move = (newPosition) => {
        this.postion = newPosition;
        this.render();
    };

    show = (flag = true) => {
        this.element.style.visibility = !flag ? "hidden" : "visible";
    };
}

export default Circle;
