// export function createBoard(boardEl) {
//   boardEl.innerHTML = "";
//   for (let y = 0; y < 10; y++) {
//     for (let x = 0; x < 10; x++) {
//       const cell = document.createElement("div");
//       cell.classList.add("cell");
//       cell.dataset.x = x;
//       cell.dataset.y = y;
//       boardEl.appendChild(cell);
//     }
//   }
// }

// // update hit/miss visually
// // export function updateAttackCellOnBoard(board, x, y, status) {
// //   let boardEl = board === "player" ? document.querySelector(".player-board") : document.querySelector(".computer-board");
// //   const cell = boardEl.querySelector(`.cell[data-x='${x}'][data-y='${y}']`);
// //   if (!cell) return;
// //   if (status === "hit") cell.classList.add("hit");
// //   else if (status === "miss") cell.classList.add("miss");
// // }

// export function updateAttackCellOnBoard(boardType, x, y, result) {
//   const boardEl =
//     boardType === "player"
//       ? document.querySelector(".player-board")
//       : document.querySelector(".computer-board");

//   const cell = boardEl.querySelector(`.cell[data-x='${x}'][data-y='${y}']`);
//   if (!cell) return;

//   // Remove all possible classes first
//   cell.classList.remove("hit", "miss", "player-hit");

//   if (boardType === "player") {
//     if (result === "hit") cell.classList.add("hit"); // hit on player's ship
//     else if (result === "miss") cell.classList.add("miss");
//   } else {
//     if (result === "hit") cell.classList.add("hit"); // hit on computer ship
//     else if (result === "miss") cell.classList.add("miss");
//   }
// }

// dom.js
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
  const boardEl =
    boardType === "player"
      ? document.querySelector(".player-board")
      : document.querySelector(".computer-board");

  const cell = boardEl.querySelector(`.cell[data-x='${x}'][data-y='${y}']`);
  if (!cell) return;

  cell.classList.remove("hit", "miss", "player-hit");

  if (result === "hit") cell.classList.add("hit");
  else if (result === "miss") cell.classList.add("miss");
}