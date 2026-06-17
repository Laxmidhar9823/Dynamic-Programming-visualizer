import test from "node:test";
import assert from "node:assert/strict";
import { minimumPathSumDP } from "../js/problems/minimumPathSum.js";
import { assertValidSteps } from "./helpers.js";

test("minimumPathSum: classic 3x3 grid sums to 7 (LeetCode #64 example)", () => {
  const { result, steps } = minimumPathSumDP([
    [1, 3, 1],
    [1, 5, 1],
    [4, 2, 1],
  ]);
  assert.equal(result, 7);
  assertValidSteps(steps);
});

test("minimumPathSum: single-cell grid returns that cell's value", () => {
  const { result, steps } = minimumPathSumDP([[5]]);
  assert.equal(result, 5);
  assertValidSteps(steps);
});

test("minimumPathSum: single row forces a straight path (sum of all cells)", () => {
  const { result, steps } = minimumPathSumDP([[1, 2, 3, 4]]);
  assert.equal(result, 10);
  assertValidSteps(steps);
});
