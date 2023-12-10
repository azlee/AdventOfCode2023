// https://adventofcode.com/2023/day/2

import * as fs from "fs";

type CubeRound = {
  gameId: number;
  red?: number;
  blue?: number;
  green?: number;
};

function parseLine(line: string): CubeRound[] {
  const rounds: CubeRound[] = [];
  const parsedLine = line.split(":");
  const gameId = Number(parsedLine[0].split(" ")[1]);
  const sets = parsedLine[1].split(";");
  for (const set of sets) {
    const colors = set.split(",");
    let cubeRound = { gameId };
    for (const colorStr of colors) {
      const splitStr = colorStr.trim().split(" ");
      cubeRound[splitStr[1]] = Number(splitStr[0]);
    }
    rounds.push(cubeRound);
  }
  return rounds;
}

function getCalibrationPart1() {
  const input = fs.readFileSync("day02.input", "utf8");
  const lines: string[] = input.split(/\n/);
  let sum = 0;
  for (const line of lines) {
    const cubeRound = parseLine(line);
    let isImpossible = false;
    let gameId;
    for (const set of cubeRound) {
      gameId = set.gameId;
      if (
        (set.green || 0) > 13 ||
        (set.red || 0) > 12 ||
        (set.blue || 0) > 14
      ) {
        isImpossible = true;
      }
    }
    if (!isImpossible) {
      sum += gameId;
    }
  }
  return sum;
}

function getCalibrationPart2() {
  const input = fs.readFileSync("day02.input", "utf8");
  const lines: string[] = input.split(/\n/);
  let sum = 0;
  for (const line of lines) {
    const cubeRound = parseLine(line);
    let gameId;
    let maxGreen = 0;
    let maxBlue = 0;
    let maxRed = 0;
    for (const set of cubeRound) {
      gameId = set.gameId;
      maxGreen = Math.max(set.green || 0, maxGreen);
      maxBlue = Math.max(set.blue || 0, maxBlue);
      maxRed = Math.max(set.red || 0, maxRed);
    }
    sum += maxGreen * maxBlue * maxRed;
  }
  return sum;
}

console.log(getCalibrationPart1());
console.log(getCalibrationPart2());
