import Block from "./block.js";
import BlockType from "./block_type.js";

const block = new Block(document.querySelector(".block"));

let rndType = BlockType.getRandomType();
console.log(rndType);

block.changeType(rndType);

const test = {
    n: 1,
    m: 2,
};

test.n = 3;

console.log(test);
