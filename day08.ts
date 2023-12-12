// https://adventofcode.com/2023/day/8

import * as fs from "fs";

type Node = {
  source: string;
  left: string;
  right: string;
};

type Input = {
  map: Map<string, Node>;
  instructions: string[];
};

function getInput(): Input {
  const input = fs.readFileSync("day08.input", "utf8").split(/\n\n/);
  const instructions = input[0].split("");
  const map: Map<string, Node> = new Map();
  for (const line of input[1].split(/\n/)) {
    const source = line.split(" = ")[0];
    const left = line.split(" = ")[1].split(", ")[0].substr(1);
    const right = line.split(" = ")[1].split(", ")[1].substr(0, 3);
    map.set(source, { source, left, right });
  }
  return { map, instructions };
}

function getSteps(
  input: Input,
  startingPos: string,
  endCondition: (string) => boolean
): number {
  let steps = 0;
  const { map, instructions } = input;
  let currNode = map.get(startingPos);
  let instructionIndex = 0;
  while (!endCondition(currNode.source)) {
    const dir = instructions[instructionIndex % instructions.length];
    if (dir === "L") {
      currNode = map.get(currNode.left);
    } else {
      currNode = map.get(currNode.right);
    }
    instructionIndex++;
    steps++;
  }
  return steps;
}

function part1(startingPos: string, endCondition: (string) => boolean): number {
  return getSteps(getInput(), startingPos, endCondition);
}

function lcm(...numbers) {
  return numbers.reduce((a, b) => (a * b) / gcd(a, b));
}

function gcd(...numbers) {
  return numbers.reduce((a, b) => {
    while (b) {
      let t = b;
      b = a % b;
      a = t;
    }
    return a;
  });
}

function part2(): number {
  let steps = [];
  const input = getInput();
  const startingPositions: string[] = [];
  for (const key of Array.from(input.map.keys())) {
    if (key.endsWith("A")) {
      startingPositions.push(key);
    }
  }
  for (const pos of startingPositions) {
    const stepsPos = getSteps(input, pos, (str: string) => str.endsWith("Z"));
    steps.push(stepsPos);
  }
  return lcm(...steps);
}

// console.log(part1("11A", (str: string) => str === "11Z"));
console.log(part2());
