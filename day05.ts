// https://adventofcode.com/2023/day/5

import * as fs from "fs";
import * as path from "path";

type SourceMapSegment = {
  destinationRangeStart: number;
  sourceRangeStart: number;
  rangeLength: number;
};

type Segment = {
  segments: SourceMapSegment[];
  source: string;
  dest: string;
};

type MapInput = {
  seeds: number[];
  segments: Segment[];
};

function getInput(): MapInput {
  const input = fs.readFileSync("day05.input", "utf8");
  const segments = input.split(/\n\n/);
  const seeds: number[] = segments[0]
    .split(":")[1]
    .trim()
    .split(" ")
    .map((s) => Number(s));
  const sourceSegments: Segment[] = [];
  for (let i = 1; i < segments.length; i++) {
    const segment = segments[i];
    const mapSegments = segment.split(/\n/);
    const [source, _, dest] = mapSegments[0].split(" ")[0].split("-");
    const sourceSegment: SourceMapSegment[] = [];
    for (let j = 1; j < mapSegments.length; j++) {
      const [
        destinationRangeStart,
        sourceRangeStart,
        rangeLength,
      ] = mapSegments[j].split(" ").map((s) => Number(s));
      sourceSegment.push({
        destinationRangeStart,
        sourceRangeStart,
        rangeLength,
      });
    }
    sourceSegments.push({ segments: sourceSegment, source, dest });
  }
  return {
    seeds,
    segments: sourceSegments,
  };
}

function getLowestSeedsLocation(seeds: number[], input: MapInput): number {
  const map: Map<string, Segment> = new Map();
  for (const segment of input.segments) {
    map.set(segment.source, segment);
  }
  let lowestLocationNumber = Number.MAX_SAFE_INTEGER;
  for (const seed of seeds) {
    let currPos: number = seed;
    let key = "seed";
    while (key !== "location") {
      let currSegment = map.get(key);
      const { segments, source, dest } = currSegment;
      let number: number = currPos;
      for (const segment of segments) {
        const {
          destinationRangeStart,
          sourceRangeStart,
          rangeLength,
        } = segment;
        if (
          currPos >= sourceRangeStart &&
          currPos < sourceRangeStart + rangeLength
        ) {
          number = destinationRangeStart + (currPos - sourceRangeStart);
        }
      }
      currPos = number;
      key = dest;
    }
    lowestLocationNumber = Math.min(lowestLocationNumber, currPos);
  }
  return lowestLocationNumber;
}

function getSoilNumbersPart1(): number {
  const input = getInput();
  return getLowestSeedsLocation(input.seeds, input);
}

function getSoilNumbersPart2(): number {
  // const input = getInput();
  let minLocation = Number.MAX_SAFE_INTEGER;
  const input = getInput();
  const input2 = fs
    .readFileSync(path.resolve(__dirname, "day05.input"), "utf8")
    .split("\n\n");
  const seedsArr = input2[0]
    .split(": ")[1]
    .split(" ")
    .map((x) => parseInt(x))
    .reduce((a, x, i) => {
      if (i % 2 == 0) a.push([]);
      return a[a.length - 1].push(x), a;
    }, []);
  for (const seed of seedsArr) {
    console.log("on seed", seed);
    for (let i = seed[0]; i < seed[0] + seed[1]; i++) {
      const location = getLowestSeedsLocation([i], input);
      minLocation = Math.min(minLocation, location);
    }
  }
  return minLocation;
}

console.log(getSoilNumbersPart1());
console.log(getSoilNumbersPart2());
