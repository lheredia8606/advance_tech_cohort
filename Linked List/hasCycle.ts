/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
  if (!head) {
    return false;
  }
  let slow = head.next;
  let fast = head.next?.next;
  while (slow !== fast && slow != null && fast != null) {
    slow = slow.next;
    fast = fast?.next?.next;
  }
  if (slow == null || fast == null) {
    return false;
  }
  slow = head;
  let index = 0;
  while (slow !== fast) {
    slow = slow?.next;
    fast = fast?.next;
    index++;
  }
  return true;
};
