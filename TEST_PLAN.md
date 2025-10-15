# Memory Card Game - Comprehensive Test Plan

## Overview
This test plan validates the Memory Card game against the classic Concentration game rules, ensuring proper functionality across different difficulty levels and user interactions.

---

## 1. Initial Game State Tests

### Test 1.1: Game Initialization
**Objective**: Verify the game loads with correct initial state
**Steps**:
1. Navigate to the game URL
2. Take snapshot of the page
3. Verify all cards are face down (showing "?")
4. Verify stats display: Moves: 0, Matches: 0/8, Time: 0:00

**Expected Result**:
- All cards display the back face with "?" symbol
- Initial statistics are correct
- Game board displays 16 cards (8 pairs) for medium difficulty

---

### Test 1.2: Card Count by Difficulty
**Objective**: Verify correct number of cards for each difficulty level
**Steps**:
1. Click "Change Difficulty" button
2. Select "Easy (6 pairs)"
3. Count cards on board (should be 12)
4. Repeat for Medium (16 cards) and Hard (24 cards)

**Expected Result**:
- Easy: 12 cards (6 pairs)
- Medium: 16 cards (8 pairs)
- Hard: 24 cards (12 pairs)

---

## 2. Core Gameplay Tests

### Test 2.1: First Card Flip
**Objective**: Verify single card can be flipped
**Steps**:
1. Click on any card
2. Verify card flips to show symbol
3. Verify card remains face up
4. Verify timer starts (0:01+)
5. Verify moves counter remains at 0

**Expected Result**:
- Card rotates and displays an emoji symbol
- Card stays flipped
- Timer begins counting
- Moves counter doesn't increment until 2nd card is flipped

---

### Test 2.2: Second Card Flip - Non-Matching
**Objective**: Verify non-matching cards flip back
**Steps**:
1. Click first card, note its symbol
2. Click a different card with a different symbol
3. Wait for 1 second
4. Verify both cards flip back to face down
5. Verify moves counter increments to 1

**Expected Result**:
- Both cards remain visible for ~1 second
- Both cards flip back to face down after delay
- Moves counter shows 1
- Matches counter remains 0/8

---

### Test 2.3: Second Card Flip - Matching
**Objective**: Verify matching cards remain face up
**Steps**:
1. Click first card, note its symbol (e.g., 🎮)
2. Click another card with the same symbol
3. Wait 1 second
4. Verify both cards remain face up
5. Verify cards have "matched" styling (reduced opacity)

**Expected Result**:
- Both cards stay face up permanently
- Cards appear slightly faded (opacity: 0.6)
- Moves counter increments to 1
- Matches counter shows 1/8

---

### Test 2.4: Cannot Click During Processing
**Objective**: Verify cards cannot be clicked while two cards are being compared
**Steps**:
1. Click first card
2. Click second card (non-matching)
3. Immediately try to click a third card before the 1-second delay
4. Verify third card does not flip

**Expected Result**:
- Third card click is ignored
- Only the first two cards are processing

---

### Test 2.5: Cannot Re-click Flipped Cards
**Objective**: Verify already flipped cards cannot be clicked again
**Steps**:
1. Click a card to flip it
2. Try clicking the same card again
3. Verify nothing happens

**Expected Result**:
- Card doesn't respond to second click
- No duplicate card in the comparison

---

### Test 2.6: Cannot Click Matched Cards
**Objective**: Verify matched cards are disabled
**Steps**:
1. Match a pair of cards
2. Try clicking one of the matched cards
3. Verify no action occurs

**Expected Result**:
- Matched cards are non-interactive
- Cursor may show as default (not pointer)

---

## 3. Game Completion Tests

### Test 3.1: Win Condition
**Objective**: Verify game completion when all pairs are matched
**Steps**:
1. Complete the game by matching all pairs
2. Verify win modal appears
3. Check modal displays:
   - "🎉 Congratulations!"
   - Final move count
   - Final time
4. Verify timer stops

**Expected Result**:
- Win modal appears after last match
- Shows correct statistics
- Timer stops counting

---

