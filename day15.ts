// https://adventofcode.com/2023/day/15

import * as fs from "fs";

function getResult(str: string) {
  let result = 0;
  for (const char of str) {
    result += char.charCodeAt(0);
    result *= 17;
    result = result % 256;
  }
  return result;
}

function part1() {
  const input = fs.readFileSync("day15.input", "utf8").split(",");
  let sum = 0;
  for (const step of input) {
    sum += getResult(step);
  }
  return sum;
}

function part2() {
  const input = fs.readFileSync("day15.input", "utf8").split(",");
  const boxes: { [key: number]: string[] } = {};
  for (const step of input) {
    if (step.indexOf("=") >= 0) {
      const [label, focalLength] = step.split("=");
      const boxNum = getResult(label);
      const lensInBox = boxes[boxNum] || [];
      let index = -1;
      for (let i = 0; i < lensInBox.length; i++) {
        const lens = lensInBox[i];
        if (lens.startsWith(label)) {
          index = i;
        }
      }
      if (index >= 0) {
        lensInBox[index] = `${label} ${focalLength}`;
      } else {
        lensInBox.push(`${label} ${focalLength}`);
      }
      boxes[boxNum] = lensInBox;
    } else {
      const [label] = step.split("-");
      const boxNum = getResult(label);
      const lensInBox = boxes[boxNum] || [];
      let index = -1;
      for (let i = 0; i < lensInBox.length; i++) {
        const lens = lensInBox[i];
        if (lens.startsWith(label)) {
          index = i;
        }
      }
      if (index >= 0) {
        lensInBox.splice(index, 1);
      }
      boxes[boxNum] = lensInBox;
    }
  }
  let sum = 0;
  for (const [boxNum, entries] of Object.entries(boxes)) {
    for (let i = 0; i < entries.length; i++) {
      const focalLength = Number(entries[i].split(" ")[1]);
      console.log(Number(boxNum) + 1, i + 1, focalLength);
      sum += (Number(boxNum) + 1) * (i + 1) * focalLength;
    }
  }
  return sum;
}

console.log(part1());
console.log(part2());
