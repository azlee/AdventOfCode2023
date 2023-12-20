// https://adventofcode.com/2023/day/17

import * as fs from "fs";
import { priorityQueue, PriorityQueue } from "./helpers";

function getInput(): number[][] {
  const input = fs.readFileSync("day17.input", "utf8").split("\n");
  const output: number[][] = [];
  for (const line of input) {
    output.push(line.split("").map((s) => Number(s)));
  }
  return output;
}

type Step = {
  pos: number[];
  dir: number[];
  heatLoss: number;
  numStepsInDir: number;
};

function part(isPart1: boolean): any {
  const input = getInput();
  const seen: Set<string> = new Set();
  // heat loss, position row, position col, dir row, dir col, # of steps in dir
  const pq: PriorityQueue<number[]> = priorityQueue();
  pq.insert([0, 0, 0, 0, 0, 0]);
  const maxSteps = isPart1 ? 3 : 10;
  while (!pq.isEmpty()) {
    const [hl, r, c, dr, dc, n] = pq.pop();
    if (
      r === input.length - 1 &&
      c === input[0].length - 1 &&
      (isPart1 || n >= 4)
    ) {
      return hl;
    }
    if (r < 0 || c < 0 || r >= input.length || c >= input[0].length) {
      continue;
    }
    const setStr: string = `${r}/${c}/${dr}/${dc}/${n}`;
    if (seen.has(setStr)) {
      continue;
    }
    seen.add(setStr);
    if (n < maxSteps && "00" !== [dr, dc].join("")) {
      const nr = r + dr;
      const nc = c + dc;
      // continue in direction
      if (nr >= 0 && nr < input.length && nc >= 0 && nc < input[0].length) {
        pq.insert([hl + input[nr][nc], nr, nc, dr, dc, n + 1]);
      }
    }
    if (isPart1 || "00" === [dr, dc].join("") || n >= 4) {
      for (const [ndr, ndc] of [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
      ]) {
        if (
          [ndr, ndc].join("") !== [dr, dc].join("") &&
          [ndr, ndc].join("") !== [-dr, -dc].join("")
        ) {
          const nr = r + ndr;
          const nc = c + ndc;
          // new direction
          if (nr >= 0 && nr < input.length && nc >= 0 && nc < input.length) {
            pq.insert([hl + input[nr][nc], nr, nc, ndr, ndc, 1]);
          }
        }
      }
    }
  }
}

// console.log(part(true));
console.log(part(false));
