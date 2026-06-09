export function uniquePathsDP(m, n) {
  const dp = Array.from({ length: m }, () => Array(n).fill(0));
  const steps = [];

  steps.push({ type: "processing", line: 1 }); // def unique_paths(...)
  steps.push({ type: "processing", line: 2 }); // dp = [[0]*n ...]

  for (let i = 0; i < m; ++i) {
    steps.push({ type: "processing", line: 3, i }); // for i in range(m)

    for (let j = 0; j < n; ++j) {
      steps.push({ type: "processing", line: 4, i, j }); // for j in range(n)

      if (i === 0 && j === 0) {
        steps.push({ type: "processing", line: 5, i, j }); // if i == 0 and j == 0
        dp[i][j] = 1;
        steps.push({ type: "start", line: 6, i, j, val: 1 }); // dp[i][j] = 1
      } else {
        steps.push({ type: "processing", line: 7, i, j }); // else
        steps.push({ type: "processing", line: 8, i, j }); // up = ...
        const up = i > 0 ? dp[i-1][j] : 0;
        steps.push({ type: "processing", line: 9, i, j }); // left = ...
        const left = j > 0 ? dp[i][j-1] : 0;
        dp[i][j] = up + left;
        steps.push({ type: "visited", line: 10, i, j, val: dp[i][j] }); // dp[i][j] = up + left
      }
    }
  }

  steps.push({ type: "end", line: 11, i: m-1, j: n-1, val: dp[m-1][n-1] }); // return

  return {
    result: dp[m-1][n-1],
    steps
  };
}
