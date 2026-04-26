# Connect-4 (Engineering Refactor) 🔴🟡

[![CI/CD Pipeline](https://github.com/brianm2002513/connect-4/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/brianm2002513/connect-4/actions/workflows/ci-cd.yml)

A fully playable Connect-4 game built with **React**, featuring robust game logic, a simulated physics engine (gravity), and a Minimax-inspired heuristic AI.

## 🔄 CI/CD Pipeline
Every push to this repository triggers a multi-stage validation engine:
*   **Linting**: Enforces JavaScript best practices using ESLint.
*   **Security Scan**: Uses **GitHub CodeQL** to perform static analysis for security vulnerabilities.
*   **Unit Testing**: Executes a comprehensive Jest suite to verify game win-states and AI logic.
*   **Production Build**: Generates an optimized React bundle.
*   **Automated Release**: Packages the build into a ZIP artifact and creates a GitHub Release on every merge to `main`.


## 🧠 Engineering Highlights
This project was refactored to demonstrate professional software engineering practices, specifically focusing on **Game Logic** and **Unit Testing**.

1.  **True Connect-4 Logic (7x6 Board)**: Unlike basic Tic-Tac-Toe variants, this project uses a full 42-cell board matrix. 
2.  **Gravity Engine**: Includes a custom algorithm that calculates the lowest available row in a selected column, simulating the real-world physics of dropping a piece into a slot.
3.  **Heuristic AI**: Features an AI opponent that evaluates the board state to either take an immediate win or block a player's winning move.
4.  **Test-Driven Validation**: The core logic (`helper.js`) is completely decoupled from the React UI and validated using a **Jest Unit Test Suite**.

## 🛠 Tech Stack
*   **Frontend**: React.js
*   **Logic**: Vanilla JavaScript
*   **Testing**: Jest
*   **Styling**: Pure CSS Grid

## 🚀 How to Run

### Installation
First, install the necessary dependencies:
```bash
npm install
```

### Run the Application
Start the React development server:
```bash
npm start
```

### Run the Engineering Test Suite
To verify the game logic (win conditions, gravity, and AI blocking):
```bash
npm test
```

## 🧪 Test Coverage Examples
The Jest test suite (`helper.test.js`) automatically proves the following scenarios:
*   Horizontal, Vertical, and Diagonal (Both directions) win detection.
*   Gravity mechanics (pieces correctly fall to the bottom-most empty slot).
*   AI Defensive Logic (The computer successfully identifies and blocks a player's 3-in-a-row).

---
*Created by Brian Munashe Mbawa as part of a technical portfolio demonstration.*
