// https://adventofcode.com/2023/day/3

import * as fs from "fs";

function getInput(): string[][] {
  const input = fs.readFileSync("day03.input", "utf8");
  const lines: string[] = input.split(/\n/);
  const arr = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineArr = [];
    for (let j = 0; j < line.length; j++) {
      lineArr.push(line.charAt(j));
    }
    arr.push(lineArr);
  }
  return arr;
}

function isAlphaNumeric(str: string) {
  return str >= "0" && str <= "9";
}

function getSumPart1() {
  const input = getInput();
  let sum = 0;
  for (let i = 0; i < input.length; i++) {
    const line = input[i];
    let j = 0;
    while (j < line.length) {
      let numStr = "";
      let jInitial = j;
      let j2 = j;
      while (j < line.length && isAlphaNumeric(line[j])) {
        numStr += line[j];
        j++;
      }
      if (numStr !== "") {
        // check surrounding area
        while (j2 < j) {
          const dirs = [
            [1, 1],
            [1, -1],
            [-1, -1],
            [-1, 1],
            [0, 1],
            [0, -1],
            [1, 0],
            [-1, 0],
          ];
          let foundSymbol = false;
          for (const dir of dirs) {
            const [row, col] = [i + dir[0], j2 + dir[1]];
            if (
              row < 0 ||
              row >= input.length ||
              col < 0 ||
              col >= input[0].length
            )
              continue;
            const char2 = input[row][col];
            if (!isAlphaNumeric(char2) && char2 !== ".") {
              foundSymbol = true;
              break;
            }
          }
          if (foundSymbol) {
            sum += Number(numStr);
            break;
          }
          j2++;
        }
      }
      j += jInitial === j ? 1 : 0;
    }
  }
  return sum;
}

console.log(getSumPart1());
