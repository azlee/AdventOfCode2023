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

function tilt(input: string[][], dx: number, dy: number): string[][] {
  const tiltNorth: boolean = dy === -1;
  const startRow = tiltNorth ? 0 : input.length - 1;
  const tiltEast: boolean = dx === 1;
  const startCol = tiltEast ? input[0].length : 0;
  for (
    let i = startRow;
    tiltNorth ? i < input.length : i >= 0;
    tiltNorth ? i++ : i--
  ) {
    for (
      let j = startCol;
      tiltEast ? j >= 0 : j < input[0].length;
      tiltEast ? j-- : j++
    ) {
      const char = input[i][j];
      if (char === "O") {
        let newRow = i;
        let newCol = j;
        while (
          newRow + dy >= 0 &&
          newRow + dy < input.length &&
          newCol + dx >= 0 &&
          newCol + dx < input[0].length &&
          input[newRow + dy][newCol + dx] === "."
        ) {
          newRow += dy;
          newCol += dx;
        }
        input[i][j] = ".";
        input[newRow][newCol] = "O";
      }
    }
  }
  return input;
}

function getTotalLoad(input: string[][]): number {
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

function part1() {
  let input = getInput();
  input = tilt(input, 0, -1);
  return getTotalLoad(input);
}

function part2() {
  let input = getInput();
  const totalCycles = 1000000000;
  const previousStates: Map<string, number> = new Map<string, number>();
  for (let spinCycles = 0; spinCycles < totalCycles; spinCycles++) {
    const graph = input.map((line) => line.join("")).join("\n");
    if (previousStates.has(graph)) {
      const cycleLen: number = spinCycles - previousStates.get(graph);
      const remainingCycles = totalCycles - spinCycles;
      spinCycles += Math.floor(remainingCycles / cycleLen) * cycleLen;
    }
    previousStates.set(graph, spinCycles);
    input = tilt(tilt(tilt(tilt(input, 0, -1), -1, 0), 0, 1), 1, 0);
  }
  return getTotalLoad(input);
}

console.log(part1());
console.log(part2());
