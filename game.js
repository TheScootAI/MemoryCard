/**
 * Memory Card Game
 * A classic memory matching game with multiple difficulty levels
 */

class MemoryGame {
    constructor() {
        // Game state
        this.cards = [];
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.moves = 0;
        this.isProcessing = false;
        this.timerInterval = null;
        this.seconds = 0;
        this.numberOfPairs = 8; // Default: medium difficulty

        // Card symbols (emojis for visual appeal)
        this.symbols = [
            '🎮', '🎯', '🎨', '🎭', '🎪', '🎸', '🎺', '🎻',
            '🏀', '⚽', '🏈', '🎾', '🏐', '🏉', '⚾', '🥎'
        ];

        // DOM elements
        this.gameBoard = document.getElementById('game-board');
        this.movesDisplay = document.getElementById('moves');
        this.matchesDisplay = document.getElementById('matches');
        this.timerDisplay = document.getElementById('timer');
        this.resetBtn = document.getElementById('reset-btn');
        this.difficultyBtn = document.getElementById('difficulty-btn');
        this.difficultyModal = document.getElementById('difficulty-modal');
        this.winModal = document.getElementById('win-modal');
        this.closeModalBtn = document.getElementById('close-modal');
        this.playAgainBtn = document.getElementById('play-again');
        this.winStatsDisplay = document.getElementById('win-stats');

        // Initialize the game
        this.init();
    }

    /**
     * Initialize the game and set up event listeners
     */
    init() {
        this.setupEventListeners();
        this.startNewGame();
    }

