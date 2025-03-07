// 1. Assign Cookies (Easy)
// Problem Prompt:
// Given an array `g` representing the greed factor of each child and an array `s` representing the size of each cookie,
// return the maximum number of children who can be content.
// A child will be content if they receive a cookie with a size greater than or equal to their greed factor.
// You can assign at most one cookie per child using a greedy approach.

function findContentChildren(g, s) {
  // Implement greedy logic
}

// Test Cases
console.log(findContentChildren([1, 2, 3], [1, 1])); // Normal Case
console.log(findContentChildren([], [1, 2, 3])); // Edge Case: No children

// 2. Jump Game (Medium)
// Problem Prompt:
// You are given an array `nums` where each element represents the maximum jump length at that position.
// Determine if you can reach the last index starting from index 0.
// Use a greedy approach to maximize the reach.

function canJump(nums) {
  // Implement greedy logic
}

// Test Cases
console.log(canJump([2, 3, 1, 1, 4])); // Normal Case: Can reach the last index
console.log(canJump([3, 2, 1, 0, 4])); // Edge Case: Cannot reach last index

// 3. Task Scheduler (Medium)
// Problem Prompt:
// Given a list of tasks represented by characters and an integer `n` representing the cooling period,
// return the least number of units of time required to complete all tasks.
// The same task can only be scheduled again after `n` units of time.
// Use a greedy approach to minimize idle time.

function leastInterval(tasks, n) {
  // Implement greedy logic
}

// Test Cases
console.log(leastInterval(["A", "A", "A", "B", "B", "B"], 2)); // Normal Case
console.log(leastInterval(["A", "B", "C", "D"], 0)); // Edge Case: No cooldown period

// 4. Gas Station (Medium)
// Problem Prompt:
// Given two integer arrays `gas` and `cost`, where `gas[i]` is the gas available at station `i`
// and `cost[i]` is the cost to travel from station `i` to the next station,
// return the starting gas station index if you can travel around the circuit once.
// If it's not possible, return -1. Use a greedy approach to find the optimal starting station.

function canCompleteCircuit(gas, cost) {
  // Implement greedy logic
}

// Test Cases
console.log(canCompleteCircuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2])); // Normal Case: Possible circuit
console.log(canCompleteCircuit([2, 3, 4], [3, 4, 3])); // Edge Case: No possible circuit
