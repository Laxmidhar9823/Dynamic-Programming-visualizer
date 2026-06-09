import {
  initVisualizer,
  playVisualizer,
  pauseVisualizer,
  stepVisualizer,
  resetVisualizer,
  highlightCode,
  highlightCodeLine,
  setSpeed,
  isPlaying,
} from "./visualizer.js";
window.highlightCodeLine = highlightCodeLine;

import { initResizer } from "./resizer.js";

import { uniquePathsDP    } from "./problems/uniquePaths.js";
import { minimumPathSumDP } from "./problems/minimumPathSum.js";
import { maxPathSumDP     } from "./problems/max_path_sum.js";
import { coinChangeDP     } from "./problems/coin_change.js";
import { climbingStairsDP } from "./problems/climbingStairs.js";
import { houseRobberDP    } from "./problems/houseRobber.js";
import { lcsDP            } from "./problems/lcs.js";
import { knapsackDP       } from "./problems/knapsack.js";
import { partitionSubsetDP} from "./problems/partitionSubset.js";

// ─── Problem metadata ────────────────────────────────────────────────────────

const PROBLEMS = {
  uniquePaths: {
    title: "Unique Paths",
    description: "Count the number of unique paths from the top-left to the bottom-right of an m×n grid, moving only right or down.",
    example: { input: "m = 3, n = 7", output: "28" },
    pattern: "Grid DP",
    difficulty: "Medium",
    leetcode: { num: 62, url: "https://leetcode.com/problems/unique-paths/" },
  },
  minimumPathSum: {
    title: "Minimum Path Sum",
    description: "Find the path from top-left to bottom-right in a weighted grid that minimises the total cost.",
    example: { input: "grid = [[1,3,1],[1,5,1],[4,2,1]]", output: "7" },
    pattern: "Grid DP",
    difficulty: "Medium",
    leetcode: { num: 64, url: "https://leetcode.com/problems/minimum-path-sum/" },
  },
  max_path_sum: {
    title: "Maximum Path Sum",
    description: "Find the path from top-left to bottom-right in a weighted grid that maximises the total sum.",
    example: { input: "grid = [[1,3,1],[1,5,1],[4,2,1]]", output: "12" },
    pattern: "Grid DP",
    difficulty: "Medium",
    leetcode: null,
  },
  climbingStairs: {
    title: "Climbing Stairs",
    description: "Count the number of distinct ways to reach the top of n stairs, taking 1 or 2 steps at a time.",
    example: { input: "n = 5", output: "8" },
    pattern: "Linear DP",
    difficulty: "Easy",
    leetcode: { num: 70, url: "https://leetcode.com/problems/climbing-stairs/" },
  },
  houseRobber: {
    title: "House Robber",
    description: "Rob houses in a row without alerting adjacent neighbours to maximise total loot.",
    example: { input: "nums = [2,7,9,3,1]", output: "12" },
    pattern: "Linear DP",
    difficulty: "Medium",
    leetcode: { num: 198, url: "https://leetcode.com/problems/house-robber/" },
  },
  lcs: {
    title: "Longest Common Subsequence",
    description: "Find the length of the longest subsequence present in both strings in the same relative order.",
    example: { input: 's1 = "ABCDE", s2 = "ACE"', output: "3" },
    pattern: "String DP",
    difficulty: "Medium",
    leetcode: { num: 1143, url: "https://leetcode.com/problems/longest-common-subsequence/" },
  },
  coin_change: {
    title: "Coin Change",
    description: "Given coin denominations and a target amount, find the minimum number of coins needed to make that amount.",
    example: { input: "coins = [1,2,5], amount = 11", output: "3" },
    pattern: "Unbounded Knapsack",
    difficulty: "Medium",
    leetcode: { num: 322, url: "https://leetcode.com/problems/coin-change/" },
  },
  knapsack: {
    title: "0/1 Knapsack",
    description: "Select items with given weights and values to maximise total value without exceeding the weight capacity.",
    example: { input: "weights=[1,3,4,5], values=[1,4,5,7], W=7", output: "9" },
    pattern: "0/1 Knapsack",
    difficulty: "Medium",
    leetcode: null,
  },
  partitionSubset: {
    title: "Partition Equal Subset Sum",
    description: "Determine whether an array can be partitioned into two subsets with equal sums.",
    example: { input: "nums = [1,5,11,5]", output: "True" },
    pattern: "0/1 Knapsack",
    difficulty: "Medium",
    leetcode: { num: 416, url: "https://leetcode.com/problems/partition-equal-subset-sum/" },
  },
};

