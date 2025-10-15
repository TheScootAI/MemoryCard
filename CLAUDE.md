# CLAUDE.md

Guidance for Claude Code when working with this Memory Card game repository.

## Quick Start

Open `index.html` in a browser. No build process or dependencies required.

## Architecture

Single `MemoryGame` class (game.js) managing:
- Game state: cards, flipped cards, moves, matches, timer
- Game flow: card flipping, matching logic, victory detection
- DOM: card rendering and updates
- Audio: sound effects via Web Audio API

**Key Implementation:**
- Card structure: `{ symbol, id, matched }`
- Timing: `checkMatch()` uses 500ms delay for matches, 1000ms for mismatches
- Processing flag: `isProcessing` prevents clicks during evaluation
- Victory: when `matches === cards.length / 2`
- Layout: CSS classes (`.easy`, `.medium`, `.hard`) control grid dimensions

## Difficulty Levels

| Mode | Cards | Pairs | Grid |
|------|-------|-------|------|
| Easy | 8 | 4 | 4x2 |
| Medium | 16 | 8 | 4x4 |
| Hard | 24 | 12 | 6x4 |

## Slash Commands

**`/test`** - Run automated tests (9 test cases, all passing ✅)
- Tests: initial state, card mechanics, statistics, difficulty levels, victory, reset
- Output: screenshots in `.playwright-mcp/` directory

**`/commit`** - Guidelines for consistent commit messages
- Enforces commit message format and patterns
- Includes examples (feat, fix, docs, refactor, etc.)
- Ensures professional code history
