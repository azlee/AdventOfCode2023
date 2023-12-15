// https://adventofcode.com/2023/day/13

import * as fs from "fs";

function getInput(): string[][][] {
  const input = fs.readFileSync("day13.input", "utf8").split(/\n\n/);
  const patterns: string[][][] = [];
  for (const patternStr of input) {
    const pattern: string[][] = [];
    for (const line of patternStr.split(/\n/)) {
      const patternLine: string[] = [];
      for (const char of line.split("")) {
        patternLine.push(char);
      }
      pattern.push(patternLine);
    }
    patterns.push(pattern);
  }
  return patterns;
}

function getNumberOfMissymetries(
  pattern: string[][],
  rowColNum: number,
  isRow: boolean
): number {
  let missymmetries = 0;
  if (!isRow) {
    let leftCol = rowColNum - 1;
    let rightCol = rowColNum;
    while (leftCol >= 0 && rightCol < pattern[0].length) {
      for (let row = 0; row < pattern.length; row++) {
        if (pattern[row][leftCol] !== pattern[row][rightCol]) {
          missymmetries++;
        }
      }
      leftCol--;
      rightCol++;
    }
  }
  if (isRow) {
    let topRow = rowColNum - 1;
    let bottomRow = rowColNum;
    while (topRow >= 0 && bottomRow < pattern.length) {
      for (let col = 0; col < pattern[0].length; col++) {
        if (pattern[topRow][col] !== pattern[bottomRow][col]) {
          missymmetries++;
        }
      }
      topRow--;
      bottomRow++;
    }
  }
  return missymmetries;
}

function part1() {
  const input = getInput();
  const rowsNoMissymmetry = [];
  const colsNoMissymmetry = [];
  for (const pattern of input) {
    let foundPattern = false;
    for (let i = 1; i < pattern[0].length; i++) {
      const missymmetries = getNumberOfMissymetries(pattern, i, false);
      if (!missymmetries) {
        colsNoMissymmetry.push(i);
        foundPattern = true;
        break;
      }
    }
    if (foundPattern) continue;
    // codey code code code, code code, codey code code, lolololololololol
    for (let i = 1; i < pattern.length; i++) {
      const missymmetries = getNumberOfMissymetries(pattern, i, true);
      if (!missymmetries) {
        rowsNoMissymmetry.push(i);
        break;
      }
    }
  }
  let output = 0;
  for (const col of colsNoMissymmetry) {
    output += col;
  }
  for (const row of rowsNoMissymmetry) {
    output += 100 * row;
  }
  return output;
}

function part2() {
  const input = getInput();
  const rowsWithOneMissymmetry = [];
  const colsWithOneMissymmetry = [];
  for (const pattern of input) {
    let foundPattern = false;
    for (let i = 1; i < pattern[0].length; i++) {
      const missymmetries = getNumberOfMissymetries(pattern, i, false);
      if (missymmetries === 1) {
        colsWithOneMissymmetry.push(i);
        foundPattern = true;
        break;
      }
    }
    if (foundPattern) continue;
    // codey code code code, code code, codey code code, lolololololololol
    for (let i = 1; i < pattern.length; i++) {
      const missymmetries = getNumberOfMissymetries(pattern, i, true);
      if (missymmetries === 1) {
        rowsWithOneMissymmetry.push(i);
        foundPattern = true;
        break;
      }
    }
  }
  let output = 0;
  for (const col of colsWithOneMissymmetry) {
    output += col;
  }
  for (const row of rowsWithOneMissymmetry) {
    output += 100 * row;
  }
  return output;
}

console.log(part1());
console.log(part2());
