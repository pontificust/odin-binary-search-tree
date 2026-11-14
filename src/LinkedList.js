import { Node } from "./Node.js";

export class LinkedList {
  length = 0;

  _insertFirstNode(node) {
    this.firstNode = node;
    this.lastNode = node;
    this.length += 1;
  }

  _insertFewNodes(previousNode, values, pos) {
    let j = 0;
    while (j < values.length) {
      if (pos === 0 && j === 0) {
        this.prepend(values[j]);
        pos += 1;
        previousNode = this.firstNode;
      } else if (pos === this.length) {
        this.append(values[j]);
        pos += 1;
        previousNode = this.lastNode;
      } else {
        const node = new Node(values[j], previousNode.nextNode);
        previousNode.nextNode = node;
        previousNode = node;
        this.length += 1;
      }
      j += 1;
    }
  }

  _findNode(index) {
    let i = 0;
    let currentNode = this.firstNode;
    let previousNode;

    while (i < index) {
      i += 1;
      previousNode = currentNode;
      currentNode = currentNode?.nextNode;
    }
    return { previousNode, currentNode };
  }

  size() {
    return this.length;
  }

  head() {
    return this.firstNode?.value;
  }

  tail() {
    return this.lastNode?.value;
  }

  at(index) {
    if (index < 0) return undefined;
    return this._findNode(index).currentNode?.value;
  }

  append(value) {
    const node = new Node(value);
    if (this.length === 0) {
      this._insertFirstNode(node);
      return;
    }
    this.lastNode.nextNode = node;
    this.lastNode = node;
    this.length += 1;
  }

  prepend(value) {
    const node = new Node(value);
    if (this.length === 0) {
      this._insertFirstNode(node);
      return;
    }
    node.nextNode = this.firstNode;
    this.firstNode = node;
    this.length += 1;
  }

  pop() {
    if (this.length === 0) return;

    const headValue = this.head();
    this.firstNode = this.firstNode.nextNode;
    this.length -= 1;
    return headValue;
  }

  contains(callback) {
    if (this.length === 0 && !callback) return false;

    let i = 0;
    let currentNode = this.firstNode;

    while (i < this.length) {
      if (callback(currentNode)) return true;

      currentNode = currentNode.nextNode;
      i += 1;
    }
    return false;
  }

  findIndex(callback) {
    if (this.length === 0 || !callback) return -1;

    let i = 0;
    let currentNode = this.firstNode;

    while (i < this.length) {
      if (callback(currentNode)) {
        return i;
      }

      currentNode = currentNode.nextNode;
      i += 1;
    }
    return -1;
  }

  find(callback) {
    if (this.length === 0 || !callback) return null;

    let i = 0;
    let currentNode = this.firstNode;

    while (i < this.length) {
      if (callback(currentNode)) {
        return currentNode;
      }

      currentNode = currentNode.nextNode;
      i += 1;
    }
    return null;
  }

  toString() {
    if (this.length === 0) return "";

    let i = 0;
    let currentNode = this.firstNode;
    let resultStr = "";

    while (i < this.length) {
      if (i === this.length - 1) {
        resultStr += `{ ${currentNode.value} } -> null`;
      } else {
        resultStr += `{ ${currentNode.value} } -> `;
        currentNode = currentNode.nextNode;
      }
      i += 1;
    }
    return resultStr;
  }

  insertAt(index, ...values) {
    if (index > this.length || index < 0) {
      throw new RangeError("The index is out of bounds");
    }
    let i = 0;
    let currentNode = this.firstNode;
    let previousNode = currentNode;

    while (i <= this.length) {
      if (i === index) {
        this._insertFewNodes(previousNode, values, i);
        return;
      } else {
        previousNode = currentNode;
        currentNode = currentNode.nextNode;
        i += 1;
      }
    }
  }

  removeAt(index) {
    if (index >= this.length || index < 0) {
      throw new RangeError("The index is out of bounds");
    }

    if (index === 0) {
      this.firstNode = this.firstNode.nextNode;
    } else {
      const { previousNode, currentNode } = this._findNode(index);
      previousNode.nextNode = currentNode.nextNode;
      if (index === this.length - 1) {
        this.lastNode = previousNode;
      }
    }
    this.length -= 1;
    if (this.length === 0) {
      this.lastNode = null;
    }
  }
 
  clear() {
    this.firstNode = null;
    this.lastNode = null;
    this.length = 0;
  }
}