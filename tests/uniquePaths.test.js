import test from "node:test";
import assert from "node:assert/strict";
import { uniquePathsDP } from "../js/problems/uniquePaths.js";
import { assertValidSteps } from "./helpers.js";

test("uniquePaths: 3x7 grid has 28 unique paths (LeetCode #62 example)", () => {
  const { result, steps } = uniquePathsDP(3, 7);
  assert.equal(result, 28);
  assertValidSteps(steps);
});

test("uniquePaths: 3x2 grid has 3 unique paths", () => {
  const { result, steps } = uniquePathsDP(3, 2);
  assert.equal(result, 3);
  assertValidSteps(steps);
});

test("uniquePaths: 1x1 grid has exactly 1 path (single cell, no moves)", () => {
  const { result, steps } = uniquePathsDP(1, 1);
  assert.equal(result, 1);
  assertValidSteps(steps);
});
