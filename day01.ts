// https://adventofcode.com/2023/day/1

import * as fs from "fs";

function getCalibrationPart1() {
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

function checkForStringDigit(line: string, i: number): number | null {
  const digits = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  for (let digitIndex = 0; digitIndex < digits.length; digitIndex++) {
    let digit = digits[digitIndex];
    if (
      i + digit.length <= line.length &&
      line.substr(i, digit.length) === digit
    ) {
      return digitIndex + 1;
    }
  }
  return null;
}

function getCalibrationPart2() {
  const input = fs.readFileSync("day01.input", "utf8");
  const lines: string[] = input.split(/\n/);
  let sum = 0;
  for (const line of lines) {
    let firstDigit: number, lastDigit: number;
    for (let i = 0; i < line.length; i++) {
      const char = line.charAt(i);
      if (char >= "0" && char <= "9") {
        firstDigit = Number(char);
        break;
      }
      const digit = checkForStringDigit(line, i);
      if (digit) {
        firstDigit = digit;
        break;
      }
    }
    for (let i = line.length - 1; i >= 0; i--) {
      const char = line.charAt(i);
      if (char >= "0" && char <= "9") {
        lastDigit = Number(char);
        break;
      }
      const digit = checkForStringDigit(line, i);
      if (digit) {
        lastDigit = digit;
        break;
      }
    }
    const number = firstDigit * 10 + lastDigit;
    sum += number;
  }
  return sum;
}

console.log(getCalibrationPart1());
console.log(getCalibrationPart2());
