// Python code lines:
// 1: def rob(nums: list[int]) -> int:
// 2:     n = len(nums)
// 3:     dp = [0] * n
// 4:     dp[0] = nums[0]
// 5:     if n > 1:
// 6:         dp[1] = max(nums[0], nums[1])
// 7:     for i in range(2, n):
// 8:         dp[i] = max(dp[i-1], dp[i-2] + nums[i])
// 9:     return dp[n-1]

export function houseRobberDP(nums) {
  const n  = nums.length;
  const dp = new Array(n).fill(0);
  const steps = [];

  steps.push({ type: "processing", line: 1 }); // def rob
  steps.push({ type: "processing", line: 2 }); // n = len(nums)
  steps.push({ type: "processing", line: 3 }); // dp = [0] * n

  dp[0] = nums[0];
  steps.push({ type: "start", i: 0, j: 0, val: dp[0], line: 4 }); // dp[0] = nums[0]

  steps.push({ type: "processing", line: 5 }); // if n > 1
  if (n > 1) {
    dp[1] = Math.max(nums[0], nums[1]);
    steps.push({ type: "visited", i: 0, j: 1, val: dp[1], line: 6 }); // dp[1] = max(...)
  }

  for (let i = 2; i < n; i++) {
    steps.push({ type: "processing", line: 7 }); // for i in range(2, n)
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
    steps.push({ type: "visited", i: 0, j: i, val: dp[i], line: 8 }); // dp[i] = max(...)
  }

  steps.push({ type: "end", i: 0, j: n - 1, val: dp[n - 1], line: 9 }); // return dp[n-1]

  return { result: dp[n - 1], steps };
}
