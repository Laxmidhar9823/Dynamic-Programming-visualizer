export function initResizer() {
  const divider   = document.getElementById("divider");
  const left      = document.querySelector(".left-panel");
  const right     = document.querySelector(".right-panel");
  const container = document.querySelector(".container");

  const MIN_PX = 300;

  function applyWidths(leftPx) {
    left.style.flex  = "none";
    left.style.width = `${leftPx}px`;
    right.style.flex = "1";
    right.style.width = "";
  }

  // Restore saved width from this session
  const saved = sessionStorage.getItem("leftPanelWidth");
  if (saved) {
    const px = parseFloat(saved);
    const max = container.offsetWidth - MIN_PX - divider.offsetWidth;
    if (px >= MIN_PX && px <= max) applyWidths(px);
  }

  divider.addEventListener("mousedown", startDrag);

  function startDrag(e) {
    e.preventDefault();
    document.body.style.userSelect = "none";
    document.body.style.cursor     = "col-resize";
    divider.classList.add("dragging");

    document.addEventListener("mousemove", onDrag);
    document.addEventListener("mouseup",   stopDrag);
  }

  function onDrag(e) {
    const rect    = container.getBoundingClientRect();
    const divW    = divider.offsetWidth;
    const maxLeft = rect.width - MIN_PX - divW;
    const leftPx  = Math.max(MIN_PX, Math.min(maxLeft, e.clientX - rect.left));
    applyWidths(leftPx);
  }

  function stopDrag() {
    document.body.style.userSelect = "";
    document.body.style.cursor     = "";
    divider.classList.remove("dragging");
    sessionStorage.setItem("leftPanelWidth", left.offsetWidth);
    document.removeEventListener("mousemove", onDrag);
    document.removeEventListener("mouseup",   stopDrag);
  }
}
