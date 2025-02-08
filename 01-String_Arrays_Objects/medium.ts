/*
 * Problem: Merge Intervals
 *
 * Given an array of intervals, merge overlapping intervals.
 *
 * Example:
 * Input: [[1,3],[2,6],[8,10],[15,18]]
 * Output: [[1,6],[8,10],[15,18]]
 *
 */
const mergeIntervals = (intervals: number[][]) => {
  const newIntervals = [intervals[0]];
  for (let i = 0; i < intervals.length; i++) {
    if (intervals[i][0] <= newIntervals[newIntervals.length - 1][1]) {
      newIntervals[newIntervals.length - 1][1] = intervals[i][1];
    } else {
      newIntervals.push(intervals[i]);
    }
  }
  return newIntervals;
};

/*
 * Problem: Group Anagrams
 *
 * Given an array of words, group anagrams together.
 *
 * Example:
 * Input: ["eat", "tea", "tan", "ate", "nat", "bat"]
 * Output: [["eat","tea","ate"],["tan","nat"],["bat"]]
 *
 */

const groupAnagrams = (strs: string[]) => {
  const anagramsGroups: string[][] = [];
  for (let i = 0; i < strs.length; i++) {
    let wasInserted: boolean = false;
    for (let j = 0; j < anagramsGroups.length; j++) {
      if (areAnagrams(anagramsGroups[j][0], strs[i])) {
        //if word already in group... skip
        if (!anagramsGroups[j].includes(strs[i])) {
          anagramsGroups[j].push(strs[i]);
        }
        wasInserted = true;
        break;
      }
    }
    if (!wasInserted) {
      anagramsGroups.push([strs[i]]);
    }
  }
  return anagramsGroups;
};

const areAnagrams = (str1: string, str2: string): boolean => {
  if (str1.length !== str2.length) return false;
  const mapStr1 = new Map();
  const mapStr2 = new Map();
  for (let i = 0; i < str1.length; i++) {
    mapStr1.get(str1[i]) !== undefined
      ? mapStr1.set(str1[i], mapStr1.get(str1[i]) + 1)
      : mapStr1.set(str1[i], 1);
    mapStr2.get(str2[i]) !== undefined
      ? mapStr2.set(str2[i], mapStr2.get(str2[i]) + 1)
      : mapStr2.set(str2[i], 1);
  }
  const str1Keys = Array.from(mapStr1.keys());

  for (let key of str1Keys) {
    if (mapStr1.get(key) !== mapStr2.get(key)) return false;
  }
  return true;
};

/*
 * Problem: Longest Palindromic Substring
 *
 * Find the longest palindromic substring in a given string.
 *
 * Example:
 * Input: "babad"
 * Output: "bab" (or "aba")
 *
 */

const longestPalindromicSubstring = (str: string) => {
  if (str === "") throw new Error("Please enter a valid input!");
  let maxPalFound = str[0];
  for (let i = 0; i < str.length; i++) {
    //j > i + maxPalFound.length
    //if the remaining range is shorter than palindrome i already have, stop searching
    for (let j = str.length - 1; j >= i + maxPalFound.length; j--) {
      const possiblePalindrome = str.slice(i, j + 1);
      if (isPalindromic(possiblePalindrome)) {
        //if I find a palindrome for shure will be longest than the one I have
        maxPalFound = possiblePalindrome;
      }
    }
  }
  return maxPalFound;
};

const isPalindromic = (str: string) => {
  for (let i = 0; i < str.length / 2; i++) {
    if (str[i] !== str[str.length - 1 - i]) return false;
  }
  return true;
};

/*
 * Problem: Flatten Nested Object
 *
 * Convert a deeply nested object into a flat key-value map.
 *
 * Example:
 * Input: { a: { b: { c: 1 } }, d: 2 }
 * Output: { "a.b.c": 1, d: 2 }
 *
 * Hint: Use recursion + a helper function.
 */

type TObject = {
  [key: string]: number | object;
};
//when called only need to pass the object
const flattenNestedObject = (
  nestedObject: TObject,
  currentKeys: string[] = [],
  keysMap: Map<string, number> = new Map(),
  isFirstKey: boolean = true
) => {
  const objectKeys = Object.keys(nestedObject);
  for (let key of objectKeys) {
    if (isFirstKey) currentKeys = [];
    currentKeys.push(key);
    if (typeof nestedObject[key] === "number") {
      keysMap.set(currentKeys.join("."), nestedObject[key]);
    } else {
      flattenNestedObject(
        nestedObject[key] as TObject,
        currentKeys,
        keysMap,
        false
      );
    }
  }
  return keysMap;
};

/*
 * Problem: Deep Object Comparison
 *
 * Write a function to deeply compare two objects.
 *
 * Example:
 * Input: obj1 = { a: { b: 1 } }, obj2 = { a: { b: 1 } }
 * Output: true
 *
 * Hint: Use recursion and check nested properties.
 *
 */

const deepObjectComparison = (obj1: TObject, obj2: TObject) => {
  const object1Keys = Object.keys(obj1);
  const object2Keys = Object.keys(obj2);
  //if not same keys, return false
  if (!compareKeys(object1Keys, object2Keys)) {
    return false;
  }
  for (let i = 0; i < object1Keys.length; i++) {
    if (
      typeof obj1[object1Keys[i]] === "number" &&
      typeof obj2[object1Keys[i]] === "number"
    ) {
      //if both are numbers but not same numbers return false
      if (obj1[object1Keys[i]] !== obj2[object1Keys[i]]) {
        return false;
      }
    } else if (
      typeof obj1[object1Keys[i]] === "object" &&
      typeof obj2[object1Keys[i]] === "object"
    ) {
      //don't know how to avoid as here, typeOf I use to believe that is a type guard
      //if not same objects return false
      if (
        !deepObjectComparison(
          obj1[object1Keys[i]] as TObject,
          obj2[object2Keys[i]] as TObject
        )
      ) {
        return false;
      }
    } else {
      //if enter here is because not same type
      return false;
    }
  }
  return true;
};

const compareKeys = (arrKeys1: string[], arrKeys2: string[]) => {
  if (arrKeys1.length !== arrKeys2.length) return false;
  const setArr2 = new Set(arrKeys2);
  for (let i = 0; i < arrKeys1.length; i++) {
    if (!setArr2.has(arrKeys1[i])) {
      return false;
    }
  }
  return true;
};

/*
 * Problem: Maximum Subarray Sum
 *
 * Find the contiguous subarray with the largest sum.
 *
 * Example:
 * Input: [-2,1,-3,4,-1,2,1,-5,4]
 * Output: 6  // Subarray: [4,-1,2,1]
 *
 */
const maximumSubarraySum = (nums: number[]) => {
  let maxSum = 0;
  let currentSum = 0;
  for (let i = 0; i < nums.length; i++) {
    currentSum += nums[i];
    if (currentSum > 0) {
      if (currentSum > maxSum) {
        maxSum = currentSum;
      }
    } else {
      currentSum = 0;
    }
  }
  return maxSum;
};
