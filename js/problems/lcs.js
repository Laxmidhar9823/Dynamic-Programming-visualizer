// Python code lines:
// 1:  def lcs(s1: str, s2: str) -> int:
// 2:      m, n = len(s1), len(s2)
// 3:      dp = [[0]*(n+1) for _ in range(m+1)]
// 4:      for i in range(1, m+1):
// 5:          for j in range(1, n+1):
// 6:              if s1[i-1] == s2[j-1]:
// 7:                  dp[i][j] = dp[i-1][j-1] + 1
// 8:              else:
// 9:                  dp[i][j] = max(dp[i-1][j], dp[i][j-1])
// 10:     return dp[m][n]

export function lcsDP(s1, s2) {
  const m  = s1.length;
  const n  = s2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  const steps = [];

  steps.push({ type: "processing", line: 1 }); // def lcs
  steps.push({ type: "processing", line: 2 }); // m, n = len(s1), len(s2)
  steps.push({ type: "processing", line: 3 }); // dp init

  // Base row (row 0) — all zeros
  for (let j = 0; j <= n; j++) {
    steps.push({ type: j === 0 ? "start" : "visited", i: 0, j, val: 0, line: 3 });
  }
  // Base col (col 0, rows 1..m) — all zeros
  for (let i = 1; i <= m; i++) {
    steps.push({ type: "visited", i, j: 0, val: 0, line: 3 });
  }

  for (let i = 1; i <= m; i++) {
    steps.push({ type: "processing", line: 4 }); // outer loop
    for (let j = 1; j <= n; j++) {
      steps.push({ type: "processing", line: 5 }); // inner loop
      steps.push({ type: "processing", line: 6, i, j }); // if s1[i-1] == s2[j-1]

      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        // "start" (blue) marks a character match — most informative visual
        steps.push({ type: "start", i, j, val: dp[i][j], line: 7 });
      } else {
        steps.push({ type: "processing", line: 8, i, j }); // else
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        steps.push({ type: "visited", i, j, val: dp[i][j], line: 9 });
      }
    }
  }

  steps.push({ type: "end", i: m, j: n, val: dp[m][n], line: 10 }); // return

  return { result: dp[m][n], steps };
}
