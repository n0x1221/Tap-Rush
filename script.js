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

function moveTarget() {
  const maxX = gameArea.clientWidth - 80;
  const maxY = gameArea.clientHeight - 80;

  target.style.left = Math.random() * maxX + "px";
  target.style.top = Math.random() * maxY + "px";
}

target.addEventListener("click", () => {
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
  gameOverScreen.style.display = "flex";
  finalScoreEl.textContent = score;
}

function restartGame() {
  score = 0;
  level = 1;
  timeLeft = 30;
  gameOver = false;

  scoreEl.textContent = score;
  levelEl.textContent = level;
  timeEl.textContent = timeLeft;

  gameOverScreen.style.display = "none";
  target.style.display = "block";
  moveTarget();
}

// Timer countdown
setInterval(() => {
  if (!gameOver) {
    if (timeLeft > 0) {
      timeLeft--;
      timeEl.textContent = timeLeft;
    } else {
      endGame();
    }
  }
}, 1000);

// Initial target placement
moveTarget();