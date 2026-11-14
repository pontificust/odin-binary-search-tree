import { Node } from "./Node.js";

export class Tree {
  constructor(arr) {
    this.root = null;
    this._buildTree(arr);
  }

  _buildTree(arr) {
    const preparedArr = Array.from(new Set(arr)).sort((a, b) => a - b);

    this.root = this._sortedArrToTree(preparedArr, 0, preparedArr.length - 1);
  }

  _sortedArrToTree(arr, start, end) {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const root = new Node(arr[mid]);

    root.left = this._sortedArrToTree(arr, start, mid - 1);
    root.right = this._sortedArrToTree(arr, mid + 1, end);

    return root;
  }

  printTree(node, prefix = "", isLeft = true) {
    if (node === null || node === undefined) {
      return;
    }

    this.printTree(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    this.printTree(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }

  _checkNode(node, value) {
    if (!node) return false;

    if (node.data === value) {
      return true;
    } else if (
      (node.data !== value && node.right === null && node.left === null) ||
      !node
    ) {
      return false;
    }

    const nextNode = node.data > value ? node.left : node.right;

    return this._checkNode(nextNode, value);
  }

  _cutTheSmallestChild(node) {
    let currentNode = node.right;
    let previousNode = node;

    if (currentNode.left === null) {
      previousNode.right = currentNode.right;
      return currentNode;
    }

    while (currentNode !== null) {
      if (!currentNode.left) {
        previousNode.left = currentNode.right;
        return currentNode;
      }
      previousNode = currentNode;
      currentNode = currentNode.left;
    }
  }

  includes(value) {
    return this._checkNode(this.root, value);
  }

  insert(value) {
    let currentNode = this.root;

    if (!this.root) {
      this.root = new Node(value);
      return this.root;
    }

    while (currentNode !== null) {
      if (currentNode.data === value) {
        return this.root;
      } else if (currentNode.data > value && currentNode.left !== null) {
        currentNode = currentNode.left;
      } else if (currentNode.data < value && currentNode.right !== null) {
        currentNode = currentNode.right;
      } else {
        break;
      }
    }

    if (currentNode.data > value) {
      currentNode.left = new Node(value);
    } else {
      currentNode.right = new Node(value);
    }

    return this.root;
  }

  deleteItem(value) {
    let currentNode = this.root;
    let prevNode = currentNode;

    if (!this.root) {
      return;
    }

    if(this.root.data === value) {
      if(!this.root.left && !this.root.right) {
        this.root = null;
        return;
      } else if(this.root.right && this.root.left) {
        const descendant = this._cutTheSmallestChild(this.root);
        descendant.left = this.root.left;
        descendant.right = this.root.right;
        this.root = descendant;
        return;
      } else {
        this.root = this.root.left ?? this.root.right;
        return;
      }
    }

    while (currentNode !== null) {
      if (currentNode.data === value) {
        break;
      } else if (currentNode.data > value && currentNode.left !== null) {
        prevNode = currentNode;
        currentNode = currentNode.left;
      } else if (currentNode.data < value && currentNode.right !== null) {
        prevNode = currentNode;
        currentNode = currentNode.right;
      } else {
        return;
      }
    }

    const dir = prevNode.data > currentNode.data ? "left" : "right";
    if (currentNode.left && currentNode.right) {
      let descendant = this._cutTheSmallestChild(currentNode);
      prevNode[dir] = descendant;
      descendant.right = currentNode.right;
      descendant.left = currentNode.left;
    } else if (
      (!currentNode.left && currentNode.right) ||
      (currentNode.left && !currentNode.right)
    ) {
      prevNode[dir] = currentNode.left ?? currentNode.right;
    } else {
      prevNode[dir] = null;
    }
  }
}

const tree = new Tree([8,4, 3]);
tree.deleteItem(8)
tree.deleteItem(4)
tree.printTree(tree.root);