// ─── Complexity metadata ─────────────────────────────────────────────────────

const COMPLEXITY = {
  uniquePaths:     { time: "Time: O(m·n)",    space: "Space: O(m·n)" },
  minimumPathSum:  { time: "Time: O(m·n)",    space: "Space: O(m·n)" },
  max_path_sum:    { time: "Time: O(m·n)",    space: "Space: O(m·n)" },
  climbingStairs:  { time: "Time: O(n)",      space: "Space: O(n)" },
  houseRobber:     { time: "Time: O(n)",      space: "Space: O(n)" },
  lcs:             { time: "Time: O(m·n)",    space: "Space: O(m·n)" },
  coin_change:     { time: "Time: O(n·amt)",  space: "Space: O(n·amt)" },
  knapsack:        { time: "Time: O(n·W)",    space: "Space: O(n·W)" },
  partitionSubset: { time: "Time: O(n·sum)",  space: "Space: O(n·sum)" },
};

// ─── Context-sensitive input config per problem ───────────────────────────────
// Each entry is an array of input field descriptors.
// Empty array = fixed inputs (show preset note).

const INPUT_CONFIG = {
  uniquePaths:     [
    { id: "rows", label: "Rows (m)", min: 2, max: 10, default: 3 },
    { id: "cols", label: "Cols (n)",  min: 2, max: 10, default: 3 },
  ],
  minimumPathSum:  [
    { id: "rows", label: "Rows", min: 2, max: 8, default: 3 },
    { id: "cols", label: "Cols", min: 2, max: 8, default: 3 },
  ],
  max_path_sum:    [
    { id: "rows", label: "Rows", min: 2, max: 8, default: 3 },
    { id: "cols", label: "Cols", min: 2, max: 8, default: 3 },
  ],
  climbingStairs:  [
    { id: "cols", label: "Number of Stairs (n)", min: 2, max: 10, default: 5 },
  ],
  houseRobber:     [
    { id: "cols", label: "Number of Houses", min: 2, max: 10, default: 5 },
  ],
  lcs:             [
    { id: "rows", label: "String 1 Length", min: 2, max: 6, default: 4 },
    { id: "cols", label: "String 2 Length", min: 2, max: 8, default: 5 },
  ],
  coin_change:     [],
  knapsack:        [],
  partitionSubset: [],
};

// ─── Python code strings ──────────────────────────────────────────────────────

function getUniquePathsCode() {
  return `def unique_paths(m: int, n: int) -> int:
    dp = [[0] * n for _ in range(m)]
    for i in range(m):
        for j in range(n):
            if i == 0 and j == 0:
                dp[i][j] = 1
            else:
                up   = dp[i-1][j] if i > 0 else 0
                left = dp[i][j-1] if j > 0 else 0
                dp[i][j] = up + left
    return dp[m-1][n-1]`;
}

function getMinimumPathSumCode() {
  return `def min_path_sum(grid: list[list[int]]) -> int:
    n = len(grid)
    m = len(grid[0])
    dp = [[0] * m for _ in range(n)]
    for i in range(n):
        for j in range(m):
            if i == 0 and j == 0:
                dp[i][j] = grid[i][j]
            else:
                up   = dp[i-1][j] if i > 0 else float('inf')
                left = dp[i][j-1] if j > 0 else float('inf')
                dp[i][j] = grid[i][j] + min(up, left)
    return dp[n-1][m-1]`;
}

