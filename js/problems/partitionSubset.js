// Python code lines:
// 1:  def can_partition(nums: list[int]) -> bool:
// 2:      total = sum(nums)
// 3:      if total % 2 != 0: return False
// 4:      target = total // 2
// 5:      n = len(nums)
// 6:      dp = [[False]*(target+1) for _ in range(n+1)]
// 7:      for i in range(n+1): dp[i][0] = True
// 8:      for i in range(1, n+1):
// 9:          for j in range(1, target+1):
// 10:             dp[i][j] = dp[i-1][j]
// 11:             if nums[i-1] <= j:
// 12:                 dp[i][j] = dp[i][j] or dp[i-1][j-nums[i-1]]
// 13:     return dp[n][target]

export function partitionSubsetDP(nums) {
  const total  = nums.reduce((a, b) => a + b, 0);
  const steps  = [];

  steps.push({ type: "processing", line: 1 }); // def can_partition
  steps.push({ type: "processing", line: 2 }); // total = sum(nums)
  steps.push({ type: "processing", line: 3 }); // if total % 2 != 0

  if (total % 2 !== 0) {
    steps.push({ type: "end", line: 3, val: "False" });
    return { result: false, steps };
  }

  const target = total >> 1;
  const n      = nums.length;
  const dp     = Array.from({ length: n + 1 }, () => new Array(target + 1).fill(false));

  steps.push({ type: "processing", line: 4 }); // target = total // 2
  steps.push({ type: "processing", line: 5 }); // n = len(nums)
  steps.push({ type: "processing", line: 6 }); // dp init

  // Base column (col 0) — all True (empty subset sums to 0)
  for (let i = 0; i <= n; i++) {
    dp[i][0] = true;
    steps.push({ type: i === 0 ? "start" : "visited", i, j: 0, val: "✓", line: 7 });
  }

  for (let i = 1; i <= n; i++) {
    steps.push({ type: "processing", line: 8 }); // outer loop
    for (let j = 1; j <= target; j++) {
      steps.push({ type: "processing", line: 9 }); // inner loop

      dp[i][j] = dp[i - 1][j];
      steps.push({ type: "processing", line: 10, i, j }); // inherit

      if (nums[i - 1] <= j) {
        steps.push({ type: "processing", line: 11, i, j }); // if condition
        dp[i][j] = dp[i][j] || dp[i - 1][j - nums[i - 1]];
        steps.push({ type: "processing", line: 12, i, j }); // or operation
      }

      if (dp[i][j]) {
        steps.push({ type: "visited", i, j, val: "✓", line: nums[i - 1] <= j ? 12 : 10 });
      }
    }
  }

  const finalResult = dp[n][target];
  steps.push({
    type: finalResult ? "visited" : "end",
    i: n, j: target,
    val: finalResult ? "✓" : "✗",
    line: 13,
  });

  return { result: finalResult, steps };
}
