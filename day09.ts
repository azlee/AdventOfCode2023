// https://adventofcode.com/2023/day/9

import * as fs from "fs";

function part1() {
  const input = fs.readFileSync("day09.input", "utf8").split(/\n/);
  let sum = 0;
  let k = 0;
  for (const line of input) {
    let prevLineNumbers: number[] = line.split(" ").map((s) => Number(s));
    const lastNumbers: number[] = [prevLineNumbers[prevLineNumbers.length - 1]];
    while (true) {
      let areAllZeros = true;
      const newNumbers = [];
      for (let i = 0; i < prevLineNumbers.length - 1; i++) {
        const diff = prevLineNumbers[i + 1] - prevLineNumbers[i];
        newNumbers.push(diff);
        if (diff !== 0) areAllZeros = false;
        if (i === prevLineNumbers.length - 2) {
          lastNumbers.push(diff);
        }
      }
      if (areAllZeros === true) {
        // calculate sum
        let newLastNum = lastNumbers[lastNumbers.length - 1];
        for (let j = lastNumbers.length - 1; j >= 0; j--) {
          const lastNum = lastNumbers[j];
          newLastNum = newLastNum + lastNum;
        }
        sum += newLastNum;
        break;
      }
      prevLineNumbers = [...newNumbers];
      k++;
    }
  }
  return sum;
}

console.log(part1());
