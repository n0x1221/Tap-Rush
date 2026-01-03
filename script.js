let score = 0;
let timeLeft = 30;

const target = document.getElementById("target");
const gameArea = document.getElementById("game-area");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");

function moveTarget() {
  const maxX = gameArea.clientWidth - 80;
  const maxY = gameArea.clientHeight - 80;

  target.style.left = Math.random() * maxX + "px";
  target.style.top = Math.random() * maxY + "px";
}

target.addEventListener("click", () => {
  score++;
  scoreEl.textContent = score;
  moveTarget();
});

setInterval(() => {
  if (timeLeft > 0) {
    timeLeft--;
    timeEl.textContent = timeLeft;
  }
}, 1000);

moveTarget();