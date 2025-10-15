# Memory Card Game - Implementation Guide

## Project Overview

This is a browser-based implementation of the classic Memory Card matching game. The game is built using vanilla JavaScript, HTML5, and CSS3, with no external dependencies. It features multiple difficulty levels, game statistics tracking, and a polished user interface.

## How to Run the Game

1. Navigate to the project directory
2. Open `index.html` in any modern web browser (Chrome, Firefox, Safari, Edge)
3. The game will start automatically

No build process or installation is required!

## Game Rules

The Memory Card game follows these rules:

1. **Starting the Game**: All cards are face down, showing only a question mark
2. **Player's Turn**:
   - Click on any card to flip it over and reveal its symbol
   - Click on a second card to reveal its symbol
   - If the symbols match: both cards stay face up (matched)
   - If the symbols don't match: after 1 second, both cards flip back face down
3. **Winning**: Match all pairs of cards to win the game
4. **Statistics**: The game tracks:
   - Number of moves (each pair of flips counts as 1 move)
   - Number of matches found
   - Time elapsed since first card flip

## Project Structure

```
MemoryCard/
│
├── index.html      # Main HTML structure
├── styles.css      # All styling and animations
├── game.js         # Game logic and interactions
└── README.md       # This documentation file
```

## Technical Implementation

### 1. HTML Structure (`index.html`)

The HTML provides the basic structure with these key sections:

- **Header**: Displays the game title and statistics (moves, matches, timer)
- **Game Board**: Container where cards are dynamically generated
- **Controls**: Buttons for "New Game" and "Change Difficulty"
- **Modals**: Pop-ups for difficulty selection and win celebration

**Key Features**:
- Semantic HTML5 elements
- Responsive viewport meta tag for mobile devices
- Separate CSS and JS files for organization

### 2. CSS Styling (`styles.css`)

The CSS creates a polished, modern look with these techniques:

**Visual Design**:
- Gradient backgrounds using `linear-gradient`
- Card flip animations using CSS 3D transforms (`transform-style: preserve-3d`)
- Box shadows for depth (`box-shadow`)
- Smooth transitions for interactive elements

**Layout**:
- CSS Grid for the card layout (`display: grid`)
- Flexbox for statistics and controls (`display: flex`)
- Responsive design with media queries for mobile devices

**Card Flip Effect**:
```css
.card {
    transform-style: preserve-3d;
    transition: transform 0.6s;
}
.card.flipped {
    transform: rotateY(180deg);
}
```

This creates a smooth 3D flip animation when cards are clicked.

**Responsive Breakpoints**:
- 768px: Tablet adjustments
- 480px: Mobile optimizations

### 3. Game Logic (`game.js`)

The JavaScript is organized into a `MemoryGame` class with clear methods for each responsibility.

#### Class Structure

```javascript
class MemoryGame {
    constructor() { /* Initialize game state */ }
    init() { /* Setup */ }
    startNewGame() { /* Reset and start */ }
    // ... more methods
}
```

#### Key Components:

**A. Game State Management**

The game maintains state through these properties:

```javascript
this.cards = [];              // Array of all card objects
this.flippedCards = [];       // Currently flipped cards (max 2)
this.matchedPairs = 0;        // Number of successful matches
this.moves = 0;               // Total moves made
this.isProcessing = false;    // Prevents clicking during mismatch delay
this.timerInterval = null;    // Reference to timer interval
this.seconds = 0;             // Elapsed time
this.numberOfPairs = 8;       // Difficulty setting
```

**B. Card Creation and Shuffling**

1. **Symbol Selection**: Cards use emoji symbols from a predefined array
2. **Pair Creation**: Each symbol is duplicated to create pairs
3. **Shuffling**: Uses the Fisher-Yates algorithm for true random shuffling

```javascript
shuffle(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}
```

**Why Fisher-Yates?** This algorithm guarantees each permutation is equally likely, providing true randomness.

**C. Card Object Structure**

Each card is represented as an object:

```javascript
{
    id: 0,                    // Unique identifier
    symbol: '🎮',             // The emoji to display
    isFlipped: false,         // Current flip state
    isMatched: false          // Whether it's been matched
}
```

**D. Click Handling Flow**

