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

## Testing

Run `/test` slash command for automated tests (9 test cases, all passing ✅):
- Initial state, card mechanics, statistics
- All difficulty levels
- Victory condition, game reset buttons

Screenshots saved to `.playwright-mcp/` directory.
