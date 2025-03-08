import { isValidParentheses } from "../02-Queue-Stack/4-algos-stack";

// 2. Permutations (Medium)
// Given an array of distinct integers, return all possible permutations.
export const permute = <T>(
  elements: T[],
  currentPermutations: T[][] = []
): T[][] => {
  if (elements.length === 0) {
    return currentPermutations;
  }
  const popped = elements.pop()!;
  const newPermutationsArr: T[][] = [];
  if (currentPermutations.length === 0) {
    return permute(elements, [[popped]]);
  } else {
    for (let i = 0; i < currentPermutations.length; i++) {
      const currentArray: T[] = currentPermutations[i];
      for (let j = 0; j < currentArray.length; j++) {
        const newPermutation = currentArray.slice(0, j);
        newPermutation.push(popped);
        newPermutation.push(...currentArray.slice(j));
        newPermutationsArr.push(newPermutation);
      }
      newPermutationsArr.push([...currentArray, popped]);
    }
  }
  return permute(elements, newPermutationsArr);
};
// Test Cases
//console.log(permute([1, 2, 3])); // Normal Case
//console.log(permute([])); // Edge Case: Empty array

// 1. Generate Parentheses (Medium)

// Given an integer n, generate all combinations of well-formed parentheses with n pairs.
export function generateParenthesis(n: number) {
  const parenthesis = "()".repeat(n);
  const parenthesisSets = new Set<string>();
  const permutations = permute(parenthesis.split(""));
  for (const permutation of permutations) {
    parenthesisSets.add(permutation.join(""));
  }

  const differentParenthesis = Array.from(parenthesisSets);
  const validParenthesis: string[] = [];
  for (const parenthesis of differentParenthesis) {
    //function inside stack algos
    if (isValidParentheses(parenthesis)) {
      validParenthesis.push(parenthesis);
    }
  }
  return validParenthesis;
}
// Test Cases
//console.log(generateParenthesis(3)); // Normal Case
//console.log(generateParenthesis(0)); // Edge Case: No parentheses needed

// 3. Combination Sum (Medium)
// Given an array of integers and a target, return all unique combinations where numbers sum to target.
const getCombinations = (
  candidates: number[],
  combinations: number[][] = []
) => {
  if (candidates.length === 0) {
    return combinations;
  }
  const lastElement = candidates.pop()!;
  const stopCondition = combinations.length;
  for (let i = 0; i < stopCondition; i++) {
    combinations.push([lastElement, ...combinations[i]]);
  }
  combinations.push([lastElement]);
  return getCombinations(candidates, combinations);
};

export function combinationSum(candidates: number[], target: number) {
  const combinations = getCombinations(candidates);
  console.log(combinations);
  const matches: number[][] = [];
  const found = new Set<string>();
  for (let i = 0; i < combinations.length; i++) {
    const sum = combinations[i].reduce((acc, val) => {
      return acc + val;
    }, 0);
    if (sum === target) {
      const sortedString = JSON.stringify(
        combinations[i].sort((a, b) => a - b)
      );
      if (!found.has(sortedString)) {
        found.add(sortedString);
        matches.push(combinations[i]);
      }
    }
  }
  return matches;
}
// Test Cases
//console.log(combinationSum([2, 3, 6, 7], 7)); // Normal Case
//console.log(combinationSum([2, 4], 7)); // Edge Case: No valid combinations

// 4. Word Search (Medium)
// Given an m x n grid of letters and a word, check if the word exists in the grid using adjacent letters.
function exist(board, word) {
  // Implement backtracking logic
}
// Test Cases
console.log(
  exist(
    [
      ["A", "B", "C", "E"],
      ["S", "F", "C", "S"],
      ["A", "D", "E", "E"],
    ],
    "ABCCED"
  )
); // Normal Case
console.log(exist([["A"]], "B")); // Edge Case: Single letter grid with a different word
