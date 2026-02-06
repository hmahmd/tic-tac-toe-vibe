let boxes = document.querySelectorAll(".box");
let result = document.querySelector(".result");
let resetGame = document.querySelector("#reset-game");
let turn0 = true;

let winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText !== "") return;
    if (turn0) {
      box.innerHTML = "0";
      box.classList.add("dark");
      box.classList.remove("light");
      turn0 = false;
    } else {
      box.innerHTML = "X";
      box.classList.add("light");
      box.classList.remove("dark");
      turn0 = true;
    }

    box.disabled = true;
    checkWinners();
  });
});

let disabledBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

let enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("dark");
    box.classList.remove("light");
  }
};

const checkWinners = () => {
  let winner = false;

  for (let patterns of winningPatterns) {
    let pos1Val = boxes[patterns[0]].innerText;
    let pos2Val = boxes[patterns[1]].innerText;
    let pos3Val = boxes[patterns[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        result.innerText = `🎉 Congratulations! Winner is: ${pos1Val} 🎉`;
        result.classList.add("show");
        disabledBoxes();
        winner = true;
        return;
      }
    }
  }

  let allFilled = true;
  for (let box of boxes) {
    if (box.innerText === "") {
      allFilled = false;
    }
  }

  if (allFilled && !winner) {
    result.innerText = "🤝 It's a Draw! 🤝";
    result.classList.add("show");
  }
};

const resetGameFunc = () => {
  turn0 = true;
  enableBoxes();
  result.innerText = "";
  result.classList.remove("show");
};

resetGame.addEventListener("click", resetGameFunc);