1. User clicks a card → `handleCardClick(cardId)` is called
2. Validation checks:
   - Is the game currently processing? (prevents spam clicking)
   - Is the card already flipped or matched? (ignore if yes)
3. Flip the card and add it to `flippedCards` array
4. If this is the first move, start the timer
5. If two cards are flipped:
   - Increment move counter
   - Set `isProcessing = true` (block further clicks)
   - Call `checkForMatch()`

**E. Match Detection**

```javascript
checkForMatch() {
    const [first, second] = this.flippedCards;

    if (first.card.symbol === second.card.symbol) {
        this.handleMatch(first, second);      // Cards match!
    } else {
        this.handleMismatch(first, second);   // No match
    }
}
```

**Match Handling**:
- Mark cards as matched
- Add visual "matched" class (reduces opacity)
- Increment matched pairs counter
- Check if all pairs are found (win condition)

**Mismatch Handling**:
- Wait 1 second using `setTimeout`
- Flip both cards back face down
- Reset the `flippedCards` array
- Allow new clicks (`isProcessing = false`)

**F. Timer System**

```javascript
startTimer() {
    this.timerInterval = setInterval(() => {
        this.seconds++;
        this.updateTimer();
    }, 1000);
}
```

- Timer starts on the first card flip
- Updates every second using `setInterval`
- Displays as MM:SS format
- Stops when the game is won

**G. Win Condition**

```javascript
if (this.matchedPairs === this.numberOfPairs) {
    this.handleWin();
}
```

When all pairs are matched:
1. Stop the timer
2. Wait 500ms for final animation
3. Display win modal with statistics

**H. Difficulty Levels**

Three difficulty options:
- **Easy**: 6 pairs (12 cards) - 3x4 grid
- **Medium**: 8 pairs (16 cards) - 4x4 grid
- **Hard**: 12 pairs (24 cards) - 4x6 grid

The grid layout adjusts automatically using CSS classes.

#### Event Listeners

The game uses event delegation and direct listeners:

```javascript
setupEventListeners() {
    this.resetBtn.addEventListener('click', () => this.startNewGame());
    // ... more listeners
}
```

Each card element gets its own click listener that captures the card ID:

```javascript
cardDiv.addEventListener('click', () => this.handleCardClick(card.id));
```

#### DOM Manipulation

The game creates card elements dynamically:

```javascript
createCardElement(card) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    cardDiv.dataset.id = card.id;  // Store ID for reference

    // Front face (shows symbol)
    const cardFront = document.createElement('div');
    cardFront.className = 'card-face card-front';
    cardFront.textContent = card.symbol;

    // Back face (shows ?)
    const cardBack = document.createElement('div');
    cardBack.className = 'card-face card-back';

    cardDiv.appendChild(cardFront);
    cardDiv.appendChild(cardBack);

    return cardDiv;
}
```

## Key Algorithms and Patterns

### 1. Fisher-Yates Shuffle Algorithm

**Purpose**: Randomly shuffle the card array to ensure fair gameplay

**How it works**:
- Start from the end of the array
- For each position, pick a random element from the remaining unshuffled portion
- Swap the current element with the randomly selected one
- Continue until all elements are shuffled

**Time Complexity**: O(n) - very efficient
**Space Complexity**: O(n) - creates a copy of the array

### 2. State Management Pattern

The game uses a centralized state model:
- All game state is stored in class properties
- State changes trigger UI updates
- Prevents race conditions with `isProcessing` flag

### 3. MVC-inspired Architecture

While not strict MVC, the code separates concerns:
- **Model**: Game state (`cards`, `moves`, `matchedPairs`, etc.)
- **View**: DOM manipulation methods (`renderCards`, `updateStats`, etc.)
- **Controller**: Event handlers and game logic methods

### 4. Modal Management

Modals use simple show/hide with CSS classes:
```javascript
showWinModal() {
    this.winModal.classList.remove('hidden');
}
```

This is more performant than creating/destroying DOM elements.

## Design Decisions

### Why Vanilla JavaScript?

**Pros**:
- No dependencies or build process
- Fast loading and execution
- Easy to understand for interviews
- Works in any browser

**Cons**:
- More verbose than frameworks
- Manual DOM manipulation

**Verdict**: For this project, vanilla JS is ideal. It demonstrates fundamental understanding without framework magic.

### Why Use a Class?

