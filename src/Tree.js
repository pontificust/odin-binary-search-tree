import { TreeNode } from "./TreeNode.js";
import { LinkedList } from "./LinkedList.js";

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
    const root = new TreeNode(arr[mid]);

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
      this.root = new TreeNode(value);
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
      currentNode.left = new TreeNode(value);
    } else {
      currentNode.right = new TreeNode(value);
    }

    return this.root;
  }

  deleteItem(value) {
    let currentNode = this.root;
    let prevNode = currentNode;

    if (!this.root) {
      return;
    }

    if (this.root.data === value) {
      if (!this.root.left && !this.root.right) {
        this.root = null;
        return;
      } else if (this.root.right && this.root.left) {
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

  levelOrderForEachIterative(callback) {
    if (!callback) throw new Error("A callback is required!");

    if (!this.root) return;

    const queue = new LinkedList();

    let currentNode = this.root;
    queue.append(currentNode);

    while (currentNode) {
      callback(currentNode);
      queue.pop();
      if (currentNode.left) queue.append(currentNode.left);
      if (currentNode.right) queue.append(currentNode.right);
      currentNode = queue.at(0);
    }
  }

  _levelOrderNode(queue, currentNode, callback) {
    callback(currentNode);
    queue.pop();
    if (currentNode.left) queue.append(currentNode.left);
    if (currentNode.right) queue.append(currentNode.right);
    if (queue.size() === 0) return;
    this._levelOrderNode(queue, queue.at(0), callback);
  }

  _inOrderNode(currentNode, callback) {
    if (!currentNode) return;
    this._inOrderNode(currentNode.left, callback);
    callback(currentNode);
    this._inOrderNode(currentNode.right, callback);
  }

  _preOrderNode(currentNode, callback) {
    if (!currentNode) return;
    callback(currentNode);
    this._preOrderNode(currentNode.left, callback);
    this._preOrderNode(currentNode.right, callback);
  }

  _postOrderNode(currentNode, callback) {
    if (!currentNode) return;
    this._postOrderNode(currentNode.left, callback);
    this._postOrderNode(currentNode.right, callback);
    callback(currentNode);
  }

  levelOrderForEachRecursive(callback) {
    if (!callback) throw new Error("A callback is required!");

    if (!this.root) return;

    const queue = new LinkedList();

    let currentNode = this.root;
    queue.append(currentNode);

    this._levelOrderNode(queue, currentNode, callback);
  }

  inOrderForEach(callback) {
    if (!callback) throw new Error("A callback is required!");

    if (!this.root) return;

    let currentNode = this.root;

    this._inOrderNode(currentNode, callback);
  }

  preOrderForEach(callback) {
    if (!callback) throw new Error("A callback is required!");

    if (!this.root) return;

    let currentNode = this.root;

    this._preOrderNode(currentNode, callback);
  }

  postOrderForEach(callback) {
    if (!callback) throw new Error("A callback is required!");

    if (!this.root) return;

    let currentNode = this.root;

    this._postOrderNode(currentNode, callback);
  }
}

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
tree.inOrderForEach((node) => console.log(node.data));
tree.printTree(tree.root);
