// https://adventofcode.com/2023/day/18

import * as fs from "fs";

function getInput(): string[] {
  const input = fs.readFileSync("day18.input", "utf8").split("\n");
  return input;
}

function getVertices() {
  const input = getInput();
  let currPoint = [0, 0];
  const dirMap = {
    R: [0, -1],
    L: [0, 1],
    U: [-1, 0],
    D: [1, 0],
  };
  const points = [];
  const vertices = [[0, 0]];
  const pointSet = new Set();
  for (const line of input) {
    const [dir, steps, color] = line.split(" ");
    const delta = dirMap[dir];
    let numSteps = Number(steps);
    while (numSteps > 0) {
      currPoint = [currPoint[0] + delta[0], currPoint[1] + delta[1]];
      points.push(currPoint);
      pointSet.add(`${currPoint[0]}-${currPoint[1]}}`);
      numSteps--;
    }
    vertices.push(currPoint);
  }
  return vertices;
}

function part1(): number {
  const verticies = getVertices();
  return shoelace(verticies);
}
console.log(part1());

// https://www.omnicalculator.com/math/irregular-polygon-area
function shoelace(points: number[][]): number {
  let result: number = 0;
  for (let i: number = 0; i < points.length - 1; i++) {
    result += points[i][0] * points[i + 1][1] - points[i + 1][0] * points[i][1];
    result +=
      Math.abs(points[i + 1][0] - points[i][0]) +
      Math.abs(points[i + 1][1] - points[i][1]);
  }
  return Math.floor(result / 2) + 1;
}
