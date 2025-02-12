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
const firstUniqChar = (str: string) => {
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

// ==============================
// 5️⃣ Sliding Window Maximum
// ==============================
// Given an array `nums` and an integer `k`, return the maximum values in every window of size `k`.
// Use a deque (double-ended queue) to efficiently track the max values.

// Example Test Cases:
// maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3) // [3,3,5,5,6,7]
// maxSlidingWindow([1], 1) // [1]
// maxSlidingWindow([9, 11], 2) // [11]
