import { TreeNode } from "./TreeNode.js";
import { LinkedList } from "./LinkedList.js";

export class Tree {
  constructor(arr) {
    this.root = null;
    this.#buildTree(arr);
  }

  #buildTree(arr) {
    const preparedArr = Array.from(new Set(arr)).sort((a, b) => a - b);

    this.root = this.#sortedArrToTree(preparedArr, 0, preparedArr.length - 1);
  }

  #sortedArrToTree(arr, start, end) {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const root = new TreeNode(arr[mid]);

    root.left = this.#sortedArrToTree(arr, start, mid - 1);
    root.right = this.#sortedArrToTree(arr, mid + 1, end);

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

  #checkNode(node, value) {
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

    return this.#checkNode(nextNode, value);
  }

  #cutTheSmallestChild(node) {
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
    return this.#checkNode(this.root, value);
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
        const descendant = this.#cutTheSmallestChild(this.root);
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
      let descendant = this.#cutTheSmallestChild(currentNode);
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

  #levelOrderNode(queue, currentNode, callback) {
    callback(currentNode);
    queue.pop();
    if (currentNode.left) queue.append(currentNode.left);
    if (currentNode.right) queue.append(currentNode.right);
    if (queue.size() === 0) return;
    this.#levelOrderNode(queue, queue.at(0), callback);
  }

  #inOrderNode(currentNode, callback) {
    if (!currentNode) return;
    this.#inOrderNode(currentNode.left, callback);
    callback(currentNode);
    this.#inOrderNode(currentNode.right, callback);
  }

  #preOrderNode(currentNode, callback) {
    if (!currentNode) return;
    callback(currentNode);
    this.#preOrderNode(currentNode.left, callback);
    this.#preOrderNode(currentNode.right, callback);
  }

  #postOrderNode(currentNode, callback) {
    if (!currentNode) return;
    this.#postOrderNode(currentNode.left, callback);
    this.#postOrderNode(currentNode.right, callback);
    callback(currentNode);
  }

  levelOrderForEachRecursive(callback) {
    if (!callback) throw new Error("A callback is required!");

    if (!this.root) return;

    const queue = new LinkedList();

    let currentNode = this.root;
    queue.append(currentNode);

    this.#levelOrderNode(queue, currentNode, callback);
  }

  inOrderForEach(callback) {
    if (!callback) throw new Error("A callback is required!");

    if (!this.root) return;

    let currentNode = this.root;

    this.#inOrderNode(currentNode, callback);
  }

  preOrderForEach(callback) {
    if (!callback) throw new Error("A callback is required!");

    if (!this.root) return;

    let currentNode = this.root;

    this.#preOrderNode(currentNode, callback);
  }

  postOrderForEach(callback) {
    if (!callback) throw new Error("A callback is required!");

    if (!this.root) return;

    let currentNode = this.root;

    this.#postOrderNode(currentNode, callback);
  }

  #nodeHeight(node, height) {
    if (!node) return height;
    height += 1;

    return Math.max(
      this.#nodeHeight(node.left, height),
      this.#nodeHeight(node.right, height),
    );
  }

  height(value) {
    if (!this.root) return;

    let currentNode = this.root;

    while (currentNode) {
      if (currentNode.data === value) {
        return this.#nodeHeight(currentNode, -1);
      }

      if (currentNode.data > value) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
  }

  depth(value) {
    if (!this.root) return;

    let depth = 0;
    let currentNode = this.root;

    while (currentNode) {
      if (currentNode.data === value) {
        return depth;
      }

      if (currentNode.data > value) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }

      depth += 1;
    }
  }

  #checkBalance(node) {
    if (!node) return true;

    if (
      Math.abs(
        this.#nodeHeight(node.left, 0) - this.#nodeHeight(node.right, 0),
      ) > 1
    ) {
      return false;
    }

    return this.#checkBalance(node.left) && this.#checkBalance(node.right);
  }

  isBalanced() {
    return this.#checkBalance(this.root);
  }

  rebalance() {
    const inputArr = [];

    this.inOrderForEach((node) => inputArr.push(node.data));

    this.#buildTree(inputArr);
  }
}