// Python code lines:
// 1: def climb_stairs(n: int) -> int:
// 2:     if n <= 2:
// 3:         return n
// 4:     dp = [0] * (n + 1)
// 5:     dp[1], dp[2] = 1, 2
// 6:     for i in range(3, n + 1):
// 7:         dp[i] = dp[i-1] + dp[i-2]
// 8:     return dp[n]

export function climbingStairsDP(n) {
  const dp = new Array(n + 1).fill(0);
  const steps = [];

  steps.push({ type: "processing", line: 1 }); // def climb_stairs
  steps.push({ type: "processing", line: 2 }); // if n <= 2

  if (n <= 2) {
    dp[n] = n;
    steps.push({ type: "end", i: 0, j: n - 1, val: n, line: 3 }); // return n
    return { result: n, steps };
  }

  steps.push({ type: "processing", line: 4 }); // dp = [0] * (n+1)

  dp[1] = 1;
  steps.push({ type: "start",   i: 0, j: 0, val: 1, line: 5 }); // dp[1] = 1

  dp[2] = 2;
  steps.push({ type: "visited", i: 0, j: 1, val: 2, line: 5 }); // dp[2] = 2

  for (let i = 3; i <= n; i++) {
    steps.push({ type: "processing", line: 6 }); // for i in range(3, n+1)
    dp[i] = dp[i - 1] + dp[i - 2];
    steps.push({ type: "visited", i: 0, j: i - 1, val: dp[i], line: 7 }); // dp[i] = ...
  }

  steps.push({ type: "end", i: 0, j: n - 1, val: dp[n], line: 8 }); // return dp[n]

  return { result: dp[n], steps };
}
