# DP Visualizer

[![Tests](https://github.com/Laxmidhar9823/Dynamic-Programming-visualizer/actions/workflows/test.yml/badge.svg)](https://github.com/Laxmidhar9823/Dynamic-Programming-visualizer/actions/workflows/test.yml)
[![Deploy](https://github.com/Laxmidhar9823/Dynamic-Programming-visualizer/actions/workflows/deploy.yml/badge.svg)](https://github.com/Laxmidhar9823/Dynamic-Programming-visualizer/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**Step-by-step Dynamic Programming animations, built with vanilla JavaScript.**

Watch the DP table fill in real time, follow along with synchronized Python 3 code highlighting, and explore nine classic problems — all in a zero-dependency, zero-build-step web app.

### [▶ Live Demo](https://laxmidhar9823.github.io/Dynamic-Programming-visualizer/)

---

![DP Visualizer — Minimum Path Sum animating in dark mode](assets/dark-mode.png)

<table>
  <tr>
    <td width="50%"><img src="assets/light-mode.png" alt="House Robber in light mode with result panel" /></td>
    <td width="50%" valign="middle">
      <strong>Same engine, two themes, nine problems.</strong><br/><br/>
      Every run uses freshly randomized input, every step highlights the matching line of Python, and your theme choice is remembered the next time you visit.
    </td>
  </tr>
</table>

---

## Features

- **9 DP problems** spanning four categories — Grid, Linear, String, and Knapsack
- **Step-by-step playback** with Play, Pause, Step, and Reset controls
- **Adjustable speed** via a live slider (0.5× – 2×), takes effect mid-playback
- **Synchronized Python 3 code panel** — the exact line being executed is highlighted as each cell fills
- **Time and space complexity badges** displayed per problem
- **Randomized inputs on every run** — grids, house values, strings, and amounts are freshly generated; the Example panel updates to match
- **↺ New Example button** after completion — reruns with a different random input
- **Light and Dark themes** with automatic persistence via `localStorage`
- **Resizable split pane** — drag the divider to give more space to the grid or the code panel
- **Axis labels** on the DP table (row/column indices, character labels for LCS, weight labels for Knapsack)
- **Keyboard shortcuts**: `Space` play/pause, `→` step, `R` reset, `T` toggle theme
- **Animated cell entry** with staggered transitions when a new grid loads
- **No build step, no dependencies, no installation** — open `index.html` and it runs

---

## Problems Covered

| Problem | Category | Difficulty | LeetCode |
|---|---|---|---|
| Unique Paths | Grid DP | Medium | [#62](https://leetcode.com/problems/unique-paths/) |
| Minimum Path Sum | Grid DP | Medium | [#64](https://leetcode.com/problems/minimum-path-sum/) |
| Maximum Path Sum | Grid DP | Medium | — |
| Climbing Stairs | Linear DP | Easy | [#70](https://leetcode.com/problems/climbing-stairs/) |
| House Robber | Linear DP | Medium | [#198](https://leetcode.com/problems/house-robber/) |
| Longest Common Subsequence | String DP | Medium | [#1143](https://leetcode.com/problems/longest-common-subsequence/) |
| Coin Change | Unbounded Knapsack | Medium | [#322](https://leetcode.com/problems/coin-change/) |
| 0/1 Knapsack | 0/1 Knapsack | Medium | — |
| Partition Equal Subset Sum | 0/1 Knapsack | Medium | [#416](https://leetcode.com/problems/partition-equal-subset-sum/) |

---

## Tech Stack

| | |
|---|---|
| Language | HTML5, CSS3, JavaScript (ES6 modules) |
| Syntax highlighting | [Prism.js](https://prismjs.com/) via CDN |
| Fonts | Inter (UI), JetBrains Mono (code) via Google Fonts |
| Build tooling | None |

---

## Quick Start

```bash
git clone https://github.com/Laxmidhar9823/Dynamic-Programming-visualizer.git
cd Dynamic-Programming-visualizer
```

Open `index.html` directly in any modern browser — or use VS Code's Live Server extension for auto-reload during development. No `npm install`, no compilation, no config.

---

## Testing

Each of the 9 DP solvers in `js/problems/` is a pure function (`input → { result, steps }`), tested with Node's built-in test runner — no Jest, no Vitest, no dependencies to install.

```bash
npm test
```

For every problem, the suite checks:
- The final answer against a known correct value (LeetCode examples plus hand-picked edge cases)
- That the generated step trace is well-formed — every step has a valid type (`processing` / `start` / `visited` / `end`) and a numeric code line, the contract `js/visualizer.js` relies on to drive playback

Tests run automatically on every push and pull request via [GitHub Actions](.github/workflows/test.yml).

---

## Architecture

The app is organized into three layers. Problem solvers are completely isolated from the visualizer — adding a new algorithm never touches playback logic.

![Architecture diagram](assets/architecture.png)

**Data flow for a single run:**

1. User selects a problem and presses **Start**
2. `main.js` reads the input fields, generates random data where applicable, and calls the problem solver
3. The solver runs the full DP algorithm and returns `{ result, steps }` — `steps` is a pre-computed array of `{ i, j, val, type, line }` records, one per cell write
4. `main.js` calls `initVisualizer({ steps, gridSize, code, answer, axisLabels, complexity })`
5. `visualizer.js` builds the grid DOM, renders axis labels, and starts a `setInterval` loop
6. Each tick: one step is consumed → the matching cell gets a CSS class (`start`, `visited`, `processing`, `end`) → the corresponding Python code line is highlighted

**Adding a new problem takes four steps:**

1. Create `js/problems/yourProblem.js` — export a function returning `{ result, steps }`
2. Add an `<option>` to the `<select>` in `index.html`
3. Add a `case` in `main.js` to call your solver and pass the result to `initVisualizer`
4. Add an entry to `INPUT_CONFIG` (if the problem has configurable dimensions) and `COMPLEXITY`

---

## Design Decisions

A few choices in this codebase weren't arbitrary — they're the answers I'd actually give if asked about them.

**Pre-computed step traces instead of live algorithm execution.** Each solver runs its DP algorithm to completion up front and returns the entire animation as plain data — an array of `{ i, j, val, type, line }` records — instead of the visualizer stepping through the algorithm's execution live (e.g. via a generator `function*` yielding at each cell write). This costs a small amount of memory (at most a few thousand records for the largest grids) in exchange for total decoupling: `visualizer.js` never touches algorithm logic, can change speed or pause without re-running anything, and the exact same `setInterval` loop drives all 9 different algorithms identically. A generator-based approach would avoid materializing the array but couples the visualizer's timing model to a consume-once generator and makes a future "jump to step N" scrubber much harder, since a generator can't be rewound.

**No framework — three flat ES6 modules instead of component state.** `main.js` (orchestration), `visualizer.js` (playback), and `js/problems/*.js` (solvers) talk to each other through plain function calls and one custom event — no React, no virtual DOM. DOM updates are imperative (`classList.add`, `innerText`), which trades declarative convenience for direct control: a DP animation can write to 50+ cells a second, and patching only the cells that change is cheaper here than diffing a virtual DOM tree every frame. It also keeps the project at zero build steps, which matters more for a project meant to be opened and read than shipped at scale.

**`CustomEvent` instead of a direct import for cross-module signaling.** The "↺ New Example" button is rendered inside `visualizer.js`'s result panel, but the logic for randomizing inputs belongs to `main.js` (it owns `INPUT_CONFIG`). Importing one module into the other would create a circular dependency between the two highest-level modules in the app. Instead, the click handler does `document.dispatchEvent(new CustomEvent("dp:newExample"))`, and `main.js` listens for it. One extra layer of indirection buys a playback engine that stays completely ignorant of problem-specific configuration.

**The step-record schema is an enforced runtime contract, not a type.** `{ i, j, val, type, line }` is the interface every solver and the renderer agree on, but it's plain JS objects — no TypeScript, no JSON schema, no build step to run a type checker in. Instead the contract is enforced at the boundary: `tests/helpers.js`'s `assertValidSteps()` runtime-checks every step emitted by every solver in CI. Writing that check against the real solvers surfaced an actual inconsistency — `partitionSubset.js`'s success path ends on a step typed `"visited"` instead of `"end"` like every other solver. It's left as-is and documented here rather than silently patched, because the visualizer doesn't depend on the last step's type and "fix it cleanly later" is a more honest state than "pretend it was never there."

**The code panel ignores the active theme on purpose.** `--bg-code` resolves to the same dark value in both `:root` and `[data-theme="light"]` (`CSS/style.css`) — the Python panel stays dark even when the rest of the UI switches to light mode. Prism's `prism-tomorrow` theme, and the line-highlight colors built around it, are tuned for a dark background; re-theming syntax highlighting for light mode would mean shipping and maintaining a second Prism theme and a second highlight-color set for a panel most people read in short bursts. Keeping code panels dark regardless of UI theme is the same call VS Code and GitHub make for embedded code blocks.

**Theme persists indefinitely; panel width persists only for the session.** The dark/light choice is saved to `localStorage` and follows you across visits. The split-pane width, dragged via a hand-rolled `mousedown`/`mousemove`/`mouseup` listener in `js/resizer.js` (no drag library), is saved to `sessionStorage` and resets when the tab closes. Theme is a standing reading preference; pane width is tied to the current window size, and restoring a width chosen on a wide monitor onto a laptop the next day would silently produce a broken-looking layout. Scoping it to the session avoids that failure mode without writing viewport-aware persistence logic.

---

## License

MIT — free to use, modify, and distribute.
