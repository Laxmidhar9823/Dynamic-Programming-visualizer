import test from "node:test";
import assert from "node:assert/strict";
import { knapsackDP } from "../js/problems/knapsack.js";
import { assertValidSteps } from "./helpers.js";

test("knapsack: classic weights/values/capacity example maxes out at 9", () => {
  const { result, steps } = knapsackDP([1, 3, 4, 5], [1, 4, 5, 7], 7);
  assert.equal(result, 9);
  assertValidSteps(steps);
});

test("knapsack: zero capacity can carry nothing", () => {
  const { result, steps } = knapsackDP([1, 3, 4, 5], [1, 4, 5, 7], 0);
  assert.equal(result, 0);
  assertValidSteps(steps);
});

test("knapsack: no items available yields zero value regardless of capacity", () => {
  const { result, steps } = knapsackDP([], [], 5);
  assert.equal(result, 0);
  assertValidSteps(steps);
});
