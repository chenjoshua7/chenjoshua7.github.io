let roundScore = 0;
let playerScore = [];
let finalScore = 0;
let gameActive = false;

function rollDice() {
    const roll = Math.floor(Math.random() * 6) + 1;
    if (roll === 1) {
        roundScore = 0;
        gameActive = false;
        updateDiceButton();
        output(`Rolled a 1. You lose all your points for this round.`);
    } else {
        roundScore += roll;
        output(`You rolled a ${roll}. Round score: ${roundScore}`);
    }
}

function userRollDice() {
    if (gameActive) {
        rollDice();
    }
}

function startGame() {
    roundScore = 0;
    playerScore = [];
    finalScore = 0;
    gameActive = true;
    updateDiceButton();
    clearOutput();
    output('Game has started! Good luck!');
}

function updateDiceButton() {
    document.getElementById('rollDiceBtn').disabled = !gameActive;
}

function output(message) {
    const gameOutputDiv = document.getElementById("gameOutput");
    gameOutputDiv.innerHTML += message + "<br/>";
}

function clearOutput() {
    const gameOutputDiv = document.getElementById("gameOutput");
    gameOutputDiv.innerHTML = "";
}