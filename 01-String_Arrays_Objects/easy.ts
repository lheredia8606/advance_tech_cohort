/*
 * Problem: Two Sum
 *
 * Given an array of numbers and a target sum, return indices of two numbers that add up to the target.
 * Assume exactly one solution exists, and the same element cannot be used twice.
 *
 * Example:
 * Input: nums = [2, 7, 11, 15], target = 9
 * Output: [0, 1]  // Because nums[0] + nums[1] = 2 + 7 = 9
 *
 */

const twoSum = (numbers: number[], targetValue: number): number[] => {
  numbers = numbers.sort((a, b) => a - b);
  let minIndex = 0;
  let maxIndex = numbers.length - 1;
  while (maxIndex > minIndex) {
    const currentSum = numbers[maxIndex] + numbers[minIndex];
    if (currentSum === targetValue) {
      return [minIndex, maxIndex];
    } else if (currentSum > targetValue) maxIndex--;
    else minIndex++;
  }
  return [-1, -1];
};

/*
 * Problem: Reverse Words in a String
 *
 * Given a string, reverse the order of words.
 *
 * Example:
 * Input: "the sky is blue"
 * Output: "blue is sky the"
 *
 */
const reverseWords = (sentence: string) => {
  return sentence.split(" ").reverse().join(" ");
};

/*
 * Problem: Most Common Character
 *
 * Given a string, find the most frequently occurring character.
 *
 * Example:
 * Input: "banana"
 * Output: "a"
 *
 */

const mostCommonCharacter = (str: string) => {
  if (str === "" || typeof str !== "string")
    throw new Error("Please enter a valid input");
  const charMap = new Map();
  for (let i = 0; i < str.length; i++) {
    charMap.has(str[i])
      ? charMap.set(str[i], charMap.get(str[i]) + 1)
      : charMap.set(str[i], 1);
  }
  let characters = Array.from(charMap.keys());
  let maxIndex = 0;
  for (let i = 1; i < characters.length; i++) {
    if (charMap.get(characters[i]) > charMap.get(characters[maxIndex]))
      maxIndex = i;
  }
  return characters[maxIndex];
};

/*
 * Problem: Find Duplicates
 *
 * Given an array, return all the duplicate elements.
 *
 * Example:
 * Input: [4,3,2,7,8,2,3,1]
 * Output: [2,3]
 *
 */

const findDuplicates = (nums: number[]) => {
  const numMaps = new Map();
  const duplicates: number[] = [];

  for (let i = 0; i < nums.length; i++) {
    numMaps.get(nums[i]) !== 1
      ? numMaps.set(nums[i], 1)
      : duplicates.push(nums[i]);
  }
  console.log(duplicates);
  return duplicates;
};

/*
 * Problem: First Unique Character
 *
 * Given a string, return the index of the first unique character.
 *
 * Example:
 * Input: "leetcode"
 * Output: 0
 *
 */
const firstUniqueCharacter = (str: string) => {
  if (!str || typeof str !== "string") {
    throw new Error("Please enter a valid input");
  }
  let charCount = new Map();
  let charOrder: string[] = [];
  for (let i = 0; i < str.length; i++) {
    if (charCount.get(str[i]) === undefined) {
      charCount.set(str[i], 1);
      charOrder.push(str[i]);
    } else {
      charCount.set(str[i], charCount.get(str[i]) + 1);
    }
  }
  for (let char of charOrder) {
    if (charCount.get(char) === 1) return char;
  }
  throw new Error("All characters repeats at least 2 times");
};

/**DUPLICATED */
/**DUPLICATED */
/**DUPLICATED */
/**DUPLICATED */
/**DUPLICATED */
/*
 * Problem: Find All Duplicates in an Array
 *
 * Given an array, return all duplicate elements.
 *
 * Example:
 * Input: [4,3,2,7,8,2,3,1]
 * Output: [2,3]
 *
 */
