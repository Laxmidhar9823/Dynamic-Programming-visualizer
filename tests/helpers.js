import assert from "node:assert/strict";

const VALID_STEP_TYPES = new Set(["processing", "start", "visited", "end"]);

// Shared shape-validator for the step trace every js/problems/*.js solver
// returns. Does not assert algorithm-specific values — only the structural
// contract the visualizer relies on (visualizer.js fillGridStep / highlightCodeLine).
export function assertValidSteps(steps) {
  assert.ok(Array.isArray(steps), "steps must be an array");
  assert.ok(steps.length > 0, "steps must not be empty");

  for (const [index, step] of steps.entries()) {
    assert.ok(
      VALID_STEP_TYPES.has(step.type),
      `step[${index}] has invalid type: ${step.type}`
    );
    assert.equal(
      typeof step.line,
      "number",
      `step[${index}] (type=${step.type}) must have a numeric line, got ${step.line}`
    );

    if (step.i !== undefined) {
      assert.ok(
        Number.isInteger(step.i) && step.i >= 0,
        `step[${index}].i must be a non-negative integer, got ${step.i}`
      );
    }
    if (step.j !== undefined) {
      assert.ok(
        Number.isInteger(step.j) && step.j >= 0,
        `step[${index}].j must be a non-negative integer, got ${step.j}`
      );
    }
  }
}
