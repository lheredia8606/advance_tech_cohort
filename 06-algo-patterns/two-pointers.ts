// 1. Remove Duplicates from Sorted Array (Easy)
// Given a sorted array, remove the duplicates in-place such that each element appears only once.
// Return the new length of the array.
const removeDuplicates = (nums: number[]) => {
  if (nums.length < 2) {
    return nums;
  }

  let unrepeatedIdex = 0;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[unrepeatedIdex]) {
      unrepeatedIdex++;
      nums[unrepeatedIdex] = nums[i];
    }
  }
  return nums.slice(0, unrepeatedIdex + 1);
};
// Test Cases
console.log(removeDuplicates([1, 1, 2, 3, 3, 4])); // Normal Case: [1, 2, 3, 4]
console.log(removeDuplicates([])); // Edge Case: Empty array

// 2. Two Sum II - Input Array is Sorted (Easy)
// Given a sorted array and a target number, return indices of the two numbers that add up to target.
function twoSumSorted(nums: number[], target: number) {
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    const sum = nums[left] + nums[right];
    if (sum === target) {
      return [left, right];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }
  return [-1, -1];
}
// Test Cases
console.log(twoSumSorted([2, 7, 11, 15], 9)); // Normal Case: [0, 1]
console.log(twoSumSorted([1, 2, 3, 4], 10)); // Edge Case: No valid pairs
// 3. Container With Most Water (Medium)
// Given an array representing heights of vertical lines, find two lines that together with the x-axis form a container that holds the most water.
function maxArea(height: number[]): number {
  let left = 0;
  let right = height.length - 1;
  let maxWater = 0;
  while (left < right) {
    const currentWater = Math.min(height[left], height[right]) * (right - left);
    if (currentWater > maxWater) {
      maxWater = currentWater;
    }
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }
  return maxWater;
}
// Test Cases
console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 3])); // Normal Case
console.log(maxArea([1, 1])); // Edge Case: Minimal height difference
console.log(maxArea([1])); // Edge Case: 0
console.log(maxArea([0])); // Edge Case: 0

// 4. Three Sum (Medium)
// Given an integer array, return all unique triplets that sum up to zero.
function threeSum(nums: number[]) {
  nums = nums.sort((a, b) => a - b);
  const triplets = new Set<string>();
  for (let i = 0; i < nums.length - 2; i++) {
    let left = i + 1;
    let right = nums.length - 1;
    while (left < right) {
      const totalSum = nums[i] + nums[left] + nums[right];
      if (totalSum === 0) {
        triplets.add(JSON.stringify([nums[i], nums[left], nums[right]]));
        left++;
        right--;
      } else if (totalSum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }
  return Array.from(triplets).map((triplet) => JSON.parse(triplet));
}
// Test Cases
console.log(threeSum([-1, 0, 2, -2, 1, 2, -1, -4])); // Normal Case
console.log(threeSum([0, 0, 0, 0])); // Edge Case: All elements are the same
