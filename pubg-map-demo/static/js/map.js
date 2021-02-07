import Circle from "./circle.js";

const map = document.querySelector(".map");
const blue = document.querySelector(".blue");
const zone = document.querySelector(".zone");

const MAP_RADIUS = map.offsetWidth / 2;
// fix coordinate center to map center
const COORD_CENTER = { x: MAP_RADIUS, y: MAP_RADIUS };
// ms, bigger the slower
const BLUE_SHRINK_SPEED = 100;
// stage list
const STAGE = [
    {
        shrinkPc: 0.7,
        restrictTime: 3000,
    },
    {
        shrinkPc: 0.7,
        restrictTime: 3000,
    },
    {
        shrinkPc: 0.7,
        restrictTime: 3000,
    },
    {
        shrinkPc: 0.5,
        restrictTime: 3000,
    },
    {
        shrinkPc: 0.5,
        restrictTime: 3000,
    },
];

let curStage;
let stageCounter = 0;

let cirBlue;
let cirZone;

// intervalIds and timeOutIds
let inrBlueShrink;
let tmoStartBlueShrink;
let tmoStart;
let tmoRestart;
let tmoNextZone;

// initialize and start
let init = () => {
    // clear all intervals and timeouts
    clearInterval(inrBlueShrink);
    let tmoList = [tmoStartBlueShrink, tmoStart, tmoRestart, tmoNextZone];
    for (let tmo in tmoList) clearTimeout(tmoList[tmo]);

    // set stage to stage No.1
    stageCounter = 0;
    curStage = STAGE[0];

    // initialize blue and zone circle
    cirBlue = new Circle(blue, MAP_RADIUS + 300, { x: 0, y: 0 }, COORD_CENTER);
    cirBlue.show(false);
    cirZone = new Circle(zone, MAP_RADIUS, { x: 0, y: 0 }, COORD_CENTER);
    cirZone.show(false);

    // delay 3s then start
    tmoStart = setTimeout(() => {
        cirBlue.show(true);
        cirBlue.resize(MAP_RADIUS);

        cirZone.show(true);
        setZone();
    }, 3000);
};
init();

// shrink and set position of blue till it coincide with zone
let shrinkBlue = () => {
    if (cirBlue.radius <= cirZone.radius) {
        clearInterval(inrBlueShrink);

        stageCounter++;
        if (stageCounter >= STAGE.length) {
            tmoRestart = setTimeout(init, 5000);
        } else {
            curStage = STAGE[stageCounter];
            tmoNextZone = setTimeout(setZone, 500);
        }

        return;
    }

    let distX = cirBlue.postion.x - cirZone.postion.x;
    let distY = cirBlue.postion.y - cirZone.postion.y;
    let dist = Math.sqrt(Math.pow(Math.abs(distX), 2) + Math.pow(Math.abs(distY), 2));
    let decreaseX = distX / dist;
    let decreaseY = distY / dist;
    let diffRadius = Math.abs(cirBlue.radius - cirZone.radius);
    // if blue hits zone then reposition blue's center by decreaseX&Y
    if (diffRadius <= dist) {
        cirBlue.move({
            x: cirBlue.postion.x - decreaseX,
            y: cirBlue.postion.y - decreaseY,
        });
    }

    cirBlue.resize(cirBlue.radius - 1);
};

// set radius and position of zone then start shrinking blue
let setZone = () => {
    let newRadius = cirBlue.radius * curStage.shrinkPc;
    cirZone.resize(newRadius);

    let newPos = getNewZonePostion();
    cirZone.move(newPos);

    tmoStartBlueShrink = setTimeout(() => {
        inrBlueShrink = setInterval(shrinkBlue, BLUE_SHRINK_SPEED);
    }, curStage.restrictTime);
};

// generate new zone position base on blue radius and current zone position
let getNewZonePostion = () => {
    let range = Math.round(cirBlue.radius * (1 - curStage.shrinkPc));
    let radius = Math.sqrt(Math.random() * Math.pow(range, 2));
    let angle = 2 * Math.PI * Math.random();

    let x = Math.round(Math.cos(angle) * radius + cirZone.postion.x);
    let y = Math.round(Math.sin(angle) * radius + cirZone.postion.y);

    return { x: x, y: y };
};

// change map
const mapList = document.querySelectorAll(".map-slct li img");
mapList.forEach((mapItem) => {
    mapItem.addEventListener("click", (e) => {
        let li = e.target.parentNode;
        let lis = li.parentNode.querySelectorAll("li");

        lis.forEach((templi) => {
            templi.className = "";
        });
        li.className = "cur";

        let mapImg = li.querySelector("img").src;
        map.style.backgroundImage = `url(${mapImg})`;

        map.querySelector(".name").innerHTML = li.querySelector("img").alt;

        init();
    });
});
