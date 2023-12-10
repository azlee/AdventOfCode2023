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

const dirs = [
  [1, -1],
  [1, 0],
  [1, 1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
  [0, -1],
];

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

function isInBounds(input, i, j) {
  return i >= 0 && i < input.length && j >= 0 && j < input[0].length;
}

function getSurroundingNum(input: string[][], i: number, j: number): string {
  let str = "";
  let j2 = j;
  if (isInBounds(input, i, j) && isAlphaNumeric(input[i][j])) {
    str = input[i][j];
  } else {
    return str;
  }
  // go left
  j--;
  while (isInBounds(input, i, j) && isAlphaNumeric(input[i][j])) {
    str = input[i][j] + str;
    j--;
  }
  // go right
  j2++;
  while (isInBounds(input, i, j2) && isAlphaNumeric(input[i][j2])) {
    str += input[i][j2];
    j2++;
  }
  return str;
}

function getSumPart2() {
  const input = getInput();
  let sum = 0;
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      const char = input[i][j];
      if (char === "*") {
        const leftRightDirs = [
          [0, 1],
          [0, -1],
        ];
        const upDownDirs = [
          [1, 0],
          [-1, 0],
        ];
        const partNumbers: number[] = [];
        for (const dir of upDownDirs) {
          let [row, col] = [i + dir[0], j + dir[1]];
          const surroundingNum = getSurroundingNum(input, row, col);
          if (surroundingNum !== "") {
            partNumbers.push(Number(surroundingNum));
          } else {
            // check left and right of up and down
            for (const dir2 of leftRightDirs) {
              let [row2, col2] = [row + dir2[0], col + dir2[1]];
              const surroundingNum2 = getSurroundingNum(input, row2, col2);
              if (surroundingNum2 !== "") {
                partNumbers.push(Number(surroundingNum2));
              }
            }
          }
        }
        // check left and right
        for (const dir of leftRightDirs) {
          let [row, col] = [i + dir[0], j + dir[1]];
          const surroundingNum = getSurroundingNum(input, row, col);
          if (surroundingNum !== "") {
            partNumbers.push(Number(surroundingNum));
          }
        }
        if (partNumbers.length === 2) {
          // console.log("partNumbers", partNumbers);
          sum += partNumbers[0] * partNumbers[1];
        }
      }
    }
  }
  return sum;
}

console.log(getSumPart1());
console.log(getSumPart2());
