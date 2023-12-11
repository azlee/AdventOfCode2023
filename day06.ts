// https://adventofcode.com/2023/day/6

import * as fs from "fs";

function getInput(isPart2: boolean) {
  const input = fs.readFileSync("day06.input", "utf8");
  let times = input
    .split("\n")[0]
    .split(":")[1]
    .trim()
    .split(" ")
    .map((s) => s.trim())
    .filter((s) => s !== "")
    .map((s) => Number(s));
  let distances = input
    .split("\n")[1]
    .split(":")[1]
    .trim()
    .split(" ")
    .map((s) => s.trim())
    .filter((s) => s !== "")
    .map((s) => Number(s));
  if (isPart2) {
    let singleTime = "";
    let singleDistance = "";
    for (const time of times) {
      singleTime += time;
    }
    for (const distance of distances) {
      singleDistance += distance;
    }
    times = [Number(singleTime)];
    distances = [Number(singleDistance)];
  }
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

console.log(getInput(false));
console.log(getInput(true));
