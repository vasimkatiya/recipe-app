export function createBoard(boardEl) {
  boardEl.innerHTML = "";
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.x = x;
      cell.dataset.y = y;
      boardEl.appendChild(cell);
    }
  }
}

export function updateAttackCellOnBoard(boardType, x, y, result) {
  const boardEl = document.querySelector(`.${boardType}-board`);
  if (!boardEl) return;

  const cell = boardEl.querySelector(`.cell[data-x='${x}'][data-y='${y}']`);
  if (!cell) return;

  cell.classList.remove("hit", "miss", "ship");

  if (result === "hit") {
    cell.classList.add("hit");
    cell.innerHTML = "💥";
  } else if (result === "miss") {
    cell.classList.add("miss");
    cell.innerHTML = "•";
  }
}

export function disableAllCells() {
  document.querySelectorAll(".cell").forEach(c => {
    c.style.pointerEvents = "none";
  });
}

export function enableAllCells(boardType, handler) {
  const boardEl = document.querySelector(`.${boardType}-board`);
  if (!boardEl) return;

  boardEl.querySelectorAll(".cell").forEach(c => {
    c.style.pointerEvents = "auto";
    if (handler) {
      c.removeEventListener("click", handler);
      c.addEventListener("click", handler);
    }
  });
}

export function showMessage(message) {
  const msgEl = document.querySelector(".msg");
  if (msgEl) {
    msgEl.textContent = message;
    if (message.includes("wins") || message.includes("🎉") || message.includes("💻")) {
      msgEl.classList.add("win-message");
    } else {
      msgEl.classList.remove("win-message");
    }
  }
}