import test from "node:test";
import assert from "node:assert/strict";
import { partitionSubsetDP } from "../js/problems/partitionSubset.js";
import { assertValidSteps } from "./helpers.js";

test("partitionSubset: [1,5,11,5] can be split into equal-sum halves (LeetCode #416)", () => {
  const { result, steps } = partitionSubsetDP([1, 5, 11, 5]);
  assert.equal(result, true);
  assertValidSteps(steps);
});

test("partitionSubset: even total sum that still cannot be partitioned", () => {
  // total = 8, target = 4, but no subset of [1,2,5] sums to 4
  const { result, steps } = partitionSubsetDP([1, 2, 5]);
  assert.equal(result, false);
  assertValidSteps(steps);
});

test("partitionSubset: odd total sum is rejected before the DP table runs", () => {
  const { result, steps } = partitionSubsetDP([1, 2, 3, 9]);
  assert.equal(result, false);
  assertValidSteps(steps);
});
