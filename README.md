# Bubble Drop

A lightweight, high-performance 2D arcade game built purely with vanilla JavaScript, HTML5 Canvas, and modern CSS. The objective is to pop falling bubbles before they breach the lower boundary of the play area.

---

## Features

*   **Pure Canvas Rendering:** Utilizes the HTML5 Canvas API for smooth 2D animations and click/tap detection.
*   **Progressive Difficulty Scaling:** Bubble descent velocity and generation rates scale up automatically as your score increases.
*   **Layer-Aware Raycasting:** If bubbles overlap, click physics resolve to target the top-most visual layer first.
*   **Flat Graphic Aesthetic:** Pure solid-color styling across the codebase—completely free of gradients and image assets.
*   **Modular Architecture:** Explicit separation of concerns between game loop management, object blueprint blueprints, and interface styling.

---

## Folder Structure

```text
bubble-drop/
│
├── index.html       # Application entry point and layout markup
├── css/
│   └── style.css    # Layout and flat UI appearance styling
└── js/
    ├── game.js      # Main engine loop, event tracking, state machine
    └── bubble.js    # OOP class structure for bubble initialization and rendering
