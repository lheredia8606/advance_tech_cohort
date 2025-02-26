// Binary Search Tree Implementation
export class BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export class BST {
  root: BSTNode | null;

  constructor() {
    this.root = null;
  }

  // EASY: Insert a value into the BST
  insert(value: number): void {
    // TODO: Implement insert method
  }

  // EASY: Check if a value exists in the BST
  contains(value: number): boolean {
    // TODO: Implement contains method
    return false;
  }

  // MEDIUM: Find the minimum value in the BST
  findMin(): number | null {
    // TODO: Implement findMin method
    return null;
  }

  // MEDIUM: Find the maximum depth of the BST
  maxDepth(): number {
    // TODO: Implement maxDepth method
    return 0;
  }

  // MEDIUM: Depth-First Search (DFS) Traversal
  dfs(): number[] {
    // TODO: Implement DFS traversal
    return [];
  }

  // MEDIUM: Breadth-First Search (BFS) Traversal
  bfs(): number[] {
    // TODO: Implement BFS traversal
    return [];
  }
}

// Test Cases
const bst = new BST();
bst.insert(10);
bst.insert(5);
bst.insert(15);
bst.insert(3);
bst.insert(7);
bst.insert(13);
bst.insert(17);

console.log("BST Contains 7:", bst.contains(7)); // Expected: true
console.log("BST Min Value:", bst.findMin()); // Expected: 3
console.log("BST Max Depth:", bst.maxDepth()); // Expected: 3
console.log("BST DFS Traversal:", bst.dfs()); // Expected: [10, 5, 3, 7, 15, 13, 17] (or similar)
console.log("BST BFS Traversal:", bst.bfs()); // Expected: [10, 5, 15, 3, 7, 13, 17] (or similar)
