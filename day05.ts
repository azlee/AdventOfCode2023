// https://adventofcode.com/2023/day/5

import * as fs from "fs";

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

function getSoilNumbersPart1(): number {
  const input = getInput();
  const map: Map<string, Segment> = new Map();
  for (const segment of input.segments) {
    map.set(segment.source, segment);
  }
  let lowestLocationNumber = Number.MAX_SAFE_INTEGER;
  for (const seed of input.seeds) {
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

console.log(getSoilNumbersPart1());