### Test 3.2: Play Again from Win Modal
**Objective**: Verify "Play Again" button resets the game
**Steps**:
1. Complete a game to trigger win modal
2. Click "Play Again" button
3. Verify game resets:
   - All cards face down
   - Moves: 0
   - Matches: 0/8
   - Time: 0:00

**Expected Result**:
- New shuffled game board
- All stats reset
- Win modal closes

---

## 4. Game Controls Tests

### Test 4.1: New Game Button
**Objective**: Verify "New Game" button resets mid-game
**Steps**:
1. Start a game and make a few moves
2. Click "New Game" button
3. Verify all game state resets

**Expected Result**:
- Cards are reshuffled
- All stats reset to 0
- Any flipped cards reset to face down
- Timer resets

---

### Test 4.2: Difficulty Modal - Open/Close
**Objective**: Verify difficulty modal can be opened and closed
**Steps**:
1. Click "Change Difficulty" button
2. Verify modal appears with three options
3. Click "Cancel" button
4. Verify modal closes without changing game

**Expected Result**:
- Modal displays with difficulty options
- Cancel button closes modal
- Current game is not affected

---

### Test 4.3: Change Difficulty Mid-Game
**Objective**: Verify changing difficulty starts new game
**Steps**:
1. Start a game and make some matches
2. Click "Change Difficulty"
3. Select different difficulty (e.g., "Hard")
4. Verify new game starts with correct card count

**Expected Result**:
- New game board with correct number of cards
- All stats reset
- Previous progress is lost

---

## 5. Statistics Tracking Tests

### Test 5.1: Moves Counter Accuracy
**Objective**: Verify moves counter increments correctly
**Steps**:
1. Make 5 complete turns (10 card flips)
2. Verify moves counter shows 5

**Expected Result**:
- Moves counter increments only after second card is flipped
- Each pair of flips counts as 1 move

---

### Test 5.2: Matches Counter Accuracy
**Objective**: Verify matches counter updates correctly
**Steps**:
1. Match 3 pairs of cards
2. Verify matches shows "3 / 8"
3. Make a non-match
4. Verify matches still shows "3 / 8"

**Expected Result**:
- Counter only increments on successful matches
- Shows current matches / total pairs

---

### Test 5.3: Timer Starts on First Click
**Objective**: Verify timer begins when first card is clicked
**Steps**:
1. Load game (timer should show 0:00)
2. Wait 5 seconds (timer should still show 0:00)
3. Click first card
4. Verify timer begins counting

**Expected Result**:
- Timer remains at 0:00 until first card click
- Timer starts immediately after first click

---

### Test 5.4: Timer Format
**Objective**: Verify timer displays in M:SS format
**Steps**:
1. Start game and let timer run past 1 minute
2. Verify format shows "1:00", "1:01", etc.

**Expected Result**:
- Seconds are zero-padded (0:05, not 0:5)
- Minutes display correctly

---

## 6. Card Pairing Tests

### Test 6.1: All Symbols Come in Pairs
**Objective**: Verify every symbol has exactly one matching pair
**Steps**:
1. Note all symbols as cards are revealed
2. Verify each symbol appears exactly twice

**Expected Result**:
- No symbols appear 1, 3, or more times
- Every symbol has exactly one match

---

### Test 6.2: Card Shuffling
**Objective**: Verify cards are randomized between games
**Steps**:
1. Note positions of first 4 cards in a game
2. Start a new game
3. Verify card positions have changed

**Expected Result**:
- Card positions are different
- Symbols are redistributed

---

## 7. Visual and Animation Tests

### Test 7.1: Card Flip Animation
**Objective**: Verify smooth card flip transition
**Steps**:
1. Click a card
2. Observe the flip animation
3. Verify 3D rotation effect occurs

**Expected Result**:
- Card rotates on Y-axis (180 degrees)
- Animation is smooth (0.6s transition)
- Symbol is visible after flip

---

### Test 7.2: Matched Cards Visual State
**Objective**: Verify matched cards have distinct appearance
**Steps**:
1. Match a pair of cards
2. Verify visual differences from unmatched cards

**Expected Result**:
- Matched cards have reduced opacity (0.6)
- Cards remain face up
- Still display their symbols

---

