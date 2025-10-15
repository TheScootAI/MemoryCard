class MemoryGame {
    constructor() {
        // Game state
        this.cards = [];
        this.flippedCards = [];
        this.moves = 0;
        this.matches = 0;
        this.isProcessing = false;
        this.timer = null;
        this.seconds = 0;

        // Card symbols - using emojis for visual appeal
        this.symbols = ['🎮', '🎨', '🎭', '🎪', '🎯', '🎲', '🎸', '🎹', '🎺', '🎻', '🎬', '🎤'];

        // DOM elements
        this.gameBoard = document.getElementById('game-board');
        this.movesDisplay = document.getElementById('moves');
        this.matchesDisplay = document.getElementById('matches');
        this.timeDisplay = document.getElementById('time');
        this.restartBtn = document.getElementById('restart-btn');
        this.difficultySelect = document.getElementById('difficulty');
        this.victoryMessage = document.getElementById('victory-message');
        this.playAgainBtn = document.getElementById('play-again-btn');

        // Bind event listeners
        this.restartBtn.addEventListener('click', () => this.initGame());
        this.difficultySelect.addEventListener('change', () => this.initGame());
        this.playAgainBtn.addEventListener('click', () => {
            this.victoryMessage.classList.add('hidden');
            this.initGame();
        });

        // Start the game
        this.initGame();
    }

    initGame() {
        // Reset game state
        this.flippedCards = [];
        this.moves = 0;
        this.matches = 0;
        this.isProcessing = false;
        this.seconds = 0;

        // Clear timer if exists
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }

        // Update displays
        this.movesDisplay.textContent = '0';
        this.matchesDisplay.textContent = '0';
        this.timeDisplay.textContent = '0:00';

        // Get difficulty and create cards
        const difficulty = this.difficultySelect.value;
        const numPairs = this.getNumPairs(difficulty);
        this.createCards(numPairs);
        this.renderCards();

        // Update board class for grid layout
        this.gameBoard.className = 'game-board ' + difficulty;
    }

    getNumPairs(difficulty) {
        switch(difficulty) {
            case 'easy': return 4;
            case 'medium': return 8;
            case 'hard': return 12;
            default: return 8;
        }
    }

    createCards(numPairs) {
        // Create pairs of cards
        this.cards = [];
        const selectedSymbols = this.symbols.slice(0, numPairs);

        // Create two of each symbol
        selectedSymbols.forEach(symbol => {
            this.cards.push({ symbol, id: Math.random(), matched: false });
            this.cards.push({ symbol, id: Math.random(), matched: false });
        });

        // Shuffle cards
        this.shuffle(this.cards);
    }

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    renderCards() {
        this.gameBoard.innerHTML = '';

        this.cards.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.className = 'card';
            cardElement.dataset.index = index;

            const cardInner = document.createElement('div');
            cardInner.className = 'card-inner';
            cardInner.textContent = card.symbol;

            cardElement.appendChild(cardInner);
            cardElement.addEventListener('click', () => this.handleCardClick(index));

            this.gameBoard.appendChild(cardElement);
        });
    }

    handleCardClick(index) {
        // Start timer on first move
        if (this.moves === 0 && !this.timer) {
            this.startTimer();
        }

        // Prevent clicking during processing or on already flipped/matched cards
        if (this.isProcessing) return;

        const card = this.cards[index];
        const cardElement = this.gameBoard.children[index];

        if (card.matched || cardElement.classList.contains('flipped')) return;

        // Flip the card
        cardElement.classList.add('flipped');
        this.flippedCards.push({ card, element: cardElement, index });

        // Check if two cards are flipped
        if (this.flippedCards.length === 2) {
            this.isProcessing = true;
            this.moves++;
            this.movesDisplay.textContent = this.moves;

            this.checkMatch();
        }
    }

    checkMatch() {
        const [first, second] = this.flippedCards;

        if (first.card.symbol === second.card.symbol) {
            // Match found!
            setTimeout(() => {
                first.element.classList.add('matched');
                second.element.classList.add('matched');
                first.card.matched = true;
                second.card.matched = true;

                this.matches++;
                this.matchesDisplay.textContent = this.matches;

                this.flippedCards = [];
                this.isProcessing = false;

                // Check if game is won
                if (this.matches === this.cards.length / 2) {
                    this.gameWon();
                }
            }, 500);
        } else {
            // No match - flip back after delay
            setTimeout(() => {
                first.element.classList.add('wrong');
                second.element.classList.add('wrong');

                setTimeout(() => {
                    first.element.classList.remove('flipped', 'wrong');
                    second.element.classList.remove('flipped', 'wrong');

                    this.flippedCards = [];
                    this.isProcessing = false;
                }, 500);
            }, 1000);
        }
    }

    startTimer() {
        this.timer = setInterval(() => {
            this.seconds++;
            const minutes = Math.floor(this.seconds / 60);
            const secs = this.seconds % 60;
            this.timeDisplay.textContent = `${minutes}:${secs.toString().padStart(2, '0')}`;
        }, 1000);
    }

    gameWon() {
        clearInterval(this.timer);

        // Show victory message
        setTimeout(() => {
            document.getElementById('final-moves').textContent = this.moves;
            document.getElementById('final-time').textContent = this.timeDisplay.textContent;
            this.victoryMessage.classList.remove('hidden');
        }, 500);
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MemoryGame();
});
