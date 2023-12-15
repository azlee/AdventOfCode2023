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

console.log(part1());