function getMaxPathSumCode() {
  return `def max_path_sum(grid: list[list[int]]) -> int:
    n = len(grid)
    m = len(grid[0])
    dp = [[0] * m for _ in range(n)]
    for i in range(n):
        for j in range(m):
            if i == 0 and j == 0:
                dp[i][j] = grid[i][j]
            else:
                from_top  = dp[i-1][j] if i > 0 else float('-inf')
                from_left = dp[i][j-1] if j > 0 else float('-inf')
                dp[i][j] = grid[i][j] + max(from_top, from_left)
    return dp[n-1][m-1]`;
}

function getClimbingStairsCode() {
  return `def climb_stairs(n: int) -> int:
    if n <= 2:
        return n
    dp = [0] * (n + 1)
    dp[1], dp[2] = 1, 2
    for i in range(3, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]`;
}

function getHouseRobberCode() {
  return `def rob(nums: list[int]) -> int:
    n = len(nums)
    dp = [0] * n
    dp[0] = nums[0]
    if n > 1:
        dp[1] = max(nums[0], nums[1])
    for i in range(2, n):
        dp[i] = max(dp[i-1], dp[i-2] + nums[i])
    return dp[n-1]`;
}

function getLCSCode() {
  return `def lcs(s1: str, s2: str) -> int:
    m, n = len(s1), len(s2)
    dp = [[0]*(n+1) for _ in range(m+1)]
    for i in range(1, m+1):
        for j in range(1, n+1):
            if s1[i-1] == s2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    return dp[m][n]`;
}

function getCoinChangeCode() {
  return `def coin_change(coins: list[int], amount: int) -> int:
    n = len(coins)
    dp = [[amount + 1] * n for _ in range(amount + 1)]
    dp[0] = [0] * n
    for x in range(1, amount + 1):
        for j in range(n):
            without  = dp[x][j-1] if j > 0 else amount + 1
            with_c   = dp[x-coins[j]][j]+1 if x >= coins[j] else amount+1
            dp[x][j] = min(without, with_c)

    result = dp[amount][n-1]
    return -1 if result > amount else result`;
}

function getKnapsackCode() {
  return `def knapsack(weights, values, capacity):
    n = len(weights)
    dp = [[0]*(capacity+1) for _ in range(n+1)]
    for i in range(1, n+1):
        for w in range(capacity+1):
            dp[i][w] = dp[i-1][w]
            if weights[i-1] <= w:
                take = dp[i-1][w-weights[i-1]] + values[i-1]
                dp[i][w] = max(dp[i][w], take)
    return dp[n][capacity]`;
}

