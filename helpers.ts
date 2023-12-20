export type PriorityQueue<T> = {
  insert(p: T): void;
  isEmpty: () => boolean;
  peek: () => T;
  pop: () => T;
  size: () => number;
};
export const priorityQueue = <T>(): PriorityQueue<T> => {
  const data: T[] = [];

  return {
    insert: (p: T) => {
      data.push(p);
      data.sort((s, s1) => s1[0] - s[0]);
    },

    isEmpty: () => data.length == 0,

    peek: () => {
      return data.length ? data[data.length - 1] : null;
    },

    pop: () => {
      if (data.length == 0) return null;

      const element = data.pop();
      return element;
    },

    size: () => data.length,
  };
};
