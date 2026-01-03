let score = 0;
let level = 1;
let timeLeft = 30;
let gameOver = false;

const target = document.getElementById("target");
const gameArea = document.getElementById("game-area");

const scoreEl = document.getElementById("score");
const levelEl = document.getElementById("level");
const timeEl = document.getElementById("time");
const highEl = document.getElementById("high");
const gameOverScreen = document.getElementById("game-over");
const finalScoreEl = document.getElementById("final-score");

let highScore = localStorage.getItem("highScore") || 0;
highEl.textContent = highScore;

function moveTarget() {
  const maxX = gameArea.clientWidth - 80;
  const maxY = gameArea.clientHeight - 80;

  target.style.left = Math.random() * maxX + "px";
  target.style.top = Math.random() * maxY + "px";
}

target.addEventListener("click", (e) => {
  e.stopPropagation();
  if (gameOver) return;

  score++;
  level = Math.floor(score / 5) + 1;
  updateUI();
  moveTarget();
});

function updateUI() {
  scoreEl.textContent = score;
  levelEl.textContent = level;
  timeEl.textContent = timeLeft;
}

function endGame() {
  gameOver = true;
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
  gameOver = false;

  gameOverScreen.classList.add("hidden");
  target.style.display = "block";
  updateUI();
  moveTarget();
}

setInterval(() => {
  if (!gameOver && timeLeft > 0) {
    timeLeft--;
    updateUI();
    if (timeLeft === 0) endGame();
  }
}, 1000);

updateUI();
setTimeout(moveTarget, 300);