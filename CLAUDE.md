# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the App

No build step required. Open `index.html` directly in a browser (or use a local static server like VS Code Live Server). There is no package manager and no dependencies to install for the app itself.

## Running Tests

`npm test` runs the solver test suite (`tests/*.test.js`) via Node's built-in test runner (`node:test`) — zero npm dependencies. Each of the 9 `js/problems/*.js` solvers is tested for correct output and for emitting a well-formed step trace. CI runs this on every push and pull request (`.github/workflows/test.yml`).

When adding a new problem, add a matching `tests/yourProblem.test.js` that asserts the result against at least one known-correct case and calls `assertValidSteps(steps)` from `tests/helpers.js`.

## Architecture

Vanilla JavaScript single-page application. No frameworks, no transpilation — ES6 runs natively in modern browsers.

**Data flow:**
1. `js/main.js` reads DOM controls (algorithm selector, grid dimensions, speed) and wires them to problem solvers and the visualizer.
2. A problem module in `js/problems/` executes the DP algorithm and returns `{ result, steps }` — steps is a pre-computed trace of every cell update, each containing `{ row, col, value, type, line }`.
3. `js/visualizer.js` plays back that step array: updates grid cells via `classList`, highlights the matching code line via `highlightCodeLine(line)`, and manages play/pause/step/reset state with `setInterval`.

**Cell animation types:** `start`, `visited`, `processing`, `end` — applied as CSS classes on grid `<div>` elements.

## Adding a New DP Problem

1. Create `js/problems/yourProblem.js`. Export a function that runs the algorithm and returns `{ result, steps }`. Follow the pattern in `js/problems/uniquePaths.js` or `coin_change.js`.
2. Add a `<option>` to the algorithm `<select>` in `index.html`.
3. Add a `case` in `js/main.js` to call your solver and pass result to `visualizer.init(steps, codeLines)`.
4. Define the C++ code string (shown in the right panel) alongside your solver — the `line` index in each step maps to a line in that string.

## Key Files

| File | Role |
|---|---|
| `index.html` | DOM structure; loads Prism.js via CDN for syntax highlighting |
| `js/main.js` | Event wiring: reads controls, calls solvers, kicks off visualizer |
| `js/visualizer.js` | Playback engine: grid rendering, timing, code-line sync |
| `js/problems/*.js` | One file per algorithm; each pre-computes the full step trace |
| `CSS/style.css` | Dark-themed UI; grid cell states styled via `.visited`, `.processing`, etc. |

## Project Upgrade Objectives

This project is being upgraded from an academic demonstration into a portfolio-quality internship project.

### Primary Goals

1. Modern, professional UI and UX
2. Clear educational visualization of Dynamic Programming concepts
3. Clean and maintainable architecture
4. Easy addition of new DP problems
5. Responsive design for desktop and mobile
6. Python 3 code examples instead of C++

### Decision Criteria

When proposing changes, prioritize:

* Recruiter impact
* Resume value
* Demonstration quality
* Maintainability
* Educational clarity

Avoid:

* Overengineering
* Unnecessary abstractions
* Framework migrations
* Enterprise-scale patterns inappropriate for a small educational project
* Large rewrites when incremental improvements achieve similar results

### Code Display Standards

Displayed algorithm implementations should use Python 3.

Requirements:

* Interview-quality solutions
* Readable variable names
* Time complexity analysis
* Space complexity analysis
* Consistent formatting

### Modification Workflow

Before significant code changes:

1. Explain the proposed change
2. List affected files
3. Explain expected benefits
4. Identify risks
5. Then implement

Prefer phased improvements over complete rewrites.
