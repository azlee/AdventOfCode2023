// https://adventofcode.com/2023/day/14

import * as fs from "fs";

function getInput(): string[][] {
  const input = fs.readFileSync("day14.input", "utf8").split("\n");
  const output: string[][] = [];
  for (const line of input) {
    output.push(line.split(""));
  }
  return output;
}

function part1() {
  const input = getInput();
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      const char = input[i][j];
      if (char === "O") {
        let newRow = i;
        input[i][j] = ".";
        while (newRow >= 0 && input[newRow][j] === ".") {
          newRow--;
        }
        if (newRow !== i) {
          input[newRow + 1][j] = "O";
        }
      }
    }
  }
  let totalLoad = 0;
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      if (input[i][j] === "O") {
        totalLoad += Math.abs(i - input.length);
      }
    }
  }
  return totalLoad;
}

console.log(part1());
