import test from "node:test";
import assert from "node:assert/strict";
import { coinChangeDP } from "../js/problems/coin_change.js";
import { assertValidSteps } from "./helpers.js";

test("coinChange: [1,2,5] for amount 11 needs 3 coins (LeetCode #322 example)", () => {
  const { result, steps } = coinChangeDP([1, 2, 5], 11);
  assert.equal(result, 3);
  assertValidSteps(steps);
});

test("coinChange: amount unreachable with given coins returns -1", () => {
  const { result, steps } = coinChangeDP([2], 3);
  assert.equal(result, -1);
  assertValidSteps(steps);
});

test("coinChange: amount 0 always needs 0 coins", () => {
  const { result, steps } = coinChangeDP([1], 0);
  assert.equal(result, 0);
  assertValidSteps(steps);
});
