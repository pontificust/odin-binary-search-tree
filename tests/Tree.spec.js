import { describe, expect, test } from "@jest/globals";
import { Tree } from "../src/Tree.js";

describe("Tree", () => {
  describe("building a balanced seacrch tree on a given array", () => {
    test("if the array is empty, the root is null", () => {
      const tree = new Tree([]);
      expect(tree.root).toBeNull();
    });

    test("if the array contains one element, the root's data equals it and it doesn't have children", () => {
      const tree = new Tree([1]);
      expect(tree.root.data).toEqual(1);
      expect(tree.root.left).toEqual(null);
      expect(tree.root.right).toEqual(null);
    });

    test("the input is a standard array of three elements", () => {
      const tree = new Tree([1, 2, 3]);
      expect(tree.root.data).toEqual(2);
      expect(tree.root.left.data).toEqual(1);
      expect(tree.root.left.left).toBeNull();
      expect(tree.root.left.right).toBeNull();
      expect(tree.root.right.data).toEqual(3);
      expect(tree.root.right.left).toBeNull();
      expect(tree.root.right.right).toBeNull();
    });

    test("the input array is sorted and duplicates are removed from it", () => {
      const tree = new Tree([3, 2, 1, 2, 3]);
      expect(tree.root.data).toEqual(2);
      expect(tree.root.left.data).toEqual(1);
      expect(tree.root.left.left).toBeNull();
      expect(tree.root.left.right).toBeNull();
      expect(tree.root.right.data).toEqual(3);
      expect(tree.root.right.left).toBeNull();
      expect(tree.root.right.right).toBeNull();
    });
  });

  describe("includes(value)", () => {
    test("returns false if the value is not in the tree", () => {
      const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
      const oneElemTree = new Tree([1]);
      expect(oneElemTree.includes(2)).toEqual(false);
      expect(tree.includes(555)).toEqual(false);
      expect(tree.includes(666)).toEqual(false);
      expect(tree.includes(777)).toEqual(false);
      expect(tree.includes(888)).toEqual(false);
    });

    test("returns true if the value is in the tree", () => {
      const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
      const oneElemTree = new Tree([1]);
      expect(tree.includes(1)).toEqual(true);
      expect(oneElemTree.includes(1)).toEqual(true);
      expect(tree.includes(6345)).toEqual(true);
      expect(tree.includes(9)).toEqual(true);
      expect(tree.includes(324)).toEqual(true);
    });

    test("returns false if the tree is empty", () => {
      const tree = new Tree([]);
      expect(tree.includes(555)).toEqual(false);
    });
  });

  describe("insert(value)", () => {
    test("adds the new node in the empty tree", () => {
      const tree = new Tree([]);
      const input = [1, 55, -55];

      input.forEach((value) => {
        tree.insert(value);
        expect(tree.includes(value)).toEqual(true);
      });
    });

    test("returns root of the tree and doesn't add a duplicate", () => {
      const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
      const input = [1, 5, 6345];

      input.forEach((value) => {
        expect(tree.insert(value)).toEqual(tree.root);
        expect(tree.includes(value)).toEqual(true);
      });
    });
  });

  describe("deleteItem(value)", () => {
    test("returns undefined if the tree is empty", () => {
      const tree = new Tree([]);
      expect(tree.deleteItem(33)).toBeUndefined();
    });

    test("if the tree contains only the root element", () => {
      const tree = new Tree([1]);
      tree.deleteItem(1);
      expect(tree.root).toBeNull();
    });

    test("deletes the node with the provided value", () => {
      const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
      const input = [1, 5, 6345, 9];

      input.forEach((value) => {
        tree.deleteItem(value);
        expect(tree.includes(value)).toEqual(false);
      });
    });

    test("provided value equals root which has both right and left nodes", () => {
      const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

      tree.deleteItem(8);
      expect(tree.includes(8)).toEqual(false);
    });

    test("provided value equals root which has only a left node", () => {
      const tree = new Tree([8, 4, 3]);

      tree.deleteItem(8);
      tree.deleteItem(4);
      expect(tree.includes(8)).toEqual(false);
      expect(tree.includes(4)).toEqual(false);
    });

    test("provided value equals root which has only a right node", () => {
      const tree = new Tree([8, 10]);

      tree.deleteItem(10);
      expect(tree.includes(10)).toEqual(false);
    });

    test("the tree contains the only element", () => {
      const tree = new Tree([10]);

      tree.deleteItem(4444);
      expect(tree.includes(10)).toEqual(true);
      tree.deleteItem(10);
      expect(tree.includes(10)).toEqual(false);
    });
  });

  describe("levelOrderForEachIterative(callback)", () => {
    test("throws an Error if no callback provided", () => {
      const tree = new Tree([1, 2, 3]);
      expect(() => tree.levelOrderForEachIterative()).toThrow("A callback is required!");
    });

    test("returns undefined if the tree is empty", () => {
      const tree = new Tree();
      expect(tree.levelOrderForEachIterative((node) => console.log(node))).toBeUndefined();
    });

    test("traverses the tree in level order", () => {
      const inputs = [
        { tree: [8, 4, 3], expectedRes: [4, 3, 8] },
        {
          tree: [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324],
          expectedRes: [8, 4, 67, 1, 5, 9, 324, 3, 7, 23, 6345],
        },
      ];

      inputs.forEach((input) => {
        const tree = new Tree(input.tree);
        const result = [];
        const expectedRes = input.expectedRes;

        tree.levelOrderForEachIterative((node) => result.push(node.data));
        expectedRes.forEach((value, idx) => expect(value).toEqual(result[idx]));
      });
    });
  });

   describe("levelOrderForEachRecursive(callback)", () => {
    test("throws an Error if no callback provided", () => {
      const tree = new Tree([1, 2, 3]);
      expect(() => tree.levelOrderForEachRecursive()).toThrow("A callback is required!");
    });

    test("returns undefined if the tree is empty", () => {
      const tree = new Tree();
      expect(tree.levelOrderForEachRecursive((node) => console.log(node))).toBeUndefined();
    });

    test("traverses the tree in level order", () => {
      const inputs = [
        { tree: [8, 4, 3], expectedRes: [4, 3, 8] },
        {
          tree: [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324],
          expectedRes: [8, 4, 67, 1, 5, 9, 324, 3, 7, 23, 6345],
        },
      ];

      inputs.forEach((input) => {
        const tree = new Tree(input.tree);
        const result = [];
        const expectedRes = input.expectedRes;

        tree.levelOrderForEachRecursive((node) => result.push(node.data));
        expectedRes.forEach((value, idx) => expect(value).toEqual(result[idx]));
      });
    });
  });
});
