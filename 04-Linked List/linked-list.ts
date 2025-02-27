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
   * changed in return from void to LinkedLink in case I need to chain something
   *
   * @param value
   * @returns ListNode
   */
  // EASY: Append a value to the end of the list
  append(value: number): LinkedList {
    const newNode = new ListNode(value);
    if (!this.head) {
      this.head = newNode;
    } else {
      let tail = this.head!;
      while (tail.next) {
        tail = tail.next;
      }
      tail.next = newNode;
    }
    return this;
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

  // MEDIUM: Reverse the linked list
  reverse(): LinkedList {
    if (!this.head || !this.head.next) {
      return this;
    }
    const oldHead = this.removeHead();
    return this.reverse().append(oldHead!.value);
  }

  // MEDIUM: Remove a node by value
  remove(value: number): ListNode | null {
    if (this.head?.value === value) {
      return this.removeHead();
    }
    let previousNode = this.head;
    while (previousNode?.next) {
      let currentNode = previousNode.next;
      if (currentNode.value === value) {
        previousNode.next = currentNode.next;
        return currentNode;
      }
      previousNode = currentNode;
    }
    return null;
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

  removeHead(): ListNode | null {
    if (this.head == null) {
      return null;
    }
    const oldHead = this.head;
    this.head = this.head.next;
    return oldHead;
  }
}

const linkedList = new LinkedList();
linkedList.append(1);
linkedList.append(2);
linkedList.append(3);
linkedList.append(4);
linkedList.append(5);
console.log(linkedList.find(3));
console.log(linkedList.print());
linkedList.reverse();
console.log(linkedList.find(3));
console.log(linkedList.print());
linkedList.remove(4);
console.log(linkedList.print());
