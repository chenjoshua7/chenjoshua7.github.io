class Card {
    constructor(suit, rank) {
        if (typeof suit !== 'number' || typeof rank !== 'number') {
            throw new Error("Both suit and rank must be integers");
        }

        const validSuits = {1: "Hearts", 2: "Diamonds", 3: "Spades", 4: "Clubs"};
        const validRank = {14: "Ace", 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, 11: "Jack", 12: "Queen", 13: "King"};

        if (!(rank in validRank)) {
            throw new Error(`Invalid card. Choose from ${Object.values(validRank)}`);
        }

        if (!(suit in validSuits)) {
            throw new Error(`Invalid suit. Choose from ${Object.values(validSuits)}`);
        }

        this.rankint = rank;
        this.suit = validSuits[suit];
        this.rank = validRank[rank];
        this.color = suit in [1, 2] ? "Red" : "Black";
    }

    toString() {
        return `${this.rank} of ${this.suit}`;
    }
}

class Deck {
    constructor() {
        this.cards = [];
    }

    add(card) {
        this.cards.push(card);
    }

    remove(card) {
        const index = this.cards.findIndex(c => c.toString() === card.toString());
        if (index !== -1) {
            this.cards.splice(index, 1);
        } else {
            console.log(`${card} not found in the deck.`);
        }
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    display(head = null) {
        const displayHead = head === null ? this.cards.length : head;
        this.cards.slice(0, displayHead).forEach(card => console.log(card.toString()));
    }

    randomDraw(replace = true) {
        this.shuffle();
        const randCard = this.cards[this.cards.length - 1];
        if (!replace) {
            this.remove(randCard);
        }
        return randCard;
    }

    count() {
        return this.cards.length;
    }

    standard() {
        for (let suit = 1; suit <= 4; suit++) {
            for (let rank = 2; rank <= 14; rank++) {
                this.add(new Card(suit, rank));
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const deck = new Deck();
    let currentCard;
    let score;

    // Reference to all guess buttons
    const guessButtons = document.querySelectorAll("#choices button");

    function initializeGame() {
        deck.standard();
        currentCard = deck.randomDraw(false);
        score = 0;

        updateCardDisplay(currentCard);
        updateScore(score);
        updateMessage("");
        document.getElementById("restart").style.display = 'none'; // Hide restart button
        enableGuessButtons(true); // Enable guess buttons
    }

    initializeGame(); // Start the game

    guessButtons.forEach(button => {
        button.addEventListener("click", () => guess(button.id));
    });

    // Bind restart button
    document.getElementById("restart").addEventListener("click", initializeGame);

    function guess(choice) {
        if (deck.count() === 0) {
            updateMessage("No more cards in the deck.");
            showRestartButton();
            return;
        }

        const newCard = deck.randomDraw(false);
        const result = evaluateGuess(choice, currentCard, newCard);
        currentCard = newCard; // Set the new card as the current card for the next round

        if (result) {
            score++;
            updateMessage("Correct! Next card...");
        } else {
            updateMessage("Incorrect! Game over.");
            showRestartButton();
            enableGuessButtons(false); // Disable guess buttons after incorrect guess
        }
        updateScore(score);
        updateCardDisplay(currentCard);
    }

    function enableGuessButtons(enable) {
        guessButtons.forEach(button => {
            button.disabled = !enable;
        });
    }

    function showRestartButton() {
        document.getElementById("restart").style.display = ''; // Show restart button
    }


    function evaluateGuess(choice, oldCard, newCard) {
        switch (choice) {
            case 'high':
                return newCard.rankint > oldCard.rankint;
            case 'low':
                return newCard.rankint < oldCard.rankint;
            case 'red':
                return newCard.color === "Red";
            case 'black':
                return newCard.color === "Black";
            default:
                return false;
        }
    }

    function updateCardDisplay(card) {
        document.getElementById("startingCard").textContent = card.toString();
    }

    function updateScore(newScore) {
        document.getElementById("score").textContent = newScore;
    }

    function updateMessage(msg) {
        document.getElementById("message").textContent = msg;
    }
});