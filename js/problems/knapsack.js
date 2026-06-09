// Python code lines:
// 1:  def knapsack(weights, values, capacity):
// 2:      n = len(weights)
// 3:      dp = [[0]*(capacity+1) for _ in range(n+1)]
// 4:      for i in range(1, n+1):
// 5:          for w in range(capacity+1):
// 6:              dp[i][w] = dp[i-1][w]
// 7:              if weights[i-1] <= w:
// 8:                  take = dp[i-1][w-weights[i-1]] + values[i-1]
// 9:                  dp[i][w] = max(dp[i][w], take)
// 10:     return dp[n][capacity]

export function knapsackDP(weights, values, capacity) {
  const n  = weights.length;
  const dp = Array.from({ length: n + 1 }, () => new Array(capacity + 1).fill(0));
  const steps = [];

  steps.push({ type: "processing", line: 1 }); // def knapsack
  steps.push({ type: "processing", line: 2 }); // n = len(weights)
  steps.push({ type: "processing", line: 3 }); // dp init

  // Base row (row 0) — all zeros
  for (let w = 0; w <= capacity; w++) {
    steps.push({ type: w === 0 ? "start" : "visited", i: 0, j: w, val: 0, line: 3 });
  }

  for (let i = 1; i <= n; i++) {
    steps.push({ type: "processing", line: 4 }); // outer loop
    for (let w = 0; w <= capacity; w++) {
      steps.push({ type: "processing", line: 5 }); // inner loop

      dp[i][w] = dp[i - 1][w]; // skip item by default

      if (weights[i - 1] <= w) {
        steps.push({ type: "processing", line: 7, i, j: w }); // if condition
        steps.push({ type: "processing", line: 8, i, j: w }); // take = ...
        const take = dp[i - 1][w - weights[i - 1]] + values[i - 1];
        dp[i][w] = Math.max(dp[i][w], take);
        steps.push({ type: "visited", i, j: w, val: dp[i][w], line: 9 }); // max update
      } else {
        steps.push({ type: "visited", i, j: w, val: dp[i][w], line: 6 }); // skip
      }
    }
  }

  steps.push({ type: "end", i: n, j: capacity, val: dp[n][capacity], line: 10 }); // return

  return { result: dp[n][capacity], steps };
}
