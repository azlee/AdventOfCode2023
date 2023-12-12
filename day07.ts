// https://adventofcode.com/2023/day/7

import * as fs from "fs";

enum HandType {
  FIVE_OF_KIND,
  FOUR_OF_KIND,
  FULL_HOUSE,
  THREE_OF_KIND,
  TWO_PAIR,
  ONE_PAIR,
  HIGH_CARD,
}

type CardStrength = {
  type: HandType;
  hand: string;
  bid: number;
  wildCardPos: number[];
};

const cardOrder = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  T: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};
const cardOrderPart2 = {
  ...cardOrder,
  J: 1,
};

function getHandType(hand: string, isJWild: boolean): HandType {
  const map: { [key: string]: number } = {};
  for (const char of hand) {
    const number = map[char] ? map[char] + 1 : 1;
    map[char] = number;
  }
  // check if any J's present - if so add to max char
  if (isJWild && map["J"] < 5) {
    const [maxKey, maxCount] = Object.entries({ ...map, J: 0 }).sort(
      (a, b) => b[1] - a[1]
    )[0];
    map[maxKey] = maxCount + map["J"];
    delete map["J"];
  }
  const values = Object.values(map).sort();
  if (values.length === 1) {
    return HandType.FIVE_OF_KIND;
  } else if (values.length === 5) {
    return HandType.HIGH_CARD;
  } else if (values[0] === 1 && values[1] === 4) {
    return HandType.FOUR_OF_KIND;
  } else if (values[0] === 2 && values[1] === 3) {
    return HandType.FULL_HOUSE;
  } else if (values[0] === 1 && values[1] === 1 && values[2] === 3) {
    return HandType.THREE_OF_KIND;
  } else if (values[0] === 1 && values[1] === 2 && values[2] === 2) {
    return HandType.TWO_PAIR;
  } else if (
    values[0] === 1 &&
    values[1] === 1 &&
    values[2] === 1 &&
    values[3] === 2
  ) {
    return HandType.ONE_PAIR;
  }
}

function getInput(isJWild: boolean): CardStrength[] {
  const input = fs.readFileSync("day07.input", "utf8").split("\n");
  const cardStrengths: CardStrength[] = [];
  for (const line of input) {
    const [hand, bid] = line.split(" ").map((s) => s.trim());
    const wildCardPos = [];
    let i = 0;
    for (const c of hand) {
      if (c === "J") wildCardPos.push(i);
      i++;
    }
    cardStrengths.push({
      hand,
      bid: Number(bid),
      type: getHandType(hand, isJWild),
      wildCardPos,
    });
  }
  return cardStrengths;
}

function part1() {
  const cardStrengths = getInput(false);
  // calculate the number of sets per pair
  const sortedCards = cardStrengths.sort((a, b) => {
    const num = b.type - a.type;
    if (num === 0) {
      for (let i = 0; i < 5; i++) {
        const order = cardOrder[a.hand.charAt(i)] - cardOrder[b.hand.charAt(i)];
        if (order !== 0) return order;
      }
      return 0;
    }
    return num;
  });
  let totalWinnings = 0;
  for (let i = 0; i < sortedCards.length; i++) {
    const sortedCard = sortedCards[i];
    totalWinnings += sortedCard.bid * (i + 1);
  }
  return totalWinnings;
}

function part2() {
  const cardStrengths = getInput(true);
  // calculate the number of sets per pair
  const sortedCards = cardStrengths.sort((a, b) => {
    const num = b.type - a.type;
    if (num === 0) {
      for (let i = 0; i < 5; i++) {
        const order =
          cardOrderPart2[a.hand.charAt(i)] - cardOrderPart2[b.hand.charAt(i)];
        if (order !== 0) return order;
      }
      return 0;
    }
    return num;
  });
  let totalWinnings = 0;
  for (let i = 0; i < sortedCards.length; i++) {
    const sortedCard = sortedCards[i];
    totalWinnings += sortedCard.bid * (i + 1);
  }
  return totalWinnings;
}

console.log(part1());
console.log(part2()); // 251735672
