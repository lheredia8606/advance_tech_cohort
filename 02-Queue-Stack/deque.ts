export const deque = <T>() => {
  const queue: T[] = [];

  return {
    addFront: (element: T) => {
      queue.push(element);
    },
    addBack: (element: T) => {
      queue.unshift(element);
    },
    removeFront: () => {
      return queue.pop();
    },
    removeBack: () => {
      return queue.shift();
    },
    peekFront: () => {
      return queue[queue.length - 1];
    },
    peeKBack: () => {
      return queue[0];
    },
    isEmpty: () => {
      return queue.length === 0;
    },
    size: () => {
      return queue.length;
    },
    print: () => {
      return queue.join(" <= ");
    },
  };
};
