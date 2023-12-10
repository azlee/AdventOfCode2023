// https://adventofcode.com/2022/day/1

import * as fs from "fs";

function getCalibration() {
  const input = fs.readFileSync("day01.input", "utf8");

  const lines: string[] = input.split(/\n/);

  let sum = 0;
  for (const line of lines) {
    let firstDigit, lastDigit;
    for (let i = 0; i < line.length; i++) {
      const char = line.charAt(i);
      if (char >= "0" && char <= "9") {
        firstDigit = char;
        break;
      }
    }
    for (let i = line.length - 1; i >= 0; i--) {
      const char = line.charAt(i);
      if (char >= "0" && char <= "9") {
        lastDigit = char;
        break;
      }
    }
    const number = Number(firstDigit + lastDigit);
    sum += number;
  }
  return sum;
}

console.log(getCalibration());