function getPartitionCode() {
  return `def can_partition(nums: list[int]) -> bool:
    total = sum(nums)
    if total % 2 != 0: return False
    target = total // 2
    n = len(nums)
    dp = [[False]*(target+1) for _ in range(n+1)]
    for i in range(n+1): dp[i][0] = True
    for i in range(1, n+1):
        for j in range(1, target+1):
            dp[i][j] = dp[i-1][j]
            if nums[i-1] <= j:
                dp[i][j] = dp[i][j] or dp[i-1][j-nums[i-1]]
    return dp[n][target]`;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatGrid(grid) {
  return `<table class="input-grid-table">` +
    grid.map(row =>
      `<tr>` + row.map(val => `<td>${val}</td>`).join("") + `</tr>`
    ).join("") +
    `</table>`;
}

function showProblemPanel(key) {
  const p = PROBLEMS[key];
  if (!p) return;

  document.getElementById("problemTitle").textContent = p.title;
  document.getElementById("problemDesc").textContent  = p.description;
  document.getElementById("codeHeaderTitle").textContent = p.title;

  document.getElementById("problemExample").innerHTML =
    `<span class="example-label">Example</span>` +
    `<span class="example-io"><span class="example-key">Input:</span> ${p.example.input}</span>` +
    `<span class="example-io"><span class="example-key">Output:</span> ${p.example.output}</span>`;

  const diffClass = p.difficulty.toLowerCase();
  let badges =
    `<span class="badge pattern">${p.pattern}</span>` +
    `<span class="badge difficulty ${diffClass}">${p.difficulty}</span>`;
  if (p.leetcode) {
    badges +=
      `<a class="badge lc-link" href="${p.leetcode.url}" target="_blank" rel="noopener">` +
      `LC #${p.leetcode.num} ↗</a>`;
  }
  document.getElementById("problemBadges").innerHTML = badges;
  document.getElementById("problemPanel").style.display = "flex";
}

function renderDynamicInputs(key) {
  const container = document.getElementById("dynamicInputs");
  const fields = INPUT_CONFIG[key] ?? [];

  if (fields.length === 0) {
    container.innerHTML = `<p class="preset-note">Using preset inputs for this problem</p>`;
    return;
  }

  container.innerHTML = fields.map(f =>
    `<div class="input-field">
      <label for="${f.id}">${f.label}</label>
      <input type="number" id="${f.id}" value="${f.default}" min="${f.min}" max="${f.max}">
    </div>`
  ).join("");
}

function getConfigValues() {
  const rowsEl = document.getElementById("rows");
  const colsEl = document.getElementById("cols");
  return {
    m: rowsEl ? Math.max(1, parseInt(rowsEl.value, 10) || 1) : 1,
    n: colsEl ? Math.max(1, parseInt(colsEl.value, 10) || 1) : 5,
  };
}

function getDelay() {
  const val        = parseInt(document.getElementById("speedSlider").value, 10);
  const multiplier = val * 0.5;
  return Math.round(800 / multiplier);
}

function speedLabel(val) {
  const m = val * 0.5;
  return `${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)}×`;
}

// ─── Theme toggle ─────────────────────────────────────────────────────────────

function initTheme() {
  const saved = localStorage.getItem("dpv-theme") || "dark";
  document.documentElement.dataset.theme = saved;

  document.getElementById("themeToggle").addEventListener("click", () => {
    const current = document.documentElement.dataset.theme;
    const next    = current === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("dpv-theme", next);
  });
}

// ─── Keyboard shortcuts ───────────────────────────────────────────────────────

function initKeyboardShortcuts() {
  document.addEventListener("keydown", (e) => {
    // Ignore when typing in an input
    if (e.target.tagName === "INPUT" || e.target.tagName === "SELECT") return;

    switch (e.key) {
      case " ":
        e.preventDefault();
        if (isPlaying()) {
          pauseVisualizer();
        } else if (!document.getElementById("playBtn").disabled) {
          playVisualizer(getDelay());
        }
        break;
      case "ArrowRight":
        e.preventDefault();
        if (!document.getElementById("stepBtn").disabled) stepVisualizer();
        break;
      case "r":
      case "R":
        if (!document.getElementById("resetBtn").disabled) resetVisualizer();
        break;
      case "t":
      case "T":
        document.getElementById("themeToggle").click();
        break;
    }
  });
}

// ─── DOM wiring ───────────────────────────────────────────────────────────────

window.addEventListener("DOMContentLoaded", () => {
  initResizer();
  initTheme();
  initKeyboardShortcuts();

  const problemSelect = document.getElementById("problem");
  const speedSlider   = document.getElementById("speedSlider");
  const speedLabelEl  = document.getElementById("speedLabel");

  // Show problem panel + dynamic inputs on dropdown change
  problemSelect.addEventListener("change", () => {
    const key = problemSelect.value;
    if (key) {
      showProblemPanel(key);
      renderDynamicInputs(key);
      document.getElementById("startBtn").disabled = false;
    }
  });

  // Speed slider: live label + immediate effect during playback
  speedSlider.addEventListener("input", () => {
    speedLabelEl.textContent = speedLabel(parseInt(speedSlider.value, 10));
    setSpeed(getDelay());
  });

  // ── Start button ──────────────────────────────────────────────────────────
  document.getElementById("startBtn").addEventListener("click", () => {
    document.getElementById("inputGridPanel").innerHTML = "";

    const { m, n }   = getConfigValues();
    const problem     = problemSelect.value;
    const complexity  = COMPLEXITY[problem];
    const delay       = getDelay();

    if (!problem) return;

    if (problem === "uniquePaths") {
      const { result: answer, steps } = uniquePathsDP(m, n);
      const code = getUniquePathsCode();
      highlightCode(code);
      initVisualizer({
        steps, gridSize: { m, n }, code, answer,
        answerLabel: "Unique Paths", complexity,
        axisLabels: {
          colLabels: Array.from({ length: n }, (_, j) => `j=${j}`),
          rowLabels: Array.from({ length: m }, (_, i) => `i=${i}`),
        },
      });
      playVisualizer(delay);

    } else if (problem === "minimumPathSum") {
      const grid = Array.from({ length: m }, () =>
        Array.from({ length: n }, () => Math.floor(Math.random() * 9) + 1));
      const { result: answer, steps } = minimumPathSumDP(grid);
      highlightCode(getMinimumPathSumCode());
      document.getElementById("inputGridPanel").innerHTML = `<h3>Input Grid</h3>${formatGrid(grid)}`;
      initVisualizer({
        steps, gridSize: { m, n }, answer, answerLabel: "Min Path Sum", complexity,
        axisLabels: {
          colLabels: Array.from({ length: n }, (_, j) => `j=${j}`),
          rowLabels: Array.from({ length: m }, (_, i) => `i=${i}`),
        },
      });
      playVisualizer(delay);

    } else if (problem === "max_path_sum") {
      const grid = Array.from({ length: m }, () =>
        Array.from({ length: n }, () => Math.floor(Math.random() * 9) + 1));
      const { result: answer, steps } = maxPathSumDP(grid);
      highlightCode(getMaxPathSumCode());
      document.getElementById("inputGridPanel").innerHTML = `<h3>Input Grid</h3>${formatGrid(grid)}`;
      initVisualizer({
        steps, gridSize: { m, n }, answer, answerLabel: "Max Path Sum", complexity,
        axisLabels: {
          colLabels: Array.from({ length: n }, (_, j) => `j=${j}`),
          rowLabels: Array.from({ length: m }, (_, i) => `i=${i}`),
        },
      });
      playVisualizer(delay);

    } else if (problem === "climbingStairs") {
      const stairCount = Math.max(2, n);
      const { result: answer, steps } = climbingStairsDP(stairCount);
      highlightCode(getClimbingStairsCode());
      document.getElementById("inputGridPanel").innerHTML = `
        <h3>Input</h3>
        <p>n = ${stairCount} stairs</p>`;
      initVisualizer({
        steps, gridSize: { m: 1, n: stairCount }, answer, answerLabel: "Distinct Ways", complexity,
        axisLabels: {
          colLabels: Array.from({ length: stairCount }, (_, i) => `${i + 1}`),
        },
      });
      playVisualizer(delay);

    } else if (problem === "houseRobber") {
      const houseCount = Math.max(2, n);
      const nums = Array.from({ length: houseCount }, () => Math.floor(Math.random() * 9) + 1);
      const { result: answer, steps } = houseRobberDP(nums);
      highlightCode(getHouseRobberCode());
      document.getElementById("inputGridPanel").innerHTML = `<h3>Houses</h3>${formatGrid([nums])}`;
      initVisualizer({
        steps, gridSize: { m: 1, n: houseCount }, answer, answerLabel: "Max Loot", complexity,
        axisLabels: {
          colLabels: nums.map((v, i) => `H${i + 1}:${v}`),
        },
      });
      playVisualizer(delay);

    } else if (problem === "lcs") {
      const len1  = Math.max(2, Math.min(6, m));
      const len2  = Math.max(2, Math.min(8, n));
      const CHARS = "ABCDE";
      const s1 = Array.from({ length: len1 }, () => CHARS[Math.floor(Math.random() * CHARS.length)]).join("");
      const s2 = Array.from({ length: len2 }, () => CHARS[Math.floor(Math.random() * CHARS.length)]).join("");
      const { result: answer, steps } = lcsDP(s1, s2);
      highlightCode(getLCSCode());
      document.getElementById("inputGridPanel").innerHTML = `
        <h3>Strings</h3>
        <p style="font-family:'JetBrains Mono',monospace">s1 = "${s1}"</p>
        <p style="font-family:'JetBrains Mono',monospace">s2 = "${s2}"</p>`;
      initVisualizer({
        steps, gridSize: { m: len1 + 1, n: len2 + 1 }, answer, answerLabel: "LCS Length", complexity,
        axisLabels: {
          colLabels: ["", ...s2.split("")],
          rowLabels: ["", ...s1.split("")],
        },
      });
      playVisualizer(delay);

    } else if (problem === "coin_change") {
      const coins  = [1, 2, 5];
      const amount = Math.floor(Math.random() * 20) + 1;
      const { result: answer, steps } = coinChangeDP(coins, amount);
      highlightCode(getCoinChangeCode());
      document.getElementById("inputGridPanel").innerHTML = `
        <h3>Input</h3>
        <p>Coins: [${coins.join(", ")}]</p>
        <p>Amount: ${amount}</p>`;
      initVisualizer({
        steps, gridSize: { m: amount + 1, n: coins.length },
        answer: answer === -1 ? "No solution" : answer, answerLabel: "Min Coins", complexity,
        axisLabels: {
          colLabels: coins.map(c => `[${c}]`),
          rowLabels: Array.from({ length: amount + 1 }, (_, i) => `${i}`),
        },
      });
      playVisualizer(delay);

    } else if (problem === "knapsack") {
      const weights  = [1, 3, 4, 5];
      const values   = [1, 4, 5, 7];
      const capacity = 7;
      const { result: answer, steps } = knapsackDP(weights, values, capacity);
      highlightCode(getKnapsackCode());
      document.getElementById("inputGridPanel").innerHTML =
        `<h3>Items</h3>` +
        `<table class="input-grid-table"><tr><th>#</th><th>Wt</th><th>Val</th></tr>` +
        weights.map((w, i) => `<tr><td>${i + 1}</td><td>${w}</td><td>${values[i]}</td></tr>`).join("") +
        `</table><p style="margin-top:8px">Capacity: ${capacity}</p>`;
      initVisualizer({
        steps, gridSize: { m: weights.length + 1, n: capacity + 1 },
        answer, answerLabel: "Max Value", complexity,
        axisLabels: {
          colLabels: Array.from({ length: capacity + 1 }, (_, w) => `W=${w}`),
          rowLabels: ["∅", ...weights.map((_, i) => `I${i + 1}`)],
        },
      });
      playVisualizer(delay);

    } else if (problem === "partitionSubset") {
      const raw = Array.from({ length: 4 }, () => Math.floor(Math.random() * 4) + 1);
      if (raw.reduce((a, b) => a + b, 0) % 2 !== 0) raw[0]++;
      const nums   = raw;
      const target = nums.reduce((a, b) => a + b, 0) >> 1;
      const { result: answer, steps } = partitionSubsetDP(nums);
      highlightCode(getPartitionCode());
      document.getElementById("inputGridPanel").innerHTML = `
        <h3>Input</h3>
        <p>nums = [${nums.join(", ")}]</p>
        <p>Target = ${target}</p>`;
      initVisualizer({
        steps, gridSize: { m: nums.length + 1, n: target + 1 },
        answer: answer ? "True" : "False", answerLabel: "Can Partition", complexity,
        axisLabels: {
          colLabels: Array.from({ length: target + 1 }, (_, j) => `${j}`),
          rowLabels: ["∅", ...nums.map((v, i) => `${v}`)],
        },
      });
      playVisualizer(delay);
    }
  });

  document.getElementById("playBtn").addEventListener("click",  () => playVisualizer(getDelay()));
  document.getElementById("pauseBtn").addEventListener("click", () => pauseVisualizer());
  document.getElementById("stepBtn").addEventListener("click",  () => stepVisualizer());
  document.getElementById("resetBtn").addEventListener("click", () => resetVisualizer());
});
