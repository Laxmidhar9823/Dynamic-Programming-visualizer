# 🔢 DP Visualizer: Dynamic Programming Algorithm Explorer

A modern, browser-based tool for **visualizing dynamic programming (DP) algorithms** such as Unique Paths, Minimum Path Sum, Maximum Path Sum, and Coin Change. Built with vanilla JavaScript and a modular, extensible architecture, this visualizer lets you step through DP solutions interactively—making complex algorithms intuitive, visual, and easy to learn.

---

## 📑 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [How to Use](#how-to-use)
- [Development Guide](#development-guide)
- [Contributing](#contributing)
- [License](#license)

---

## 📌 Overview

The **DP Visualizer** is an educational web application that helps you explore, debug, and master dynamic programming algorithms. It animates the process of filling DP tables, visualizes subproblem dependencies, and synchronizes each computational step with real code—bridging the gap between theory and practice.

---

## 🚀 Key Features

- **🎯 Interactive Stepper:**  
  Step forward, pause, play, or reset the visualization at any time.

- **🧠 Supported Algorithms:**  
  - Unique Paths  
  - Minimum Path Sum  
  - Maximum Path Sum  
  - Coin Change

- **🧮 Custom Grid Engine:**  
  Renders the DP table as a responsive, color-coded grid. See each cell’s state update in real time.

- **🎨 Legend-Driven Coloring:**  
  - 🟦 **Start**: Initial cell (e.g., (0,0))
  - 🟨 **Processing**: Currently computed cell
  - 🟩 **Visited**: Cell with a finalized value
  - 🟥 **End**: Final solution cell

- **💡 Live Code Highlighting:**  
  The code panel highlights the exact C++ code line being executed for each DP step, synchronized with the animation.

- **🎲 Randomized Inputs (Coin Change):**  
  For the Coin Change problem, random coins and amounts are generated and displayed in the input grid for every run.

- **🖼️ Info Panel:**  
  Shows details about the current cell, its value, and the type of operation being performed.

- **🛠️ Extensible:**  
  Easily add new DP algorithms, customize the grid, or tweak the color scheme.

- **🚧 Upcoming Enhancements:**  
  - Recursion tree visualization  
  - Ability to upload custom inputs or paste C++ code

---

## 🛠️ Tech Stack

| Layer        | Technology                  |
|--------------|----------------------------|
| Frontend     | HTML5, CSS3, JavaScript    |
| Syntax Highlight| Prism.js                |
| Version Control | Git, GitHub             |
| Debugging    | Chrome DevTools            |

---

## 🧩 Quick Start

1. **Clone the Repository**
  git clone https://github.com/Lax9876/dp-visualizer.git
  cd dp-visualizer

2. **Open in Browser**  
No build step required!  
- On Windows:  
  ```
  start index.html
  ```
- On macOS:  
  ```
  open index.html
  ```

---

## 🖥️ How to Use

1. **Choose an Algorithm:**  
Select from Unique Paths, Minimum Path Sum, Maximum Path Sum, or Coin Change.

2. **View the Input Grid:**  
- For Coin Change, random coins and amount are shown in the input grid.
- For grid-based problems, a random grid is generated.

3. **Control the Visualization:**  
- ▶️ **Play:** Run the animation step-by-step.
- ⏸ **Pause:** Temporarily stop the animation.
- ⏭ **Step:** Advance one step at a time.
- 🔄 **Reset:** Clear the table and restart.

4. **Observe the Visualization:**  
- **Grid cells** change color to reflect their state (start, processing, visited, end).
- **Code panel** highlights the line currently being executed.
- **Info panel** displays the current cell, its value, and operation type.

---

## 🧪 Development Guide

- **Add New Algorithms:**  
Place new solutions in `/js/problems/` and register them in your main controller.

- **Customize Colors and Legend:**  
Edit `style.css` to tweak grid and legend colors.

- **Enhance the UI:**  
Expand controls or add new input fields in `index.html`.

- **Debug and Test:**  
Use Chrome DevTools for step-by-step debugging and layout inspection.

---

## 🤝 Contributing

- Fork the repository and create a new branch for your feature or fix.
- Add your changes and submit a pull request 🚀
- For suggestions or bug reports, please open an issue on GitHub.

---

## 📄 License

Licensed under the MIT License—free to use, modify, and distribute.

---

**Explore. Visualize. Understand.**  
Make dynamic programming algorithms come alive with the DP Visualizer!
