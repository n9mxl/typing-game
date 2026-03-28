const words = [
  "좀비", "도망", "공격", "체력", "보스", "위험", "탈출",
  "레벨업", "크리티컬", "스킬", "아이템", "던전", "마법",
  "급식", "시험", "지각", "선생님", "잠", "야자",
  "번개", "폭발", "궁극기", "대마법", "방어", "회피"
];

const game = document.getElementById("game");
const input = document.getElementById("input");
const scoreEl = document.getElementById("score");
const hpEl = document.getElementById("hp");

let fallingWords = [];
let score = 0;
let hp = 5;
let speed = 2; // 시작 속도

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

    w.y += speed;

    if (speed > 10) speed = 10; // 최대 속도 제한

    w.el.style.top = w.y + "px";

    if (w.y > 480) {
      game.removeChild(w.el);
      fallingWords.splice(i, 1);
      hp--;
      hpEl.textContent = hp;

      if (hp <= 0) {
        alert("💀 게임 오버!");
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

        speed += 0.2; // 맞출 때마다 빨라짐
        break;
      }
    }

    input.value = "";
  }
});

// 게임 루프
setInterval(update, 30);
setInterval(createWord, 1500);

// 시간 지나면 점점 빨라짐
setInterval(() => {
  speed += 0.1;
}, 3000);
