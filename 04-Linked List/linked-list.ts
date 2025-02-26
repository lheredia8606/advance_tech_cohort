// Linked List Implementation
export class ListNode {
  value: number;
  next: ListNode | null;

  constructor(value: number) {
    this.value = value;
    this.next = null;
  }
}

export class LinkedList {
  head: ListNode | null;

  constructor() {
    this.head = null;
  }

  /**
   * changed in case I need to chain something
   *
   * @param value
   * @returns ListNode
   */
  // EASY: Append a value to the end of the list
  append(value: number): ListNode {
    const newNode = new ListNode(value);
    if (this.head) {
      this.head = newNode;
    } else {
      let tail = this.head!;
      while (tail.next) {
        tail = tail.next;
      }
      tail.next = newNode;
    }
    return newNode;
  }

  // EASY: Find a value in the list
  find(value: number): boolean {
    let currentNode = this.head;
    while (currentNode) {
      if (currentNode.value === value) {
        return true;
      }
      currentNode = currentNode.next;
    }
    return false;
  }

  removeHead(): ListNode | null {
    if (this.head == null) {
      return null;
    }
    const oldHead = this.head;
    this.head = this.head.next;
    return oldHead;
  }

  // MEDIUM: Reverse the linked list
  reverse(): void {}

  // MEDIUM: Remove a node by value
  remove(value: number): void {
    // TODO: Implement remove method
  }
}

const linkedList = new LinkedList();
linkedList.append(1);
linkedList.append(2);
linkedList.append(3);
linkedList.append(4);
linkedList.append(5);

console.log("Linked List Find 3:", linkedList.find(3)); // Expected: true
linkedList.reverse();
console.log("Linked List Reversed Find 3:", linkedList.find(3)); // Expected: true
linkedList.remove(3);
console.log("Linked List Find 3 After Removal:", linkedList.find(3)); // Expected: false
