# Kanban Task Board

A simple, dark-themed Kanban board built with plain HTML, CSS, and JavaScript. No frameworks or libraries needed.

## Features

- Three columns: **To Do**, **In Progress**, and **Done**
- Add new tasks with a title and description through a modal
- Drag and drop tasks between columns
- Delete tasks with one click
- Live task count in each column heading
- Responsive, dark UI styled with CSS variables

## Tech Stack

- HTML5
- CSS3 (Flexbox, CSS custom properties)
- Vanilla JavaScript (DOM manipulation, HTML Drag and Drop API)

## Project Structure

    ├── index.html   # Page structure and modal
    ├── style.css    # Layout, theme, and modal styling
    └── script.js    # Drag and drop, modal, add/delete, task counts

## Getting Started

1. Clone or download this repository.
2. Open `index.html` in your browser.

No build step or installation is required.

## How to Use

1. Click **Add New Task** in the top right.
2. Enter a title and description, then click **Add task**.
3. Drag a task card into another column to change its status.
4. Click **Delete** on a card to remove it.

## Future Improvements

- Save tasks with `localStorage` so they persist after refresh
- Edit existing tasks
- Light/dark theme toggle
- Mobile touch support for drag and drop

## License

This project is open source and available under the [MIT License](LICENSE).
