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
});
