import { Node } from "./Node.js";

export class Tree {
  constructor(arr) {
    this.root = null;
    this._buildTree(arr);
  }

  _buildTree(arr) {
    const preparedArr = Array.from(new Set(arr)).sort((a,b) => a - b);

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

  printTree(prefix = "", isLeft = true) {
    if (this.root === null || this.root === undefined) {
      return;
    }

    this.prettyPrint(
      this.root.right,
      `${prefix}${isLeft ? "│   " : "    "}`,
      false,
    );
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${this.root.data}`);
    this.prettyPrint(
      this.root.left,
      `${prefix}${isLeft ? "    " : "│   "}`,
      true,
    );
  }
}