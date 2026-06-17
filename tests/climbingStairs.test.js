import test from "node:test";
import assert from "node:assert/strict";
import { climbingStairsDP } from "../js/problems/climbingStairs.js";
import { assertValidSteps } from "./helpers.js";

test("climbingStairs: n=5 has 8 distinct ways (LeetCode #70 example)", () => {
  const { result, steps } = climbingStairsDP(5);
  assert.equal(result, 8);
  assertValidSteps(steps);
});

test("climbingStairs: n=1 takes the early-return branch (n <= 2)", () => {
  const { result, steps } = climbingStairsDP(1);
  assert.equal(result, 1);
  assertValidSteps(steps);
});

test("climbingStairs: n=2 takes the early-return branch (n <= 2)", () => {
  const { result, steps } = climbingStairsDP(2);
  assert.equal(result, 2);
  assertValidSteps(steps);
});

test("climbingStairs: n=10 follows the Fibonacci-style recurrence", () => {
  const { result, steps } = climbingStairsDP(10);
  assert.equal(result, 89);
  assertValidSteps(steps);
});
