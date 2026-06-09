export function minimumPathSumDP(grid) {
  const n = grid.length;
  const m = grid[0].length;
  const dp = Array.from({ length: n }, () => Array(m).fill(0));
  const steps = [];

  steps.push({ type: "processing", line: 1 }); // function signature
  steps.push({ type: "processing", line: 2 }); // int n = ...
  steps.push({ type: "processing", line: 3 }); // int m = ...
  steps.push({ type: "processing", line: 4 }); // dp init

  for (let i = 0; i < n; ++i) {
    steps.push({ type: "processing", line: 5 }); // outer loop

    for (let j = 0; j < m; ++j) {
      steps.push({ type: "processing", line: 6, i, j }); // inner loop

      if (i === 0 && j === 0) {
        steps.push({ type: "processing", line: 7, i, j });
        dp[i][j] = grid[i][j];
        steps.push({ type: "start", i, j, val: dp[i][j], line: 8 });
      } else {
        steps.push({ type: "processing", line: 9, i, j });

        const up = i > 0 ? dp[i - 1][j] : Infinity;
        steps.push({ type: "processing", line: 10, i, j });

        const left = j > 0 ? dp[i][j - 1] : Infinity;
        steps.push({ type: "processing", line: 11, i, j });

        dp[i][j] = grid[i][j] + Math.min(up, left);
        steps.push({ type: "visited", i, j, val: dp[i][j], line: 12 });
      }
    }
  }

  steps.push({ type: "end", i: n - 1, j: m - 1, val: dp[n - 1][m - 1], line: 13 });

  return {
    result: dp[n - 1][m - 1],
    steps
  };
}
