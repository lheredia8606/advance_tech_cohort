// 1. Factorial of a Number
// Write a recursive function to compute the factorial of a given number n.
// Factorial of n (denoted as n!) is defined as: n! = n * (n-1) * (n-2) * ... * 1
// Base case: 0! = 1
//
// Example Test Cases:
// console.log(factorial(5)); // Output: 120
// console.log(factorial(0)); // Output: 1

const factorial = (n: number): number => {
  if (n < 0) {
    throw new Error("number can not be negative");
  }
  if (n === 0) {
    return 1;
  }
  return n * factorial(n - 1);
};

// 2. Sum of an Array
// Write a recursive function to calculate the sum of all numbers in an array.
//
// Example Test Cases:
// console.log(sumArray([1, 2, 3, 4])); // Output: 10
// console.log(sumArray([])); // Output: 0
// console.log(sumArray([5])); // Output: 5

const sumArray = (arr: number[]): number => {
  if (arr.length === 0) {
    return 0;
  }
  return arr.pop()! + sumArray(arr);
};

// 3. Reverse a String
// Write a recursive function that reverses a given string.
//
// Example Test Cases:
// console.log(reverseString("hello")); // Output: "olleh"
// console.log(reverseString("racecar")); // Output: "racecar"
// console.log(reverseString("abc")); // Output: "cba"

function reverseString(str: string): string {
  if (str.length < 2) {
    return str;
  }
  return `${str[str.length - 1]}${reverseString(str.slice(0, str.length - 1))}`;
}

// 4. Check if a String is a Palindrome
// Write a recursive function to check if a string is a palindrome (reads the same forward and backward).
//
// Example Test Cases:
// console.log(isPalindrome("racecar")); // Output: true
// console.log(isPalindrome("hello"));   // Output: false
// console.log(isPalindrome("a"));       // Output: true

function isPalindrome(str: string): boolean {
  if (str.length < 2) {
    return true;
  }
  return str[0] === str[str.length - 1] &&
    isPalindrome(str.slice(1, str.length - 1))
    ? true
    : false;
}

// 5. Compute the N-th Fibonacci Number
// Write a recursive function to compute the nth Fibonacci number.
// The Fibonacci sequence is defined as:
// F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2)
//
// Example Test Cases:
// console.log(fibonacci(6)); // Output: 8
// console.log(fibonacci(0)); // Output: 0
// console.log(fibonacci(1)); // Output: 1

const fibonacci = (number: number): number => {
  const values = new Map<string, number>();
  values.set("0", 0);
  values.set("1", 1);
  const calculate = (n: number): number => {
    console.log(Array.from(values.entries()));

    if (values.get(n.toString()) == null) {
      values.set(n.toString(), calculate(n - 1) + calculate(n - 2));
    }
    return values.get(n.toString())!;
  };
  return calculate(number);
};

// 6. Flatten a Nested Array
// Write a recursive function to flatten an array that contains nested arrays into a single-level array.
//
// Example Test Cases:
// console.log(flattenArray([1, [2, [3, 4], 5], 6])); // Output: [1, 2, 3, 4, 5, 6]
// console.log(flattenArray([1, [2, [3, [4, [5]]]]])); // Output: [1, 2, 3, 4, 5]
// console.log(flattenArray([])); // Output: []

type NestedArray = (number | NestedArray)[];

const areAllNumbers = (arr: NestedArray) => {
  for (let element of arr) {
    if (typeof element !== "number") {
      return false;
    }
  }
  return true;
};

function flattenArray(arr: NestedArray): number[] {
  if (areAllNumbers(arr)) {
    return arr as number[];
  }
  const flattenElements: number[] = [];
  for (const element of arr) {
    if (typeof element === "number") {
      flattenElements.push(element);
    } else {
      flattenElements.push(...flattenArray(element));
    }
  }
  return flattenElements;
}

// 7. Count the Number of Occurrences of a Value in an Array
// Write a recursive function that counts how many times a given value appears in an array.
//
// Example Test Cases:
// console.log(countOccurrences([1, 2, 3, 4, 2, 2, 5], 2)); // Output: 3
// console.log(countOccurrences([1, 1, 1, 1, 1], 1)); // Output: 5
// console.log(countOccurrences([1, 2, 3, 4, 5], 6)); // Output: 0

function countOccurrences(arr: number[], value: number): number {
  if (arr.length === 0) {
    return 0;
  }
  return arr.pop() === value
    ? 1 + countOccurrences(arr, value)
    : countOccurrences(arr, value);
}

// 8. Find the Maximum Number in an Array
// Write a recursive function that finds and returns the maximum value in an array.
//
// Example Test Cases:
// console.log(findMax([1, 5, 3, 9, 2])); // Output: 9
// console.log(findMax([7, 7, 7, 7])); // Output: 7
// console.log(findMax([-1, -2, -3, -4])); // Output: -1

function findMax(arr: number[]): number {
  if (arr.length === 0) {
    throw new Error("No values provided");
  } else if (arr.length === 1) {
    return arr[0];
  }
  const currentLast = arr.pop()!;
  const maxOfRemain = findMax(arr);
  return currentLast > maxOfRemain ? currentLast : maxOfRemain;
}
