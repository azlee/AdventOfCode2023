// https://adventofcode.com/2023/day/11

import * as fs from "fs";

function getGalaxies(isPart2: boolean): number[][] {
  const input = fs.readFileSync("day11.input", "utf8").split(/\n/);
  const initialGalaxies: number[][] = [];
  const rowsWithGalaxies = new Set();
  const colsWithGalaxies = new Set();
  for (let i = 0; i < input.length; i++) {
    const line = input[i];
    for (let j = 0; j < line.length; j++) {
      const char = line.charAt(j);
      if (char === "#") {
        initialGalaxies.push([i, j]);
        rowsWithGalaxies.add(i);
        colsWithGalaxies.add(j);
      }
    }
  }
  const newGalaxies = JSON.parse(JSON.stringify(initialGalaxies));
  for (let i = 0; i < input.length; i++) {
    if (!rowsWithGalaxies.has(i)) {
      // shift over galaxies past i one row
      for (let g = 0; g < initialGalaxies.length; g++) {
        const galaxy = initialGalaxies[g];
        if (galaxy[0] > i) {
          newGalaxies[g][0] += isPart2 ? 999999 : 1;
        }
      }
    }
  }
  for (let j = 0; j < input[0].length; j++) {
    if (!colsWithGalaxies.has(j)) {
      // shift over galaxies past j one col
      for (let g = 0; g < initialGalaxies.length; g++) {
        const galaxy = initialGalaxies[g];
        if (galaxy[1] > j) {
          newGalaxies[g][1] += isPart2 ? 999999 : 1;
        }
      }
    }
  }
  return newGalaxies;
}

function getSumOfDistances(isPart2: boolean) {
  const galaxies = getGalaxies(isPart2);
  let sum = 0;
  for (let i = 0; i < galaxies.length; i++) {
    const galaxy1 = galaxies[i];
    for (let j = i + 1; j < galaxies.length; j++) {
      const galaxy2 = galaxies[j];
      const distance =
        Math.abs(galaxy2[1] - galaxy1[1]) + Math.abs(galaxy2[0] - galaxy1[0]);
      // console.log(`Between galaxy ${galaxy1} and ${galaxy2}: ${distance}`);
      sum += distance;
    }
  }
  return sum;
}

console.log(getSumOfDistances(false));
console.log(getSumOfDistances(true));
