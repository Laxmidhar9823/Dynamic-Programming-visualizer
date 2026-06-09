export function maxPathSumDP(grid) {
  const n = grid.length;
  const m = grid[0].length;
  const dp = Array.from({ length: n }, () => Array(m).fill(0));
  const steps = [];

  // Line 1: Function signature
  steps.push({ type: "processing", line: 1 });

  // Line 2: Get number of rows
  steps.push({ type: "processing", line: 2 });

  // Line 3: Get number of columns
  steps.push({ type: "processing", line: 3 });

  // Line 4: Initialize DP table
  steps.push({ type: "processing", line: 4 });

  for (let i = 0; i < n; i++) {
    // Line 5: Outer loop
    steps.push({ type: "processing", line: 5, i });

    for (let j = 0; j < m; j++) {
      // Line 6: Inner loop
      steps.push({ type: "processing", line: 6, i, j });

      if (i === 0 && j === 0) {
        // Line 7: Starting cell
        steps.push({ type: "processing", line: 7, i, j });

        // Line 8: Assign start value
        dp[i][j] = grid[i][j];
        steps.push({ type: "start", line: 8, i, j, val: dp[i][j] });
      } else {
        // Line 9: Else block
        steps.push({ type: "processing", line: 9, i, j });

        // Line 10: From top
        const fromTop = i > 0 ? dp[i - 1][j] : Number.MIN_SAFE_INTEGER;
        steps.push({ type: "processing", line: 10, i, j });

        // Line 11: From left
        const fromLeft = j > 0 ? dp[i][j - 1] : Number.MIN_SAFE_INTEGER;
        steps.push({ type: "processing", line: 11, i, j });

        // Line 12: Assignment
        dp[i][j] = grid[i][j] + Math.max(fromTop, fromLeft);
        steps.push({ type: "visited", line: 12, i, j, val: dp[i][j] });
      }
    }
  }

  // Line 16: Return result
  steps.push({ type: "end", line: 13, i: n - 1, j: m - 1, val: dp[n - 1][m - 1] });

  return {
    result: dp[n - 1][m - 1],
    steps
  };
}
