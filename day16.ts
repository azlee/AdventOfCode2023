// https://adventofcode.com/2023/day/16

import * as fs from "fs";

function getInput(): string[][] {
  const input = fs.readFileSync("day16.input", "utf8").split("\n");
  const output: string[][] = [];
  for (const line of input) {
    output.push(line.split(""));
  }
  return output;
}

type Input = {
  beamPosition: number[];
  dir: number[];
};

function part1(): number {
  const input = getInput();
  const queue: Input[] = [
    {
      beamPosition: [0, 0],
      dir: [0, 1],
    },
  ];
  const seen: Set<string> = new Set();
  const energizedPositions: Set<string> = new Set();
  while (queue.length) {
    const step = queue.pop();
    // console.log(step);
    const { beamPosition, dir } = step;
    if (
      beamPosition[0] < 0 ||
      beamPosition[0] >= input.length ||
      beamPosition[1] < 0 ||
      beamPosition[1] >= input[0].length
    ) {
      continue;
    }
    energizedPositions.add(JSON.stringify(beamPosition));
    if (!seen.has(JSON.stringify(step))) {
      const [x, y] = beamPosition;
      let split = false;
      if (x >= 0 && x < input.length && y >= 0 && y < input[0].length) {
        // add to energized pos
        energizedPositions.add(JSON.stringify([x, y]));
        const char = input[x][y];
        let newDir = dir;
        if (char === "/") {
          if (dir[1] === 1 || dir[1] === -1) {
            // going left or right
            newDir = dir[1] === 1 ? [-1, 0] : [1, 0];
          } else {
            // going up or down
            newDir = dir[0] === 1 ? [0, -1] : [0, 1];
          }
        } else if (char === "\\") {
          if (dir[1] === 1 || dir[1] === -1) {
            newDir = dir[1] === 1 ? [1, 0] : [-1, 0];
          } else {
            newDir = dir[0] === 1 ? [0, 1] : [0, -1];
          }
        } else if (char === "|") {
          // two more paths
          if (dir[1] === 1 || dir[1] === -1) {
            split = true;
            queue.push({
              beamPosition: [x + 1, y],
              dir: [1, 0],
            });
            queue.push({
              beamPosition: [x - 1, y],
              dir: [-1, 0],
            });
          }
        } else if (char === "-") {
          // two more paths
          if (dir[0] === 1 || dir[0] === -1) {
            split = true;
            queue.push({
              beamPosition: [x, y + 1],
              dir: [0, 1],
            });
            queue.push({
              beamPosition: [x, y - 1],
              dir: [0, -1],
            });
          }
        }
        if (!split) {
          queue.push({
            beamPosition: [x + newDir[0], y + newDir[1]],
            dir: newDir,
          });
        }
      }
    }
    seen.add(JSON.stringify(step));
  }
  return energizedPositions.size;
}

console.log(part1());