    /**
     * Set up all event listeners
     */
    setupEventListeners() {
        this.resetBtn.addEventListener('click', () => this.startNewGame());
        this.difficultyBtn.addEventListener('click', () => this.showDifficultyModal());
        this.closeModalBtn.addEventListener('click', () => this.hideDifficultyModal());
        this.playAgainBtn.addEventListener('click', () => {
            this.hideWinModal();
            this.startNewGame();
        });

        // Difficulty selection buttons
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.numberOfPairs = parseInt(e.target.dataset.pairs);
                this.hideDifficultyModal();
                this.startNewGame();
            });
        });
    }

    /**
     * Start a new game
     */
    startNewGame() {
        // Reset game state
        this.cards = [];
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.moves = 0;
        this.isProcessing = false;
        this.seconds = 0;

        // Stop any existing timer
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }

        // Update displays
        this.updateStats();
        this.updateTimer();

        // Create and shuffle cards
        this.createCards();
        this.renderCards();
    }

    /**
     * Create card pairs based on difficulty
     */
    createCards() {
        const selectedSymbols = this.symbols.slice(0, this.numberOfPairs);
        const cardPairs = [...selectedSymbols, ...selectedSymbols];

        // Shuffle the cards using Fisher-Yates algorithm
        this.cards = this.shuffle(cardPairs).map((symbol, index) => ({
            id: index,
            symbol: symbol,
            isFlipped: false,
            isMatched: false
        }));
    }

    /**
     * Shuffle an array using Fisher-Yates algorithm
     */
    shuffle(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    /**
     * Render cards to the DOM
     */
    renderCards() {
        // Set grid layout based on difficulty
        this.gameBoard.className = 'game-board';
        if (this.numberOfPairs === 6) {
            this.gameBoard.classList.add('easy');
        } else if (this.numberOfPairs === 8) {
            this.gameBoard.classList.add('medium');
        } else {
            this.gameBoard.classList.add('hard');
        }

        // Clear existing cards
        this.gameBoard.innerHTML = '';

        // Create card elements
        this.cards.forEach(card => {
            const cardElement = this.createCardElement(card);
            this.gameBoard.appendChild(cardElement);
        });
    }

    /**
     * Create a card DOM element
     */
    createCardElement(card) {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.dataset.id = card.id;

        const cardFront = document.createElement('div');
        cardFront.className = 'card-face card-front';
        cardFront.textContent = card.symbol;

        const cardBack = document.createElement('div');
        cardBack.className = 'card-face card-back';

        cardDiv.appendChild(cardFront);
        cardDiv.appendChild(cardBack);

        // Add click event listener
        cardDiv.addEventListener('click', () => this.handleCardClick(card.id));

        return cardDiv;
    }

    /**
     * Handle card click event
     */
    handleCardClick(cardId) {
        // Ignore clicks if processing or game is complete
        if (this.isProcessing) return;

        const card = this.cards[cardId];
        const cardElement = document.querySelector(`[data-id="${cardId}"]`);

        // Ignore if card is already flipped or matched
        if (card.isFlipped || card.isMatched) return;

        // Start timer on first move
        if (this.moves === 0 && !this.timerInterval) {
            this.startTimer();
        }

        // Flip the card
        this.flipCard(card, cardElement);

        // Add to flipped cards array
        this.flippedCards.push({ card, cardElement });

        // Check if two cards are flipped
        if (this.flippedCards.length === 2) {
            this.isProcessing = true;
            this.moves++;
            this.updateStats();
            this.checkForMatch();
        }
    }

    /**
     * Flip a card
     */
    flipCard(card, cardElement) {
        card.isFlipped = true;
        cardElement.classList.add('flipped');
    }

    /**
     * Unflip a card
     */
    unflipCard(card, cardElement) {
        card.isFlipped = false;
        cardElement.classList.remove('flipped');
    }

    /**
     * Check if two flipped cards match
     */
    checkForMatch() {
        const [first, second] = this.flippedCards;

        if (first.card.symbol === second.card.symbol) {
            // Cards match!
            this.handleMatch(first, second);
        } else {
            // Cards don't match
            this.handleMismatch(first, second);
        }
    }

    /**
     * Handle matching cards
     */
    handleMatch(first, second) {
        // Mark cards as matched (keep them flipped)
        first.card.isMatched = true;
        second.card.isMatched = true;
        first.card.isFlipped = true;
        second.card.isFlipped = true;
        first.cardElement.classList.add('matched');
        second.cardElement.classList.add('matched');
        // Ensure they stay flipped
        first.cardElement.classList.add('flipped');
        second.cardElement.classList.add('flipped');

        // Increment matched pairs
        this.matchedPairs++;
        this.updateStats();

        // Reset flipped cards
        this.flippedCards = [];
        this.isProcessing = false;

        // Check if game is won
        if (this.matchedPairs === this.numberOfPairs) {
            this.handleWin();
        }
    }

    /**
     * Handle mismatched cards
     */
    handleMismatch(first, second) {
        // Wait 1 second before flipping cards back
        setTimeout(() => {
            this.unflipCard(first.card, first.cardElement);
            this.unflipCard(second.card, second.cardElement);
            this.flippedCards = [];
            this.isProcessing = false;
        }, 1000);
    }

    /**
     * Handle game win
     */
    handleWin() {
        // Stop timer
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }

        // Show win modal after a short delay
        setTimeout(() => {
            this.showWinModal();
        }, 500);
    }

    /**
     * Start the game timer
     */
    startTimer() {
        this.timerInterval = setInterval(() => {
            this.seconds++;
            this.updateTimer();
        }, 1000);
    }

    /**
     * Update timer display
     */
    updateTimer() {
        const minutes = Math.floor(this.seconds / 60);
        const seconds = this.seconds % 60;
        this.timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    /**
     * Update game statistics display
     */
    updateStats() {
        this.movesDisplay.textContent = this.moves;
        this.matchesDisplay.textContent = `${this.matchedPairs} / ${this.numberOfPairs}`;
    }

    /**
     * Show difficulty selection modal
     */
    showDifficultyModal() {
        this.difficultyModal.classList.remove('hidden');
    }

    /**
     * Hide difficulty selection modal
     */
    hideDifficultyModal() {
        this.difficultyModal.classList.add('hidden');
    }

    /**
     * Show win modal
     */
    showWinModal() {
        const minutes = Math.floor(this.seconds / 60);
        const seconds = this.seconds % 60;
        const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;

        this.winStatsDisplay.textContent = `Moves: ${this.moves} | Time: ${timeString}`;
        this.winModal.classList.remove('hidden');
    }

    /**
     * Hide win modal
     */
    hideWinModal() {
        this.winModal.classList.add('hidden');
    }
}

// Initialize the game when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new MemoryGame();
});
