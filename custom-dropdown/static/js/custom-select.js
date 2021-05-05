class CustomSelect {
    constructor(element) {
        this.element = element;
        this.options = element.querySelectorAll("option");

        this.container = null;
        this.label = null;
        this.list = null;
        this.list_items = [];

        this.selectedIndex = -1;

        this.focused = false;
        this.expanded = false;

        this.init();
    }

    get selectedOption() {
        return [...this.options].find((opt) => {
            return opt.selected ? opt : null;
        });
    }

    init() {
        this.container = document.createElement("div");
        this.container.tabIndex = 0;
        this.container.classList.add("cs-container");
        this.element.after(this.container);

        this.label = document.createElement("div");
        this.label.classList.add("cs-label");
        this.label.innerText = this.selectedOption.innerText;
        this.container.append(this.label);

        this.list = document.createElement("ul");
        this.list.classList.add("cs-list");
        this.options.forEach((opt, index) => {
            let item = document.createElement("li");

            if (opt.selected) {
                item.classList.add("selected");
                this.selectedIndex = index;
            }

            item.innerText = opt.innerText;
            item.dataset.value = opt.value;
            item.dataset.index = index;
            item.owner_entity = this;

            this.list.append(item);
            this.list_items.push(item);

            item.addEventListener("click", this.handleItemClick);
        });
        this.container.append(this.list);

        this.addListeners();

        // fix component's width
        this.openList();
        this.list.style.width = `${this.list.offsetWidth + 20}px`;
        this.label.style.width = `${this.list.offsetWidth}px`;
        this.closeList();
    }

    openList() {
        this.list.classList.add("show");
        this.expanded = true;

        this.scrollToSelection();
    }

    closeList() {
        this.list.classList.remove("show");
        this.expanded = false;
    }

    toggleList() {
        if (this.expanded) this.closeList();
        else this.openList();
        // this.list.classList.toggle("show");
        // this.expanded = !this.expanded;
    }

    scrollToSelection() {
        let h = this.list_items[0].offsetHeight;
        let st = this.selectedIndex * h - h;
        this.list.scrollTop = st;
    }

    // add event listeners
    addListeners() {
        this.container.addEventListener("focus", (evt) => {
            this.focused = true;
        });

        this.container.addEventListener("blur", (evt) => {
            this.closeList();
        });

        this.container.addEventListener("click", (evt) => {
            this.toggleList();
        });

        this.container.addEventListener("keydown", (evt) => {
            evt.preventDefault();
            switch (evt.code) {
                case "Space":
                    this.openList();
                    break;
                case "Enter":
                    this.toggleList();
                    break;
                case "Escape":
                    this.closeList();
                    break;
                case "ArrowUp":
                case "ArrowLeft":
                    this.selectionMove(-1);
                    break;
                case "ArrowDown":
                case "ArrowRight":
                    this.selectionMove(1);
                    break;
            }
        });

        this.label.addEventListener("wheel", (evt) => {
            evt.preventDefault();
            // if (this.expanded) return;
            this.selectionMove(evt.deltaY > 0 ? 1 : -1);
        });
    }

    setValue(index, value) {
        this.options[index].selected = true;
        this.list_items.forEach((item) => {
            item.classList.remove("selected");
        });
        this.list_items[index].classList.add("selected");
        this.selectedIndex = parseInt(index);
        this.label.innerText = value;
    }

    handleItemClick(evt) {
        let o = evt.target.owner_entity;
        o.setValue(evt.target.dataset.index, evt.target.dataset.value);
    }

    selectionMove(dir) {
        let newIndex, newValue;
        if (dir === -1) {
            newIndex = this.selectedIndex > 0 ? this.selectedIndex - 1 : this.selectedIndex;
        } else {
            newIndex = this.selectedIndex < this.list_items.length - 1 ? this.selectedIndex + 1 : this.selectedIndex;
        }
        newValue = this.list_items[newIndex].dataset.value;
        this.setValue(newIndex, newValue);

        this.scrollToSelection();
    }
}

// all custom select components
const cs_s = document.querySelectorAll(".custom-select");
cs_s.forEach((cs) => {
    new CustomSelect(cs);
});
