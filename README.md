# Memory Card Game

A browser-based implementation of the classic Concentration (Memory) card game built with vanilla JavaScript, HTML, and CSS.

## About

This is a single-player memory game where players flip cards to find matching pairs. The game tracks moves, matches, and time, with three difficulty levels to choose from.

## Game Rules

- All cards start face down
- Click to flip one card at a time
- Try to find matching pairs by flipping two cards per turn
- If the cards match, they stay face up and turn green
- If they don't match, observe them briefly before they flip back
- Match all pairs to win the game!

## Features

- **Three Difficulty Levels:**
  - Easy: 8 cards (4 pairs)
  - Medium: 16 cards (8 pairs)
  - Hard: 24 cards (12 pairs)

- **Game Statistics:**
  - Move counter
  - Match counter
  - Timer (starts on first move)

- **Interactive UI:**
  - Smooth card flip animations
  - Color-coded feedback (green for matches)
  - Shake animation for mismatches
  - Hover effects on cards
  - Victory celebration screen

- **Game Controls:**
  - New Game button (reset at any time)
  - Play Again button (after winning)
  - Difficulty selector

## How to Play

1. Open `index.html` in any modern web browser
2. Click on cards to flip them and find matching pairs
3. Try to complete the game in as few moves as possible
4. Change difficulty level or start a new game anytime

No installation, build process, or dependencies required!

## Project Structure

```
MemoryCard/
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── game.js             # Game logic and state management
├── CLAUDE.md           # Development documentation
├── TEST_PLAN.md        # Comprehensive test results
└── README.md           # This file
```

## Technical Details

- **No dependencies** - Pure vanilla JavaScript
- **Client-side only** - No server required
- **Responsive design** - Adapts to different screen sizes
- **Cross-browser compatible** - Works in all modern browsers

### Architecture

The game uses a single `MemoryGame` class that manages:
- Card state and matching logic
- DOM manipulation and rendering
- Event handling
- Timer and statistics tracking
- Game flow control

## Development

To modify or extend the game:

1. **Add new symbols:** Edit the `symbols` array in `game.js:13`
2. **Adjust timing:** Modify setTimeout delays in `checkMatch()` method
3. **Change colors:** Update CSS variables and class styles in `styles.css`
4. **Add difficulty levels:** Extend `getNumPairs()` method in `game.js:66`

See `CLAUDE.md` for detailed architecture documentation.

## Testing

The game has been thoroughly tested with Playwright. See `TEST_PLAN.md` for:
- Complete test case documentation
- Test results and screenshots
- Browser compatibility notes
- Performance observations

**Test Result:** ✅ All tests passed

## Browser Support

Tested and working in:
- Chrome/Chromium
- Firefox
- Safari
- Edge

Requires ES6+ support for modern JavaScript features.

## License

This project was created as a coding exercise. Feel free to use and modify as needed.

## Acknowledgments

Game concept based on the classic Concentration card game (https://en.wikipedia.org/wiki/Concentration_(card_game))
