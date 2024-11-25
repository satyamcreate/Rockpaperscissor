let userScore = 0;
let computerScore = 0;

const userScoreElement = document.getElementById('user-score').querySelector('.score-value');
const computerScoreElement = document.getElementById('computer-score').querySelector('.score-value');
const triangle = document.querySelector('.triangle');
const playAgainButton = document.getElementById('play-again');
const rulesButton = document.getElementById('rules-btn');
const rulesModal = document.getElementById('rules-modal');
const closeRulesButton = document.getElementById('close-rules');
const gameArea = document.querySelector('.game');


function userChoice(choice) {
    const computerChoice = getComputerChoice();
    const roundResult = getRoundResult(choice, computerChoice);
    updateScore(roundResult);
    showRoundResult(choice, computerChoice, roundResult);
}

// Function to get computer's random choice
function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    return choices[Math.floor(Math.random() * choices.length)];
}

// Function to determine round winner
function getRoundResult(userChoice, computerChoice) {
    if (userChoice === computerChoice) return 'draw';
    if ((userChoice === 'rock' && computerChoice === 'scissors') || 
        (userChoice === 'paper' && computerChoice === 'rock') || 
        (userChoice === 'scissors' && computerChoice === 'paper')) {
        return 'user';
    }
    return 'computer';
}

// Update scores based on the result of the round
function updateScore(result) {
    if (result === 'user') {
        userScore++;
    } else if (result === 'computer') {
        computerScore++;
    }
    userScoreElement.textContent = userScore;
    computerScoreElement.textContent = computerScore;
}

// Display the result of the round
function showRoundResult(userChoice, computerChoice, result) {
    // Hide the triangle and existing icons
    triangle.style.opacity = 0;
    triangle.style.transition = 'opacity 0.5s';

    setTimeout(() => {
        triangle.style.display = 'none';

        // Create result display
        const resultDisplay = document.createElement('div');
        resultDisplay.classList.add('result-display');
        resultDisplay.innerHTML = `
            <div class="icon-display user">
                <img src="path/to/icons/${userChoice}.png" alt="${userChoice}">
                <p>You</p>
            </div>
            <div class="result-message">
                <p>${result === 'draw' ? "It's a Tie!" : result === 'user' ? "You Win!" : "You Lose!"}</p>
            </div>
            <div class="icon-display computer">
                <img src="path/to/icons/${computerChoice}.png" alt="${computerChoice}">
                <p>Computer</p>
            </div>
        `;

        gameArea.innerHTML = ''; // Clear previous game area content
        gameArea.appendChild(resultDisplay);

        // Add animations
        resultDisplay.style.opacity = 0;
        resultDisplay.style.transform = 'scale(0.9)';
        setTimeout(() => {
            resultDisplay.style.opacity = 1;
            resultDisplay.style.transform = 'scale(1)';
            resultDisplay.style.transition = 'opacity 0.5s, transform 0.5s';
        }, 100);

        // Show Play Again button
        playAgainButton.style.display = 'block';
    }, 500);
}

// Reset the game to its initial state
function playAgain() {
    userScore = 0;
    computerScore = 0;
    userScoreElement.textContent = userScore;
    computerScoreElement.textContent = computerScore;

    resetGameArea();

    playAgainButton.style.display = 'none'; // Hide Play Again button
}

function resetGameArea() {
    gameArea.innerHTML = `
        <div class="triangle">
            <img src="path/to/background/bg-triangle.svg" class="tri">
            <div class="icon top-icon" onclick="userChoice('rock')">
                <img src="path/to/icons/rock.png" alt="Rock">
            </div>
            <div class="icon left-icon" onclick="userChoice('scissors')">
                <img src="path/to/icons/scissors.png" alt="Scissors">
            </div>
            <div class="icon right-icon" onclick="userChoice('paper')">
                <img src="path/to/icons/paper.png" alt="Paper">
            </div>
        </div>
    `;

    triangle.style.display = 'flex';
    triangle.style.opacity = 1;
    triangle.style.transition = 'opacity 0.5s';
}

// Rules Modal
rulesButton.addEventListener('click', () => {
    rulesModal.classList.add('active'); // Show modal with 'active' class
});

closeRulesButton.addEventListener('click', () => {
    rulesModal.classList.remove('active'); // Hide modal by removing 'active' class
});

