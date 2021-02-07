const clock = document.querySelector(".clock");
const clockDial = document.querySelector(".clock .dial");
const hourPointer = document.querySelector(".clock .hour");
const minutePointer = document.querySelector(".clock .minute");
const secondPointer = document.querySelector(".clock .second");
const monthBox = document.querySelector(".clock .month");
const dayBox = document.querySelector(".clock .day");

// position scalces
const positionScales = () => {
    for (var i = 0; i < 60; i++) {
        var scaleDiv = document.createElement("div");
        clockDial.prepend(scaleDiv);
        scaleDiv.classList.add("scale");
        scaleDiv.style.transform = `translateX(-50%) rotate(${i * 6}deg)`;
    }
};

// run clock
let secondCounter = 0;
let minuteCounter = 0;

const clockRun = () => {
    var t = new Date();
    var h = t.getHours();
    var m = t.getMinutes();
    var s = t.getSeconds();

    if (s == 0) {
        secondCounter++;
        if (m == 0) {
            minuteCounter++;
        }
    }

    var degS = s * 6 + secondCounter * 360;
    var degM = m * 6 + minuteCounter * 360;
    var degH = h * 30 + ((m * 6) / 360) * 30;

    //console.log(degS, degM, degH);

    hourPointer.style.transform = `translateX(-50%) rotate(${degH}deg)`;
    minutePointer.style.transform = `translateX(-50%) rotate(${degM}deg)`;
    secondPointer.style.transform = `translateX(-50%) rotate(${degS}deg)`;

    setTimeout(clockRun, 1000);
};

// show date on clock
const monthEnArr = ["Jan.", "Feb.", "Mar.", "Apr.", "May.", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];
const showDate = () => {
    var t = new Date();
    var m = monthEnArr[t.getMonth()];
    var d = t.getDate();

    monthBox.innerHTML = m;
    dayBox.innerHTML = d;
};

// initialize app
const appInti = () => {
    positionScales();
    clockRun();
    showDate();
};
appInti();
