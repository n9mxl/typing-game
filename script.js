const words = ["apple", "banana", "cat", "dog", "hello", "game", "code"];

const game = document.getElementById("game");
const input = document.getElementById("input");
const scoreEl = document.getElementById("score");
const hpEl = document.getElementById("hp");

let fallingWords = [];
let score = 0;
let hp = 5;

// 단어 생성
function createWord() {
  const text = words[Math.floor(Math.random() * words.length)];

  const el = document.createElement("div");
  el.classList.add("word");
  el.textContent = text;

  el.style.left = Math.random() * 350 + "px";
  el.style.top = "0px";

  game.appendChild(el);

  fallingWords.push({
    text,
    el,
    y: 0
  });
}

// 단어 이동
function update() {
  for (let i = fallingWords.length - 1; i >= 0; i--) {
    const w = fallingWords[i];
    w.y += 2;
    w.el.style.top = w.y + "px";

    if (w.y > 480) {
      game.removeChild(w.el);
      fallingWords.splice(i, 1);
      hp--;
      hpEl.textContent = hp;

      if (hp <= 0) {
        alert("게임 오버!");
        location.reload();
      }
    }
  }
}

// 입력 처리
input.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    const value = input.value.trim();

    for (let i = 0; i < fallingWords.length; i++) {
      if (fallingWords[i].text === value) {
        game.removeChild(fallingWords[i].el);
        fallingWords.splice(i, 1);
        score++;
        scoreEl.textContent = score;
        break;
      }
    }

    input.value = "";
  }
});

// 게임 루프
setInterval(update, 30);
setInterval(createWord, 1500);