### Test 7.3: Hover Effects
**Objective**: Verify hover effects on unflipped cards
**Steps**:
1. Hover over an unflipped card
2. Verify slight scale increase (1.05)
3. Hover over matched card
4. Verify no hover effect

**Expected Result**:
- Unflipped cards scale up on hover
- Matched cards don't have hover effect
- Flipped (but not matched) cards may not have hover

---

## 8. Edge Cases and Error Handling

### Test 8.1: Rapid Clicking
**Objective**: Verify game handles rapid clicks gracefully
**Steps**:
1. Click multiple cards very quickly
2. Verify only first 2 clicks register
3. Verify game doesn't break

**Expected Result**:
- Only 2 cards flip per turn
- Processing flag prevents additional clicks
- No error states

---

### Test 8.2: Clicking Same Card Twice
**Objective**: Verify clicking same card twice doesn't count as match
**Steps**:
1. Click a card to flip it
2. Try clicking the same card again
3. Verify second click is ignored

**Expected Result**:
- Same card cannot be counted as both cards in a pair
- No false match occurs

---

### Test 8.3: Browser Resize
**Objective**: Verify responsive layout
**Steps**:
1. Resize browser to mobile width (480px)
2. Verify layout adjusts appropriately
3. Verify game remains playable

**Expected Result**:
- Cards resize but remain clickable
- Layout may change to different grid (e.g., 3 columns for hard mode)
- All functionality maintained

---

### Test 8.4: Page Refresh Mid-Game
**Objective**: Verify behavior when page is refreshed
**Steps**:
1. Make progress in a game
2. Refresh the page
3. Verify game resets to initial state

**Expected Result**:
- Game starts fresh (no save state)
- All cards face down
- Stats reset

---

## 9. Performance Tests

### Test 9.1: All Difficulty Levels Load
**Objective**: Verify game performs well at all difficulties
**Steps**:
1. Test Easy (12 cards)
2. Test Medium (16 cards)
3. Test Hard (24 cards)
4. Verify smooth animations and responsiveness

**Expected Result**:
- No lag or performance issues
- Animations remain smooth
- Click responses are immediate

---

## 10. Accessibility Tests

### Test 10.1: Keyboard Navigation
**Objective**: Verify basic accessibility
**Steps**:
1. Try navigating with Tab key
2. Try activating buttons with Enter/Space

**Expected Result**:
- Buttons can be reached with keyboard
- Cards may not be keyboard accessible (depends on implementation)

---

## Test Execution Summary

### Priority 1 (Critical - Core Gameplay):
- Tests 2.1 - 2.6 (Card flipping and matching logic)
- Test 3.1 (Win condition)
- Test 6.1 (All symbols come in pairs)

### Priority 2 (High - Game Features):
- Tests 1.1 - 1.2 (Initial state)
- Tests 4.1 - 4.3 (Game controls)
- Tests 5.1 - 5.3 (Statistics)

### Priority 3 (Medium - UX/Polish):
- Tests 7.1 - 7.3 (Visual effects)
- Tests 8.1 - 8.4 (Edge cases)

### Priority 4 (Low - Nice to Have):
- Test 9.1 (Performance)
- Test 10.1 (Accessibility)

---

## Automation Notes for Playwright

When implementing these tests with Playwright MCP:

1. **Use `browser_snapshot`** to capture page state and locate elements by their reference IDs
2. **Use `browser_click`** with proper element references for card clicks
3. **Use `browser_wait_for`** with time parameter for the 1-second mismatch delay
4. **Check text content** in stats displays using snapshots
5. **Verify modal visibility** by checking for "hidden" class or display state
6. **Use `browser_take_screenshot`** to capture visual states for documentation

### Recommended Test Structure:
```
1. Navigate to file:///path/to/index.html
2. Take snapshot to get initial state
3. Interact with elements using their refs from snapshot
4. Wait for animations/timeouts when needed
5. Take new snapshot to verify state changes
6. Assert on text content and element classes
```

---

## Notes
- The game implements the classic Concentration rules correctly
- 1-second delay for mismatches allows player observation
- Cards remain face up when matched (per rules)
- Timer and statistics provide good feedback
- No known bugs identified in code review
