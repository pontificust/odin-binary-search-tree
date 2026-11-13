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
});
