// insertAtBeginning(value) – Inserts a node at the start.
// insertAtEnd(value) – Inserts a node at the end.
// insertAtPosition(index, value) – Inserts a node at a specific position.
// deleteAtBeginning() – Removes a node from the start.
// deleteAtEnd() – Removes a node from the end.
// deleteAtPosition(index) – Removes a node at a specific position.
// search(value) – Searches for a node with a given value.
// traverse() – Traverses and prints the list.
// Advanced Operations
// reverse() – Reverses the linked list.
// findMiddle() – Finds the middle node.
// detectCycle() – Detects if there is a cycle (Floyd’s Cycle Detection).
// removeCycle() – Removes a cycle in the linked list.
// length() – Returns the length of the list.
// isEmpty() – Checks if the list is empty.
// sort() – Sorts the linked list.
// Additional Utility Methods
// get(index) – Retrieves the value at a given index.
// set(index, value) – Updates the value at a given index.
// clear() – Clears the entire list.
// toArray() – Converts the linked list into an array.
// merge(otherList) – Merges another linked list.
// removeDuplicates() – Removes duplicate values from the list.

type TLLNode<T> = {
  next: TLLNode<T> | null;
  value: T;
};
export class LinkedList<T> {
  private head: TLLNode<T> | null = null;
  private tail: TLLNode<T> | null = null;
  private length: number = 0;

  insertAtBeginning(value: T): number {
    const newNode: TLLNode<T> = { value, next: null };
    const currentHead = this.head;
    this.head = newNode;
    this.head.next = currentHead;
    if (this.length === 0) {
      this.tail = newNode;
    }
    return ++this.length;
  }

  insertAtEnd(value: T): number {
    const newNode: TLLNode<T> = { value, next: null };
    if (this.length === 0) {
      return this.insertAtBeginning(value);
    }
    this.tail!.next = newNode;
    this.tail = newNode;
    return ++this.length;
  }

  insertAtIndex(index: number, value: T) {
    const newNode: TLLNode<T> = { value, next: null };
    if (index <= 0) {
      this.insertAtBeginning(value);
    } else if (index >= this.length) {
      this.insertAtEnd(value);
    } else {
      let currentNodeIndex = 1;
      let previousNode = this.head;
      let currentNode = previousNode?.next!;
      while (index !== currentNodeIndex) {
        previousNode = currentNode;
        currentNode = previousNode.next!;
        currentNodeIndex++;
      }
      previousNode!.next = newNode;
      newNode.next = currentNode;
      return ++this.length;
    }
  }
  deleteAtBeginning() {
    const currentHead = this.head;
    if (currentHead) {
      if (this.length === 1) {
        this.head = null;
        this.tail = null;
        return --this.length;
      }
      this.head = currentHead.next;
      return --this.length;
    }
    return this.length;
  }
  deleteAtEnd(): number {
    if (this.length < 2) {
      return this.deleteAtBeginning();
    }
    let currentNode = this.head;
    while (currentNode?.next?.next) {
      currentNode = currentNode.next;
    }
    currentNode!.next = null;
    this.tail = currentNode;
    return --this.length;
  }
  print(): string {
    let currentNode = this.head;
    let strToReturn = `${currentNode?.value || null}`;
    while (currentNode?.next) {
      currentNode = currentNode.next;
      strToReturn = `${strToReturn} => ${currentNode.value}`;
    }
    return strToReturn !== "null" ? `${strToReturn} => null` : "null";
  }
  size() {
    return this.length;
  }
  getHead() {
    return this.head?.value || null;
  }
  getTail() {
    return this.tail?.value || null;
  }
}
