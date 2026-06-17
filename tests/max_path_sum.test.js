import test from "node:test";
import assert from "node:assert/strict";
import { maxPathSumDP } from "../js/problems/max_path_sum.js";
import { assertValidSteps } from "./helpers.js";

test("maxPathSum: classic 3x3 grid maxes out at 12", () => {
  const { result, steps } = maxPathSumDP([
    [1, 3, 1],
    [1, 5, 1],
    [4, 2, 1],
  ]);
  assert.equal(result, 12);
  assertValidSteps(steps);
});

test("maxPathSum: single-cell grid returns that cell's value", () => {
  const { result, steps } = maxPathSumDP([[5]]);
  assert.equal(result, 5);
  assertValidSteps(steps);
});

test("maxPathSum: single row forces a straight path (sum of all cells)", () => {
  const { result, steps } = maxPathSumDP([[1, 2, 3, 4]]);
  assert.equal(result, 10);
  assertValidSteps(steps);
});
