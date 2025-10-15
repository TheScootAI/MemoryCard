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

## Testing with Claude Code

### Automated Testing Slash Command

A `/test` slash command is available for running comprehensive automated tests:

```bash
/test
```

This command launches Playwright and runs 9 comprehensive test cases:

1. **Initial Game State** - Verifies UI elements, default difficulty (Medium), and card layout
2. **Card Flipping & Matching** - Tests card flip mechanics and matching behavior
3. **Non-Matching Cards** - Verifies cards flip back after observation period
4. **Statistics Tracking** - Validates moves, matches, and time tracking
5. **Victory Condition** - Tests victory modal and final statistics display
6. **Easy Difficulty** - Tests 8-card (4 pairs) mode with 4x2 grid
7. **Medium Difficulty** - Tests 16-card (8 pairs) mode with 4x4 grid
8. **Hard Difficulty** - Tests 24-card (12 pairs) mode with 6x4 grid
9. **Game Reset Buttons** - Tests New Game and Play Again functionality

**Test Coverage:**
- All game mechanics (flipping, matching, non-matching)
- All three difficulty levels
- Game statistics accuracy
- Victory detection and display
- Game reset and shuffle functionality
- UI responsiveness and animations

**Output:**
- 9 test cases with pass/fail status
- Screenshot evidence for each test phase
- Detailed test summary report
- No issues found - all tests passing ✅

**Screenshots Location:** `.playwright-mcp/` directory
- `test-1-initial-state.png` - Initial game board
- `test-3-nonmatching-cards.png` - Non-matching behavior
- `test-5-victory-modal.png` - Victory screen
- `test-6a-easy-difficulty.png` - Easy mode
- `test-6b-hard-difficulty.png` - Hard mode
- `test-7-new-game-reset.png` - After reset
