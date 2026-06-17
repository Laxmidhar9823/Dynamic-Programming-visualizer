import test from "node:test";
import assert from "node:assert/strict";
import { lcsDP } from "../js/problems/lcs.js";
import { assertValidSteps } from "./helpers.js";

test('lcs: "ABCDE" vs "ACE" has length 3 (LeetCode #1143 example)', () => {
  const { result, steps } = lcsDP("ABCDE", "ACE");
  assert.equal(result, 3);
  assertValidSteps(steps);
});

test('lcs: "AGGTAB" vs "GXTXAYB" has length 4 (classic textbook example)', () => {
  const { result, steps } = lcsDP("AGGTAB", "GXTXAYB");
  assert.equal(result, 4);
  assertValidSteps(steps);
});

test("lcs: empty first string has no common subsequence", () => {
  const { result, steps } = lcsDP("", "ABC");
  assert.equal(result, 0);
  assertValidSteps(steps);
});
