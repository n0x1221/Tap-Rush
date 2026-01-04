let score = 0;
let level = 1;
let timeLeft = 30;
let gameOver = false;

const target = document.getElementById("target");
const gameArea = document.getElementById("game-area");
const scoreEl = document.getElementById("score");
const levelEl = document.getElementById("level");
const timeEl = document.getElementById("time");
const gameOverScreen = document.getElementById("game-over");
const finalScoreEl = document.getElementById("final-score");
const restartBtn = document.getElementById("restart-btn");

function moveTarget() {
  const maxX = gameArea.clientWidth - 70;
  const maxY = gameArea.clientHeight - 70;
  target.style.left = Math.random() * maxX + "px";
  target.style.top = Math.random() * maxY + "px";
}

target.addEventListener("click", (e) => {
  e.stopPropagation();
  if (gameOver) return;

  score++;
  level = Math.floor(score / 5) + 1;

  scoreEl.textContent = score;
  levelEl.textContent = level;

  moveTarget();
});

function endGame() {
  gameOver = true;
  target.style.display = "none";
  finalScoreEl.textContent = score;
  gameOverScreen.classList.remove("hidden");
}

function restartGame() {
  score = 0;
  level = 1;
  timeLeft = 30;
  gameOver = false;

  scoreEl.textContent = score;
  levelEl.textContent = level;
  timeEl.textContent = timeLeft;

  gameOverScreen.classList.add("hidden");
  target.style.display = "block";
  moveTarget();
}

restartBtn.addEventListener("click", restartGame);

setInterval(() => {
  if (!gameOver) {
    timeLeft--;
    timeEl.textContent = timeLeft;
    if (timeLeft <= 0) endGame();
  }
}, 1000);

// Start
moveTarget();