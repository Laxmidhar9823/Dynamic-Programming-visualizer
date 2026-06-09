let interval        = null;
let currentStep     = 0;
let steps           = [];
let gridSize        = { m: 0, n: 0 };
let completionAnswer = null;
let completionLabel  = "";

// ─── Initialization ───────────────────────────────────────────────────────────

export function initVisualizer({
  steps: s,
  gridSize: size,
  code,
  answer        = null,
  answerLabel   = "",
  complexity    = null,
  axisLabels    = null,
}) {
  steps            = s;
  gridSize         = size;
  currentStep      = 0;
  completionAnswer = answer;
  completionLabel  = answerLabel;

  clearInterval(interval);
  interval = null;

  createGrid(size.m, size.n);

  if (axisLabels) renderAxisLabels(axisLabels);
  else clearAxisLabels();

  if (code) highlightCode(code);
  if (complexity) showComplexity(complexity);

  updateStepCounter(0, steps.length);

  // Show grid, hide placeholder
  document.getElementById("emptyGridPlaceholder").style.display = "none";
  document.getElementById("gridContent").style.display          = "flex";
  document.getElementById("stepProgress").style.display         = "flex";

  // Hide result panel
  const infoPanel = document.getElementById("infoPanel");
  infoPanel.className  = "info-panel";
  infoPanel.innerHTML  = "";
  infoPanel.style.display = "none";

  setButtonStates("ready");
}

// ─── Playback ─────────────────────────────────────────────────────────────────

export function isPlaying() {
  return interval !== null;
}

export function playVisualizer(delay = 800) {
  if (interval) return;
  setButtonStates("playing");
  interval = setInterval(() => {
    if (currentStep >= steps.length) {
      pauseVisualizer();
      showResult();
      return;
    }
    fillGridStep(steps[currentStep++]);
    updateStepCounter(currentStep, steps.length);
  }, delay);
}

export function pauseVisualizer() {
  const wasPlaying = interval !== null;
  clearInterval(interval);
  interval = null;
  if (wasPlaying) setButtonStates("paused");
}

export function stepVisualizer() {
  if (currentStep < steps.length) {
    fillGridStep(steps[currentStep++]);
    updateStepCounter(currentStep, steps.length);
    if (currentStep >= steps.length) showResult();
  }
}

export function resetVisualizer() {
  clearInterval(interval);
  interval = null;
  currentStep = 0;
  createGrid(gridSize.m, gridSize.n);
  updateStepCounter(0, steps.length);
  setButtonStates("ready");

  const infoPanel = document.getElementById("infoPanel");
  infoPanel.className     = "info-panel";
  infoPanel.innerHTML     = "";
  infoPanel.style.display = "none";
}

export function setSpeed(delay) {
  if (interval) {
    clearInterval(interval);
    interval = null;
    playVisualizer(delay);
  }
}

// ─── Grid creation ────────────────────────────────────────────────────────────

function createGrid(m, n) {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";
  grid.style.gridTemplateRows    = `repeat(${m}, 52px)`;
  grid.style.gridTemplateColumns = `repeat(${n}, 52px)`;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const cell = document.createElement("div");
      cell.className = "cell entering";
      cell.id        = `cell-${i}-${j}`;

      // Stagger the entry animation
      const delay = (i * n + j) * 8;
      cell.style.animationDelay = `${delay}ms`;

      // Remove entering class after animation so it doesn't interfere with state
      cell.addEventListener("animationend", () => {
        cell.classList.remove("entering");
        cell.style.animationDelay = "";
      }, { once: true });

      grid.appendChild(cell);
    }
  }
}

// ─── Axis labels ──────────────────────────────────────────────────────────────

function renderAxisLabels({ rowLabels = null, colLabels = null }) {
  const colHeader = document.getElementById("axisColHeader");
  const rowHeader = document.getElementById("axisRowHeader");
  const corner    = document.querySelector(".axis-corner");

  clearAxisLabels();

  if (colLabels && colHeader) {
    colHeader.innerHTML = colLabels.map(l =>
      `<div class="axis-col-label">${l}</div>`
    ).join("");
  }

  if (rowLabels && rowHeader) {
    rowHeader.innerHTML = rowLabels.map(l =>
      `<div class="axis-row-label">${l}</div>`
    ).join("");
    // Show corner spacer only when both axes are present
    if (colLabels && corner) corner.style.display = "block";
  }
}

