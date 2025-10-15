# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a browser-based Memory Card game (Concentration game) implemented with vanilla JavaScript, HTML, and CSS. The game runs entirely client-side with no build process or dependencies.

## Running the Game

Simply open `index.html` in a web browser:
```bash
open index.html
```

No build, compilation, or package installation is required.

## Architecture

The game uses a single-class architecture with client-side rendering:

- **MemoryGame class** (game.js): Main game controller that manages all state and logic
  - State management: cards array, flippedCards, moves, matches, timer
  - Event handling: card clicks, new game, difficulty changes
  - Game flow: card matching logic with timing delays for user observation
  - DOM manipulation: dynamic card rendering and updates

- **Game Flow**:
  1. `initGame()` resets state and calls `createCards()` → `renderCards()`
  2. User clicks trigger `handleCardClick()` which updates flippedCards array
  3. When two cards are flipped, `checkMatch()` runs after 500ms delay for matches, 1000ms for mismatches
  4. `isProcessing` flag prevents additional clicks during match evaluation
  5. Victory detected when `matches === cards.length / 2`

- **Difficulty System**:
  - Easy: 4 pairs (8 cards), 4-column grid
  - Medium: 8 pairs (16 cards), 4-column grid
  - Hard: 12 pairs (24 cards), 6-column grid
  - Grid layout controlled by CSS classes applied dynamically to game-board

## Key Implementation Details

- **Card Data Structure**: Each card is `{ symbol, id, matched }` where id ensures uniqueness
- **Timing Critical**: The game uses nested setTimeout calls to control card flip animations and user observation periods. When modifying timing, maintain the sequence: flip → delay → animate → flip back
- **DOM References**: Card elements use data-index attribute to map back to cards array
- **CSS State Classes**: `.flipped`, `.matched`, `.wrong` trigger animations and visual states
