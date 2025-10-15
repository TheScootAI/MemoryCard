# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A vanilla JavaScript implementation of the classic Memory Card (Concentration) matching game. No build process, no dependencies - just HTML, CSS, and JavaScript that runs directly in the browser.

**To run**: Open `index.html` in any modern web browser.

## Architecture

### Single Class Design
The entire game logic lives in the `MemoryGame` class in `game.js`. This class manages:
- Game state (cards, flipped cards, matches, moves, timer)
- DOM manipulation (rendering cards, updating stats)
- Event handling (card clicks, button clicks)
- Game flow (matching logic, win conditions)

Key state properties:
- `this.isProcessing`: Boolean flag that prevents clicks during the 1-second mismatch delay
- `this.flippedCards`: Array holding currently flipped cards (max 2)
- `this.cards`: Array of card objects with `{id, symbol, isFlipped, isMatched}` structure

### Game Flow
1. Cards are created in pairs, shuffled using Fisher-Yates algorithm
2. Timer starts on first card click (not on game load)
3. Two cards can be flipped per turn:
   - If they match: stay face up, marked as matched, pairs counter increments
   - If they don't match: wait 1 second (for player observation), then flip back
4. Win condition triggers when `matchedPairs === numberOfPairs`

### Critical Implementation Details

**Mismatch delay mechanism** (`game.js:269-277`):
- Uses `setTimeout` with 1000ms delay
- `isProcessing` flag set to `true` blocks additional clicks during this period
- Guards prevent clicking already flipped or matched cards

**Card flip prevention** (`game.js:176-184`):
- Cannot click during processing
- Cannot re-click already flipped cards
- Cannot click already matched cards

**Fisher-Yates shuffle** (`game.js:116-123`):
- Ensures true random distribution of cards
- Creates copy of array to avoid mutation
- Critical for fair gameplay

## File Organization

- `index.html`: Static structure with placeholder divs for dynamic content
- `game.js`: All game logic in single `MemoryGame` class
- `styles.css`: CSS Grid layouts, 3D card flip animations, responsive breakpoints
- `TEST_PLAN.md`: Comprehensive test scenarios for Playwright automation

## Difficulty Levels

Three levels that change card count and grid layout:
- Easy: 6 pairs (12 cards) - 3-column grid
- Medium: 8 pairs (16 cards) - 4-column grid
- Hard: 12 pairs (24 cards) - 4-column grid (6 rows)

Grid layout controlled by CSS classes `.easy`, `.medium`, `.hard` on `.game-board`.

## Testing

See `TEST_PLAN.md` for comprehensive test scenarios organized into 10 categories covering:
- Core gameplay mechanics (card flipping, matching logic)
- Statistics tracking (moves, matches, timer)
- Edge cases (rapid clicking, same card double-click)
- UI/UX (animations, modals, difficulty changes)

**For Playwright MCP testing**:
1. Use `browser_snapshot` to get element references
2. Use `browser_wait_for` with `time: 1` parameter for the mismatch delay
3. Check for `.flipped` and `.matched` classes on card elements
4. Verify stats in `#moves`, `#matches`, `#timer` text content

## CSS Animations

Card flip uses 3D CSS transforms, not JavaScript:
```css
.card { transform-style: preserve-3d; }
.card.flipped { transform: rotateY(180deg); }
```

Flip is triggered by adding/removing the `.flipped` class. The 0.6s transition is handled entirely by CSS.

## Common Modifications

**Changing mismatch delay**: Edit `setTimeout` duration in `handleMismatch()` at `game.js:271`

**Adding new symbols**: Extend the `this.symbols` array at `game.js:19-22` (emojis work universally)

**Modifying difficulty**: Change `data-pairs` attributes in the difficulty modal buttons in `index.html:42-44`

**Timer behavior**: Timer intentionally starts on first card click (line 187), not on game load - this is by design for fair timing

## Known Behaviors (Not Bugs)

- Matched cards remain slightly faded (opacity 0.6) - intentional visual feedback
- Timer doesn't start until first card is clicked - prevents timing players before they're ready
- Page refresh resets game completely - no localStorage persistence by design
- Cards can't be flipped during the 1-second mismatch observation window - prevents cheating/racing

## Interview Context

This codebase was created as an interview project demonstrating vanilla JavaScript skills. The README.md contains extensive implementation details, design decisions, and potential extensions useful for technical discussions.
