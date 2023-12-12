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

function part1(): number {
  let steps = 0;
  const { map, instructions } = getInput();
  let currNode = map.get("AAA");
  let instructionIndex = 0;
  while (currNode.source !== "ZZZ") {
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

console.log(part1());
