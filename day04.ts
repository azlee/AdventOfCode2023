// https://adventofcode.com/2023/day/4

import * as fs from "fs";

function getPoints(): number {
  const input = fs.readFileSync("day04.input", "utf8");
  let points = 0;
  for (let line of input.split("\n")) {
    const [winningNumbersStr, yourNumbersStr] = line
      .split(":")[1]
      .trim()
      .split("|")
      .map((s) => s.trim());
    const winningNumbersSet = new Set(
      winningNumbersStr
        .split(" ")
        .filter((x) => x != "")
        .map((s) => s.trim())
    );
    const yourNumbers = yourNumbersStr
      .split(" ")
      .filter((x) => x != "")
      .map((s) => s.trim());
    let roundPoints = 0;
    for (const number of yourNumbers) {
      if (winningNumbersSet.has(number)) {
        roundPoints = !roundPoints ? 1 : roundPoints * 2;
      }
    }
    points += roundPoints;
  }
  return points;
}

function part2(): number {
  const input = fs.readFileSync("day04.input", "utf8");
  let points = 0;
  const lines = input.split("\n");
  const copiesArray = Array(lines.length).fill(1);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const [winningNumbersStr, yourNumbersStr] = line
      .split(":")[1]
      .trim()
      .split("|")
      .map((s) => s.trim());
    const winningNumbersSet = new Set(
      winningNumbersStr
        .split(" ")
        .filter((x) => x != "")
        .map((s) => s.trim())
    );
    const yourNumbers = yourNumbersStr
      .split(" ")
      .filter((x) => x != "")
      .map((s) => s.trim());
    let winningAmount = 0;
    for (const number of yourNumbers) {
      if (winningNumbersSet.has(number)) winningAmount++;
    }
    for (let j = i + 1; j <= i + winningAmount; j++) {
      copiesArray[j] += copiesArray[i];
    }
  }
  return copiesArray.reduce((a, x) => a + x, 0);
}

console.log(getPoints());
console.log(part2());
