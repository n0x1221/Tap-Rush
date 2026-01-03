let score = 0;
let level = 1;
let timeLeft = 30;
let lives = 3;
let gameOver = false;
let gameStarted = false;

const target = document.getElementById("target");
const gameArea = document.getElementById("game-area");

const scoreEl = document.getElementById("score");
const levelEl = document.getElementById("level");
const timeEl = document.getElementById("time");
const livesEl = document.getElementById("lives");
const highEl = document.getElementById("high");
const gameOverScreen = document.getElementById("game-over");
const finalScoreEl = document.getElementById("final-score");

let highScore = localStorage.getItem("highScore") || 0;
highEl.textContent = highScore;

function moveTarget() {
  const maxX = gameArea.clientWidth - 80;
  const maxY = gameArea.clientHeight - 80;

  if (maxX <= 0 || maxY <= 0) return;

  target.style.left = Math.random() * maxX + "px";
  target.style.top = Math.random() * maxY + "px";
}

target.addEventListener("click", (e) => {
  e.stopPropagation();
  if (gameOver || !gameStarted) return;

  score++;
  level = Math.floor(score / 5) + 1;
  updateUI();
  moveTarget();
});

gameArea.addEventListener("click", () => {
  if (!gameStarted || gameOver) return;

  lives--;
  updateUI();
  if (lives <= 0) endGame();
});

function updateUI() {
  scoreEl.textContent = score;
  levelEl.textContent = level;
  timeEl.textContent = timeLeft;
  livesEl.textContent = lives;
}

function endGame() {
  gameOver = true;
  gameStarted = false;
  target.style.display = "none";
  gameOverScreen.classList.remove("hidden");

  finalScoreEl.textContent = score;

  if (score > highScore) {
    localStorage.setItem("highScore", score);
    highEl.textContent = score;
  }
}

function restartGame() {
  score = 0;
  level = 1;
  timeLeft = 30;
  lives = 3;
  gameOver = false;
  gameStarted = false;

  gameOverScreen.classList.add("hidden");
  target.style.display = "block";
  updateUI();

  setTimeout(() => {
    gameStarted = true;
    moveTarget();
  }, 300);
}

setInterval(() => {
  if (!gameOver && gameStarted && timeLeft > 0) {
    timeLeft--;
    updateUI();
    if (timeLeft === 0) endGame();
  }
}, 1000);

updateUI();

setTimeout(() => {
  gameStarted = true;
  moveTarget();
}, 300);
