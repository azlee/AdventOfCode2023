// https://adventofcode.com/2023/day/6

import * as fs from "fs";

function getInput() {
  const input = fs.readFileSync("day06.input", "utf8");
  const times = input
    .split("\n")[0]
    .split(":")[1]
    .trim()
    .split(" ")
    .map((s) => s.trim())
    .filter((s) => s !== "")
    .map((s) => Number(s));
  const distances = input
    .split("\n")[1]
    .split(":")[1]
    .trim()
    .split(" ")
    .map((s) => s.trim())
    .filter((s) => s !== "")
    .map((s) => Number(s));
  const numWaysBeat = [];
  for (let i = 0; i < times.length; i++) {
    const time = times[i];
    const distance = distances[i];
    let numWayBeat = 0;
    for (let timeButton = 1; timeButton < time; timeButton++) {
      const timeLeft = time - timeButton;
      const yourDistance = timeLeft * timeButton;
      if (yourDistance > distance) {
        numWayBeat++;
      }
    }
    numWaysBeat.push(numWayBeat);
  }
  let product = 1;
  for (const num of numWaysBeat) {
    product *= num;
  }
  return product;
}

console.log(getInput());