function clearAxisLabels() {
  const colHeader = document.getElementById("axisColHeader");
  const rowHeader = document.getElementById("axisRowHeader");
  const corner    = document.querySelector(".axis-corner");
  if (colHeader) colHeader.innerHTML = "";
  if (rowHeader) rowHeader.innerHTML = "";
  if (corner)    corner.style.display = "none";
}

// ─── Step rendering ───────────────────────────────────────────────────────────

function fillGridStep(step) {
  const { i, j, val, type, line } = step;

  if (typeof line === "number") highlightCodeLine(line);

  const visualTypes = ["start", "visited", "processing", "end"];
  if (!visualTypes.includes(type)) return;

  const cell = document.getElementById(`cell-${i}-${j}`);
  if (!cell) return;

  cell.classList.remove(...visualTypes);
  cell.classList.add(type);
  cell.innerText = type === "processing" ? "…" : (val ?? "");
}

// ─── Result display ───────────────────────────────────────────────────────────

function showResult() {
  if (completionAnswer === null) return;
  setButtonStates("complete");

  const panel = document.getElementById("infoPanel");
  panel.className     = "info-panel is-complete";
  panel.style.display = "block";
  panel.innerHTML = `
    <h3>Complete</h3>
    <div class="result-value">${completionAnswer}</div>
    <div class="result-label">${completionLabel}</div>
    <button class="replay-btn" id="replayBtn">↺ New Example</button>
  `;

  document.getElementById("replayBtn").addEventListener("click", () => {
    document.dispatchEvent(new CustomEvent("dp:newExample"));
  });
}

// ─── UI helpers ───────────────────────────────────────────────────────────────

function updateStepCounter(current, total) {
  const fill  = document.getElementById("stepBarFill");
  const label = document.getElementById("stepLabel");
  if (!fill || !label) return;
  const pct = total > 0 ? (current / total) * 100 : 0;
  fill.style.width    = `${pct}%`;
  label.textContent   = `Step ${current} of ${total}`;
}

function showComplexity(complexity) {
  const bar     = document.getElementById("complexityBar");
  const timeEl  = document.getElementById("complexityTime");
  const spaceEl = document.getElementById("complexitySpace");
  if (!bar) return;
  timeEl.textContent  = `⏱ ${complexity.time}`;
  spaceEl.textContent = `💾 ${complexity.space}`;
  bar.style.display   = "flex";
}

// state: 'idle' | 'ready' | 'playing' | 'paused' | 'complete'
function setButtonStates(state) {
  const map = {
    //              play   pause  step   reset
    idle:     { play: true,  pause: true,  step: true,  reset: true  },
    ready:    { play: false, pause: true,  step: false, reset: false },
    playing:  { play: true,  pause: false, step: true,  reset: false },
    paused:   { play: false, pause: true,  step: false, reset: false },
    complete: { play: true,  pause: true,  step: true,  reset: false },
  };
  const s = map[state] ?? map.idle;
  const ids = ["playBtn", "pauseBtn", "stepBtn", "resetBtn"];
  const disabled = [s.play, s.pause, s.step, s.reset];
  ids.forEach((id, i) => {
    const btn = document.getElementById(id);
    if (btn) btn.disabled = disabled[i];
  });
}

// ─── Code highlighting ────────────────────────────────────────────────────────

export function highlightCode(code, lang = "python") {
  const codeDisplay = document.getElementById("codeDisplay");
  const lines = code.split("\n").map((line, idx) =>
    `<div class="code-line" data-line="${idx + 1}">${Prism.highlight(line, Prism.languages[lang], lang)}</div>`
  );
  codeDisplay.innerHTML = lines.join("");
  codeDisplay.className = `language-${lang}`;
}

export function highlightCodeLine(lineNum) {
  const allLines = document.querySelectorAll(".code-line");
  allLines.forEach(l => l.classList.remove("highlight"));

  const target = document.querySelector(`.code-line[data-line="${lineNum}"]`);
  if (!target) return;
  target.classList.add("highlight");

  // Only scroll if the line is not already visible in the code-view
  const codeView = document.querySelector(".code-view");
  if (!codeView) return;

  const viewTop    = codeView.scrollTop;
  const viewBottom = viewTop + codeView.clientHeight;
  const lineTop    = target.offsetTop;
  const lineBottom = lineTop + target.offsetHeight;

  if (lineTop < viewTop || lineBottom > viewBottom) {
    target.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }
}