**Benefits**:
- Encapsulation: All game logic in one place
- State management: Properties hold game state
- Organization: Clear method structure
- Single instance: One game object controls everything

### Why Emojis for Symbols?

**Advantages**:
- No image files needed
- Unicode support in all modern browsers
- Colorful and visually appealing
- Easy to add more symbols

### Why CSS Grid for Layout?

**Reasons**:
- Perfect for grid-based layouts
- Responsive with minimal code
- Easy to change grid dimensions
- Better than floats or flexbox for this use case

### Why setTimeout for Mismatch Delay?

**Purpose**: Give players time to memorize card positions

**Implementation**:
```javascript
setTimeout(() => {
    // Flip cards back after 1 second
}, 1000);
```

This creates a better user experience than instant flipping.

## Performance Considerations

1. **Event Delegation**: While each card has its own listener, this is acceptable for 12-24 cards. For larger scales, event delegation on the parent would be better.

2. **Minimal Reflows**: The game avoids layout thrashing by batching DOM changes.

3. **CSS Animations**: Hardware-accelerated transforms (`rotateY`) instead of JavaScript animations.

4. **No Memory Leaks**: Timer is properly cleared when game resets or wins.

## Browser Compatibility

The game works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

**Features Used**:
- ES6 Classes
- Arrow functions
- Template literals
- CSS Grid
- CSS 3D Transforms
- Flexbox

**Note**: IE11 is not supported due to ES6 features.

## Potential Extensions

Here are ideas you could discuss in your interview:

1. **Multiplayer Mode**: Track two players alternating turns
2. **Leaderboard**: Store best times in localStorage
3. **Difficulty Progression**: Unlock harder levels
4. **Sound Effects**: Add audio feedback for flips and matches
5. **Themes**: Different symbol sets (animals, numbers, etc.)
6. **Accessibility**: Keyboard navigation and screen reader support
7. **Animations**: More elaborate flip animations
8. **Hint System**: Briefly reveal all cards
9. **Custom Difficulty**: Let users choose number of pairs
10. **Score System**: Calculate score based on moves and time

## Code Quality Features

1. **Comments**: Clear JSDoc-style comments on methods
2. **Naming**: Descriptive variable and function names
3. **Organization**: Logical grouping of related methods
4. **Separation**: HTML, CSS, and JS in separate files
5. **Responsiveness**: Works on mobile and desktop
6. **Error Prevention**: Guards against invalid states

## Testing Checklist

When demonstrating the game, verify:

- [ ] Cards shuffle randomly each game
- [ ] Timer starts on first card flip
- [ ] Matched cards stay face up
- [ ] Mismatched cards flip back after delay
- [ ] Can't click cards during processing
- [ ] Move counter increments correctly
- [ ] Win modal appears with correct stats
- [ ] New Game button resets everything
- [ ] Difficulty changes work correctly
- [ ] Responsive layout on mobile
- [ ] All three difficulty levels work

## Interview Talking Points

Be prepared to discuss:

1. **Why this approach?** - Vanilla JS shows fundamentals
2. **Trade-offs** - Class vs functions, CSS vs JS animations
3. **Scalability** - How would you handle 1000 cards?
4. **Testing** - How would you write unit tests?
5. **Accessibility** - What's missing for screen readers?
6. **State Management** - How does the game prevent bugs?
7. **Performance** - Where are potential bottlenecks?
8. **Code Organization** - Why separate certain methods?

## Common Interview Extensions

Be ready to implement:

1. **"Add a move limit"** - Easy, just check `this.moves` against a max
2. **"Add animations"** - CSS transitions or keyframes
3. **"Make it two-player"** - Track current player and alternating turns
4. **"Add difficulty based on time"** - Reduce delay for mismatches
5. **"Save high scores"** - localStorage API

## Summary

This Memory Card game demonstrates:

- **Core JavaScript**: Classes, arrays, objects, DOM manipulation
- **Algorithm Knowledge**: Fisher-Yates shuffle
- **State Management**: Centralized game state
- **UI/UX**: Smooth animations and responsive design
- **Problem Solving**: Handling edge cases (spam clicking, etc.)
- **Code Quality**: Clean, commented, organized code

The implementation follows the requirements exactly while adding polish and extensibility. It's interview-ready and easy to extend based on follow-up questions.

Good luck with your interview! 🚀
