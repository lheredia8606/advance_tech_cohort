// 1. Maximum Sum Subarray of Size K (Easy)
// Given an array of integers and an integer K, find the maximum sum of any contiguous subarray of size K.
function maxSumSubarray(arr: number[], k: number): number {
  if (k > arr.length) return 0;
  let left = 0;
  let right = 0;
  let maxSum = -Infinity;
  let currentWindowsSum = arr[0];
  while (right < arr.length) {
    while (right - left < k - 1) {
      right++;
      currentWindowsSum += arr[right];
    }
    if (currentWindowsSum > maxSum) {
      maxSum = currentWindowsSum;
    }
    currentWindowsSum -= arr[left];
    left++;
  }
  return maxSum;
}

// Test Cases
console.log(maxSumSubarray([2, 1, 5, 1, 3, 5, 7, 4, 3, 2, 3, 4, 8], 3)); // Normal Case
console.log(maxSumSubarray([1, 2], 3)); // Edge Case: k is greater than array length

// 2. Longest Substring Without Repeating Characters (Medium)
// Given a string, find the length of the longest substring without repeating characters.
function lengthOfLongestSubstring(s: string) {
  const windows = new Set<string>();
  let left = 0;
  let right = 0;
  let maxWindows = 0;
  while (right < s.length) {
    while (windows.has(s[right])) {
      windows.delete(s[left]);
      left++;
    }
    windows.add(s[right]);
    right++;
    if (windows.size > maxWindows) {
      maxWindows = windows.size;
    }
  }
}
// Test Cases
console.log(lengthOfLongestSubstring("abcabcbb")); // Normal Case
console.log(lengthOfLongestSubstring("")); // Edge Case: Empty string

// 3. Longest Repeating Character Replacement (Medium)
// Given a string and an integer K, find the longest substring that can be obtained by replacing at most K characters.
function characterReplacement(s: string, k: number) {
  if (s === "" || k < 0) {
    return 0;
  }
  const charMap = new Map<string, number>();
  let left = 0;
  let right = 0;
  charMap.set(s[0], 1);
  let maxWindows = 0;
  while (right < s.length) {
    while (getCharsInWindows(charMap) - charMap.size <= k) {
      if (maxWindows < getCharsInWindows(charMap)) {
        maxWindows = getCharsInWindows(charMap);
      }
      right++;
      if (right >= s.length) {
        return maxWindows;
      }
      if (charMap.has(s[right])) {
        charMap.set(s[right], charMap.get(s[right])! + 1);
      } else {
        charMap.set(s[right], 1);
      }
      continue;
    }
    while (getCharsInWindows(charMap) - charMap.size > k) {
      if (charMap.get(s[left]) === 1) {
        charMap.delete(s[left]);
      } else {
        charMap.set(s[left], charMap.get(s[left])! - 1);
      }
      left++;
    }
  }
  return maxWindows;
}

const getCharsInWindows = (map: Map<string, number>) => {
  return Array.from(map.values()).reduce((cur, value) => {
    return (cur += value);
  }, 0);
};
// Test Cases
console.log(characterReplacement("AABABBA", 1)); // Normal Case
console.log(characterReplacement("A", 2)); // Edge Case: Single character string

// 4. Minimum Window Substring (Hard)
// Given a string S and a string T, find the minimum window in S which contains all characters of T.
function minWindow(s: string, t: string) {
  const sMap = getMap(s);
  const tMap = getMap(t);
  let left = 0;
  let right = s.length - 1;
  for (const key of Array.from(tMap.keys())) {
    if (!sMap.has(key) || sMap.get(key)! < tMap.get(key)!) {
      return -1;
    }
  }
  while (left < right) {
    if (!canBeRemoved(sMap, tMap, s[left])) {
      break;
    }
    left++;
  }
  while (right > left) {
    if (!canBeRemoved(sMap, tMap, s[right])) {
      break;
    }
    right--;
  }
  return right - left + 1;
}

const canBeRemoved = (
  sMap: Map<string, number>,
  tMap: Map<string, number>,
  char: string
): boolean => {
  if (!tMap.has(char)) {
    return true;
  } else if (sMap.get(char)! > tMap.get(char)!) {
    sMap.set(char, sMap.get(char)! - 1);
    return true;
  }
  return false;
};

const getMap = (s: string) => {
  const charMap = new Map<string, number>();
  for (let i = 0; i < s.length; i++) {
    if (charMap.has(s[i])) {
      charMap.set(s[i], charMap.get(s[i])! + 1);
    } else {
      charMap.set(s[i], 1);
    }
  }
  return charMap;
};

// Test Cases
console.log(minWindow("qaadebcq", "aabc")); // Normal Case
console.log(minWindow("a", "aa")); // Edge Case: No valid substring
