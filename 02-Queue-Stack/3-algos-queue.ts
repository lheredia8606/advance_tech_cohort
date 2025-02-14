// BE SURE TO IMPORT YOUR QUEUE CLASS

import { Queue } from "./1-queue";

// ==============================
// 1️⃣ Implement a Recent Calls Counter
// ==============================
// Write a function that counts the number of requests received in the past 3000 milliseconds.
// Use a queue to efficiently track the timestamps of requests.

// Example Test Cases:
// recentCounter.ping(1);    // returns 1
// recentCounter.ping(100);  // returns 2
// recentCounter.ping(3001); // returns 3
// recentCounter.ping(3002); // returns 3
const recentCallsCounter = () => {
  const queue = new Queue<number>();
  return {
    ping: (milliseconds: number) => {
      queue.enqueue(milliseconds);
      while (milliseconds - queue.front() > 3000) {
        queue.dequeue();
      }
      return queue.size();
    },
  };
};
const recentCounter = recentCallsCounter();
console.log(recentCounter.ping(1)); // returns 1
console.log(recentCounter.ping(100)); // returns 2
console.log(recentCounter.ping(3001)); // returns 3
console.log(recentCounter.ping(3002)); // returns 3

// ==============================
// 2️⃣ First Unique Character in a String
// ==============================
// Given a string `s`, find the **first unique character** and return its index.
// If no unique character exists, return `-1`. Use a queue to efficiently track character order.
export const firstUniqChar = (str: string) => {
  let charCount = new Map<string, number>();
  let queue = new Queue<string>();
  for (let i = 0; i < str.length; i++) {
    queue.enqueue(str[i]);
    charCount.set(str[i], (charCount.get(str[i]) ?? 0) + 1);
  }
  let index = 0;
  while (!queue.isEmpty()) {
    let char = queue.dequeue();
    if (char && charCount.get(char) === 1) {
      return index;
    }
    index++;
  }
  return -1;
};

// Example Test Cases:
// firstUniqChar("leetcode") // 0
// firstUniqChar("loveleetcode") // 2
// firstUniqChar("aabb") // -1

// ==============================
// 3️⃣ Implement a Stack Using Queues
// ==============================
// Implement a stack using only two queues.
// The implemented stack should support `push`, `pop`, `top`, and `isEmpty` operations.
export const queuedStack = <T>() => {
  const stack = new Queue<T>();
  const helperQueue = new Queue<T>();
  let lastInserted: T | null = null;
  const exchangeQueues = (
    queueToEmpty: Queue<T>,
    queueToFill: Queue<T>,
    elementsToHold: number
  ) => {
    while (queueToEmpty.size() > elementsToHold) {
      const dequeuedElement = queueToEmpty.dequeue();
      if (dequeuedElement) queueToFill.enqueue(dequeuedElement);
    }
  };
  return {
    push: (element: T) => {
      stack.enqueue(element);
      lastInserted = element;
    },
    pop: (): T | null => {
      let elementToReturn: T | null = null;
      if (stack.size() === 0) {
        return null;
      } else if (stack.size() === 1) {
        lastInserted === null;
        return stack.dequeue();
      } else {
        exchangeQueues(stack, helperQueue, 2);
        lastInserted = stack.dequeue();
        elementToReturn = stack.dequeue();
        exchangeQueues(helperQueue, stack, 0);
        if (lastInserted) {
          stack.enqueue(lastInserted);
        }
      }
      return elementToReturn;
    },
    top: (): T | null => lastInserted,
    isEmpty: (): boolean => stack.isEmpty(),
  };
};

// Example Test Cases:
// myStack.push(1);
// myStack.push(2);
// myStack.top();    // returns 2
// myStack.pop();    // returns 2
// myStack.isEmpty(); // returns false

// ==============================
// 4️⃣ Rotting Oranges
// ==============================
// Given a 2D grid where `0` is an empty cell, `1` is a fresh orange, and `2` is a rotten orange,
// determine the minimum number of minutes needed for all fresh oranges to rot. Use BFS with a queue.

// Example Test Cases:
// orangesRotting([[2,1,1],[1,1,0],[0,1,1]]) // 4
// orangesRotting([[2,1,1],[0,1,1],[1,0,1]]) // -1
// orangesRotting([[0,2]]) // 0

type TCoordinate = {
  x: number;
  y: number;
};

const orangesRotting = (grid: number[][]) => {
  const rottenQueue = new Queue<TCoordinate>();
  const newRotten = new Queue<TCoordinate>();
  let stillRooting = true;
  let minutes = 0;
  let goodOranges: number = 0;
  const isCoordValid = ({ x, y }: TCoordinate) => {
    return x >= 0 && x < grid.length && y >= 0 && y < grid[0].length;
  };
  const isFresh = ({ x, y }: TCoordinate) => {
    return grid[x][y] === 1;
  };

  const tryToRot = ({ x, y }: TCoordinate) => {
    if (isCoordValid({ x, y }) && isFresh({ x, y })) {
      newRotten.enqueue({
        x,
        y,
      });
      grid[x][y] = 2;
      goodOranges--;
    }
  };
  const spread = ({ x, y }: TCoordinate) => {
    tryToRot({ x, y: y - 1 });
    tryToRot({ x, y: y + 1 });
    tryToRot({ x: x + 1, y });
    tryToRot({ x: x - 1, y });
  };
  const firstPass = () => {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] === 2) {
          rottenQueue.enqueue({ x: i, y: j });
        }
        if (grid[i][j] === 1) {
          goodOranges++;
        }
      }
    }
  };
  firstPass();
  if (goodOranges === 0) return 0;
  while (stillRooting) {
    minutes++;
    while (!rottenQueue.isEmpty()) {
      spread(rottenQueue.dequeue()!);
      if (goodOranges === 0) {
        return minutes;
      }
    }
    if (newRotten.isEmpty()) {
      return -1;
    }
    while (!newRotten.isEmpty()) {
      rottenQueue.enqueue(newRotten.dequeue()!);
    }
  }
};

// ==============================
// 5️⃣ Sliding Window Maximum
// ==============================
// Given an array `nums` and an integer `k`, return the maximum values in every window of size `k`.
// Use a deque (double-ended queue) to efficiently track the max values.
type windowValue = {
  value: number;
  index: number;
};
const maxSlidingWindow = (nums: number[], windowSize: number) => {
  const maxInWindow: number[] = [];
  const windowQueue = deque<windowValue>();

  const insertInQueue = (newElement: windowValue) => {
    if (
      windowQueue.isEmpty() ||
      windowQueue.peekFront().value < newElement.value
    ) {
      windowQueue.addFront(newElement);
    } else {
      while (windowQueue.peeKBack().value < newElement.value) {
        windowQueue.removeBack();
      }
      windowQueue.addBack(newElement);
    }
  };
  const purge = (currentIndex: number) => {
    while (windowQueue.peekFront().index < currentIndex - windowSize) {
      windowQueue.removeFront();
    }
  };
  if (nums.length < windowSize) return [];
  for (let i = 0; i < nums.length; i++) {}

  return maxInWindow;
};

// Example Test Cases:
// maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3) // [3,3,5,5,6,7]
// maxSlidingWindow([1], 1) // [1]
// maxSlidingWindow([9, 11], 2) // [11]
