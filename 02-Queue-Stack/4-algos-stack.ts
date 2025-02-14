// BE SURE TO IMPORT YOUR STACK CLASS

import { Stack } from "./Stack";

// ==============================
// 1️⃣ Reverse a String Using a Stack
// ==============================
// Write a function that takes a string as input and returns the reversed string using a stack.
// You may only use stack operations (`push`, `pop`, `isEmpty`).
const reverseString = (str: string) => {
  let strToReturn = "";
  const stack = new Stack<string>();
  for (let i = 0; i < str.length; i++) {
    stack.push(str[i]);
  }
  while (!stack.isEmpty()) {
    strToReturn = `${strToReturn}${stack.pop()}`;
  }
  return strToReturn;
};
// Example Test Cases:
// reverseString("hello") // "olleh"
// reverseString("world") // "dlrow"
// reverseString("") // ""
// reverseString("abcd") // "dcba"

// ==============================
// 2️⃣ Check for Balanced Parentheses
// ==============================
// Given a string containing only the characters `()`, `{}`, and `[]`,
// write a function to determine if the string is valid.
// A string is valid if brackets are closed in the correct order. Use a stack to track open brackets.

export const isValidParentheses = (str: string) => {
  const stack = new Stack<string>();
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if ("({[".includes(char)) {
      stack.push(char);
    } else {
      if (stack.pop() !== "({["[")}]".indexOf(char)]) {
        return false;
      }
    }
  }
  return stack.isEmpty() ? true : false;
};

// Example Test Cases:
// isValidParentheses("({[]})") // true
// isValidParentheses("({[)]}") // false
// isValidParentheses("()") // true
// isValidParentheses("{[()]}") // true
// isValidParentheses("(((") // false

// ==============================
// 3️⃣ Evaluate a Postfix Expression
// ==============================
// Write a function that evaluates a mathematical expression in **postfix notation** (Reverse Polish Notation).
// The function should use a stack to process numbers and operators.
// Assume the input is a space-separated string of numbers and `+`, `-`, `*`, or `/` operators.

export const evaluatePostfix = (str: string) => {
  const postFix = str.split(" ");
  const stack = new Stack<number>();
  const performOperation = (operation: string) => {
    const second = stack.pop();
    const first = stack.pop();
    if (first && second) {
      switch (operation) {
        case "+":
          stack.push(first + second);
          break;
        case "-":
          stack.push(first - second);
          break;
        case "*":
          stack.push(first * second);
          break;
        case "/":
          stack.push(first / second);
          break;
      }
    }
  };
  for (let i = 0; i < postFix.length; i++) {
    if ("+-*/".includes(postFix[i])) {
      performOperation(postFix[i]);
    } else {
      stack.push(Number(postFix[i]));
    }
  }
  return stack.pop();
};

// Example Test Cases:
// evaluatePostfix("3 4 +") // 7
// evaluatePostfix("5 1 2 + 4 * + 3 -") // 14
// evaluatePostfix("10 2 8 * + 3 -") // 23
// evaluatePostfix("6 2 /") // 3
// evaluatePostfix("4 5 * 2 /") // 10

// ==============================
// 4️⃣ Next Greater Element
// ==============================
// Given an array of integers, find the **next greater element** for each element.
// The next greater element of an element **x** is the first element to the right that is greater than **x**.
// If none exists, return `-1` for that element. Use a stack for efficiency.

export const nextGreaterElement = (nums: number[]) => {
  if (nums.length === 0) return [];
  const stack = new Stack<number>();
  stack.push(nums[0]);
  const arrToReturn: number[] = [];
  for (let i = 1; i < nums.length; i++) {
    while (stack.peek() < nums[i]) {
      arrToReturn.push(nums[i]);
      stack.pop();
    }
    stack.push(nums[i]);
  }
  for (let i = 0; i < stack.size(); i++) {
    arrToReturn.push(-1);
  }
  return arrToReturn;
};

// Example Test Cases:
// nextGreaterElement([4, 5, 2, 10, 8]) // [5, 10, 10, -1, -1]
// nextGreaterElement([3, 2, 1]) // [-1, -1, -1]
// nextGreaterElement([1, 3, 2, 4]) // [3, 4, 4, -1]

// ==============================
// 5️⃣ Daily Temperatures
// ==============================
// Given an array `temperatures` where `temperatures[i]` is the temperature on day `i`,
// return an array **answer** where `answer[i]` is the number of days you have to wait after the `i-th` day
// to get a warmer temperature. If there is no future day with a warmer temperature, return `0`.

type TTemperature = {
  temperature: number;
  index: number;
};

export const dailyTemperatures = (nums: number[]) => {
  if (nums.length === 0) return [];
  const stack = new Stack<TTemperature>();
  stack.push({ temperature: nums[0], index: 0 });
  const arrToReturn: number[] = [];
  for (let i = 1; i < nums.length; i++) {
    while (stack.peek() && stack.peek().temperature < nums[i]) {
      const popedTemp = stack.pop();
      if (popedTemp) {
        arrToReturn[popedTemp.index] = i - popedTemp.index;
      }
    }
    stack.push({ temperature: nums[i], index: i });
  }
  for (let i = 0; i < stack.size(); i++) {
    arrToReturn.push(0);
  }
  return arrToReturn;
};

// Example Test Cases:
// dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]) // [1, 1, 4, 2, 1, 1, 0, 0]
// dailyTemperatures([30, 40, 50, 60]) // [1, 1, 1, 0]
// dailyTemperatures([30, 20, 10]) // [0, 0, 0]
