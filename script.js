let colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange'];
let correctColor;
let reactionStartTime;
let score = 0;
let gameOver = false;

const colorDisplay = document.getElementById('colorDisplay');
const prompt = document.getElementById('prompt');
const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const reactionTimeDisplay = document.getElementById('reactionTime');
const scoreDisplay = document.getElementById('score');
const restartButton = document.getElementById('restartButton');

// Start the game
function startGame() {
  if (gameOver) return;
  score = 0;
  updateScore();
  nextRound();
}

// Show the next round
function nextRound() {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  correctColor = colors[Math.floor(Math.random() * colors.length)];
  
  colorDisplay.style.backgroundColor = randomColor;
  prompt.textContent = `Click ${correctColor}`;
  
  // Set up buttons
  button1.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
  button2.style.backgroundColor = correctColor;

  // Start the timer
  reactionStartTime = new Date().getTime();

  // Enable buttons
  button1.disabled = false;
  button2.disabled = false;

  // Set click event listeners
  button1.onclick = () => checkAnswer(button1.style.backgroundColor);
  button2.onclick = () => checkAnswer(button2.style.backgroundColor);
}

// Check if the answer is correct
function checkAnswer(clickedColor) {
  const reactionTime = new Date().getTime() - reactionStartTime;
  reactionTimeDisplay.textContent = `Reaction Time: ${reactionTime}ms`;

  if (clickedColor === correctColor) {
    score++;
    updateScore();
    if (score < 10) {
      setTimeout(nextRound, 1000); // Next round after 1 second
    } else {
      endGame();
    }
  } else {
    endGame();
  }
}

// Update score
function updateScore() {
  scoreDisplay.textContent = `Score: ${score}`;
}

// End the game
function endGame() {
  gameOver = true;
  prompt.textContent = "Game Over!";
  button1.disabled = true;
  button2.disabled = true;
  restartButton.style.display = "inline-block";
}

// Restart the game
restartButton.onclick = () => {
  gameOver = false;
  restartButton.style.display = "none";
  startGame();
};

// Start the game when the page loads
window.onload = startGame;
