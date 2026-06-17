import test from "node:test";
import assert from "node:assert/strict";
import { houseRobberDP } from "../js/problems/houseRobber.js";
import { assertValidSteps } from "./helpers.js";

test("houseRobber: classic example maxes out at 12 (LeetCode #198)", () => {
  const { result, steps } = houseRobberDP([2, 7, 9, 3, 1]);
  assert.equal(result, 12);
  assertValidSteps(steps);
});

test("houseRobber: single house — rob it, no neighbors to alert", () => {
  const { result, steps } = houseRobberDP([7]);
  assert.equal(result, 7);
  assertValidSteps(steps);
});

test("houseRobber: two adjacent houses — rob the larger one", () => {
  const { result, steps } = houseRobberDP([2, 1]);
  assert.equal(result, 2);
  assertValidSteps(steps);
});
