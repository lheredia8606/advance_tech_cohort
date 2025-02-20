// 9. Three-Sum Problem
// Write a recursive function to find all unique triplets in an array that sum to zero.
// You must return an array of arrays where each subarray contains a valid triplet.
//
// Example Test Cases:
// console.log(threeSum([-1, 0, 1, 2, -1, -4]));
// Expected Output: [[-1, -1, 2], [-1, 0, 1]]
// console.log(threeSum([0, 1, 1])); // Output: []
// console.log(threeSum([0, 0, 0])); // Output: [[0, 0, 0]]

// function threeSum(arr) {
//   // Your code here
// }
function threeSum(
  arr: number[],
  expectedSum: number = 0,
  numbersLeft: number = 3
): number[][] {
  if (numbersLeft === 1) {
    return arr.includes(expectedSum) ? [[expectedSum]] : [];
  }
  const results: number[][] = [];

  for (let i = 0; i < arr.length; i++) {
    const matches = threeSum(
      arr.slice(i + 1),
      expectedSum - arr[i],
      numbersLeft - 1
    );
    for (let match of matches) {
      results.push([arr[i], ...match]);
    }
  }
  let uniqueAnswers = new Set<string>();

  return results.filter((answer) => {
    let sortedAnswer = answer
      .sort((a, b) => {
        return a - b;
      })
      .join();
    if (!uniqueAnswers.has(sortedAnswer)) {
      uniqueAnswers.add(sortedAnswer);
      return answer;
    }
  });
}

// 10. Rock, Paper, Scissors (Generate All Possible Outcomes)
// Write a recursive function that generates all possible outcomes of a game of Rock, Paper, Scissors for n rounds.
// Each round has three choices: "rock", "paper", or "scissors".
// The function should return an array of arrays, where each inner array represents a sequence of moves.
//
// Example Test Cases:
// console.log(rockPaperScissors(2));
// Expected Output: [
//   ["rock", "rock"], ["rock", "paper"], ["rock", "scissors"],
//   ["paper", "rock"], ["paper", "paper"], ["paper", "scissors"],
//   ["scissors", "rock"], ["scissors", "paper"], ["scissors", "scissors"]
// ]
// console.log(rockPaperScissors(1));
// Expected Output: [["rock"], ["paper"], ["scissors"]]

function rockPaperScissors(n: number): string[][] {
  if (n === 0) {
    return [];
  } else if (n === 1) {
    return [["rock"], ["paper"], ["scissors"]];
  }
  const played: string[][] = rockPaperScissors(n - 1);
  const rockPlays: string[][] = [];
  const paperPlays: string[][] = [];
  const scissorsPlays: string[][] = [];
  for (const play of played) {
    rockPlays.push(["rock", ...play]);
    paperPlays.push(["paper", ...play]);
    scissorsPlays.push(["scissors", ...play]);
  }
  return [...rockPlays, ...paperPlays, ...scissorsPlays];
}
