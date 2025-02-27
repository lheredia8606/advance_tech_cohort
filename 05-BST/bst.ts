import { Stack } from "../02-Queue-Stack/Stack";
import { Queue } from "../02-Queue-Stack/Queue";

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
  insert(value: number, currentNode: BSTNode | null = this.root): void {
    const nodeToInsert = new BSTNode(value);
    if (!this.root) {
      this.root = nodeToInsert;
    }
    if (currentNode) {
      let currentValue = currentNode.value;
      if (value < currentValue) {
        if (!currentNode.left) {
          currentNode.left = nodeToInsert;
          return;
        } else {
          this.insert(value, currentNode.left);
        }
      } else if (value > currentValue) {
        if (!currentNode.right) {
          currentNode.right = nodeToInsert;
          return;
        } else {
          this.insert(value, currentNode.right);
        }
      }
    }
  }

  // EASY: Check if a value exists in the BST
  contains(value: number): boolean {
    if (!this.root) {
      return false;
    }
    let currentNode: BSTNode | null = this.root;
    while (currentNode) {
      let currentValue = currentNode.value;
      if (currentValue === value) {
        return true;
      } else if (value < currentValue) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    return false;
  }

  // MEDIUM: Find the minimum value in the BST
  findMin(): number | null {
    if (!this.root) {
      return null;
    }
    let currentNode = this.root;
    while (currentNode.left) {
      currentNode = currentNode.left;
    }
    return currentNode.value;
  }

  // MEDIUM: Find the maximum depth of the BST
  maxDepth(
    currentNode: BSTNode | null = this.root,
    stack: Stack<BSTNode> = new Stack(),
    max = 0
  ): number {
    if (!currentNode) {
      if (stack.size() === 0) {
        return max - 1;
      } else {
        currentNode = stack.pop();
        return this.maxDepth(currentNode!.right, stack, max);
      }
    } else {
      stack.push(currentNode);
      if (stack.size() > max) {
        max = stack.size();
      }
      return this.maxDepth(currentNode.left, stack, max);
    }
  }

  // MEDIUM: Depth-First Search (DFS) Traversal
  dfsIn(
    sortedElements: number[] = [],
    currentNode: BSTNode | null = this.root,
    stack: Stack<BSTNode> = new Stack()
  ): number[] {
    if (!currentNode) {
      if (stack.size() === 0) {
        return sortedElements;
      } else {
        currentNode = stack.pop();
        sortedElements.push(currentNode?.value!);
        return this.dfsIn(sortedElements, currentNode!.right, stack);
      }
    } else {
      stack.push(currentNode);
      return this.dfsIn(sortedElements, currentNode.left, stack);
    }
  }

  // MEDIUM: Breadth-First Search (BFS) Traversal
  bfs(
    elements: number[] = [],
    currentNode: BSTNode | null = this.root,
    queue: Queue<BSTNode> = new Queue()
  ): number[] {
    if (!currentNode) {
      if (queue.size() === 0) {
        return elements;
      } else {
        currentNode = queue.dequeue();
        return this.bfs(elements, currentNode, queue);
      }
    } else {
      elements.push(currentNode.value);
      if (currentNode.left) {
        queue.enqueue(currentNode.left);
      }
      if (currentNode.right) {
        queue.enqueue(currentNode.right);
      }
      currentNode = queue.dequeue();
      return this.bfs(elements, currentNode, queue);
    }
  }
}
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
console.log("BST DFS Traversal:", bst.dfsIn()); // Expected: [3, 5, 7, 10, 13, 15, 17] (or similar)
console.log("BST BFS Traversal:", bst.bfs()); // Expected: [10, 5, 15, 3, 7, 13, 17] (or similar)
console.log("BST Max Depth:", bst.maxDepth()); // Expected: 2
