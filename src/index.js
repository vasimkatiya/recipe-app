

// import { createBoard } from "./dom";
// import { GameController } from "./gameController";
// import "./styles/index.css";

// const playerEl = document.querySelector(".player-board");
// const compEl = document.querySelector(".computer-board");
// const msg = document.querySelector(".msg");
// const startBtn = document.querySelector(".start");
// const placeChoice = document.querySelector(".place-option");
// const manualBtn = placeChoice.querySelector(".manual");
// const autoBtn = placeChoice.querySelector(".auto");
// const rotateBtn  = document.querySelector(".rotate");

// createBoard(playerEl);
// createBoard(compEl);

// const game = new GameController();
// let currentShipIndex = 0;
// let isHorizontal = true;
// let GameStarted = false;
// // ✅ AUTO PLACEMENT
// autoBtn.addEventListener("click", () => {
//   game.player.gameBoard.autoPlaceShips();
//   game.computer.gameBoard.autoPlaceShips();
//   renderBoard(playerEl, game.player.gameBoard);
//   renderBoard(compEl, game.computer.gameBoard);
//   msg.textContent = "Ships placed automatically! Click Start to play.";
//   startBtn.style.display = "inline";
//   placeChoice.style.display = "none";
// });

// // ✅ MANUAL PLACEMENT
// manualBtn.addEventListener("click", () => {
//     placeChoice.style.display = "none";
//     msg.textContent = `Place your ${game.player.gameBoard.ships[currentShipIndex].name} (${game.player.gameBoard.ships[currentShipIndex].length})`;
//     renderBoard(playerEl, game.player.gameBoard);
//     setupManualPlacement();
//     game.computer.gameBoard.autoPlaceShips();
//     renderBoard(compEl, game.computer.gameBoard);
// });

// // // ✅ ROTATE SHIP WITH "R" KEY
// // document.addEventListener("keydown", (e) => {
// //   if (e.key.toLowerCase() === "r") {
// //     isHorizontal = !isHorizontal;
// //     msg.textContent = `Rotation: ${isHorizontal ? "Horizontal" : "Vertical"}`;
// //   }
// // });

// // ✅ Render function
// function renderBoard(boardEl, gameBoard, hideShips = false) {
//   boardEl.innerHTML = "";
//   for (let y = 0; y < gameBoard.size; y++) {
//     for (let x = 0; x < gameBoard.size; x++) {
//       const cell = document.createElement("div");
//       cell.classList.add("cell");
//       cell.dataset.x = x;
//       cell.dataset.y = y;

//       const val = gameBoard.board[y][x];
//       if (val !== null && !hideShips) cell.classList.add("ship");

//       boardEl.appendChild(cell);
//     }
//   }
// }

// // ✅ Manual Placement Setup
// function setupManualPlacement() {
//   renderBoard(playerEl,game.player.gameBoard);
//   const ship = game.player.gameBoard.ships[currentShipIndex]
//   msg.textContent = `Place your ${game.player.gameBoard.ships[currentShipIndex].name} (${game.player.gameBoard.ships[currentShipIndex].length})`;

    
//         rotateBtn.addEventListener("click",()=>{
//             isHorizontal = !isHorizontal;
//              msg.textContent = `Placing ${ship.name} (${ship.length}) - ${isHorizontal ? "Horizontal" : "Vertical"}`;

//         })
    

//   const cells = playerEl.querySelectorAll(".cell");
//   cells.forEach((cell) => cell.addEventListener("click", handleManualPlace));
// }

// startBtn.addEventListener("click",()=>{
//     GameStarted = true;
//     msg.textContent = "Game start ! , attack the computers board !!!";
//     startBtn.style.display = "none";

//     compEl.querySelectorAll(".cell").forEach((c)=>c.style.pointerEvents = "auto");
// })

// // ✅ Handle Manual Ship Placement
// function handleManualPlace(e) {
//   const x = Number(e.target.dataset.x);
//   const y = Number(e.target.dataset.y);
//   const ship = game.player.gameBoard.ships[currentShipIndex];

//   const placed = game.player.gameBoard.placeShips(ship, x, y, isHorizontal);

//   if (placed) {
//     renderBoard(playerEl, game.player.gameBoard);
//     removeManualListeners();
//     currentShipIndex++;

//     if (currentShipIndex < game.player.gameBoard.ships.length) {
//       msg.textContent = `Place your ${game.player.gameBoard.ships[currentShipIndex].name} (${game.player.gameBoard.ships[currentShipIndex].length})`;
//       setupManualPlacement();
//     } else {
//       msg.textContent = "✅ All ships placed! Click Start to begin.";
//       startBtn.style.display = "inline";
//     //   removeManualListeners();
//     }
//   } else {
//     msg.textContent = "❌ Invalid position, try again.";
//   }
// }

// // ✅ Cleanup listeners when done
// function removeManualListeners() {
//   const cells = playerEl.querySelectorAll(".cell");
//   cells.forEach((cell) =>
//     cell.removeEventListener("click", handleManualPlace)
//   );
// }

// /// attack hit or miss using dom verification.


// const playerCells = playerEl.querySelectorAll(".cell");
// const compCells = compEl.querySelectorAll(".cell");

// function computerAttack()
// {
//     const [x,y]  = game.computer.randomAttack(game.player.gameBoard);
//     const cell = playerEl.querySelector(`.cell[data-x = '${x}'][data-y = '${y}']`);

//     const val = game.player.gameBoard.board[y][x];

//     if(val === "hit")
//     {
//         cell.classList.add("hit");
//         msg.textContent = `computer hit player ships at ${x} , ${y}`;
//     }else if(val === "miss")
//     {
//         cell.classList.add("miss");
//         msg.textContent = "computer missed attack !";
//     }
//     cell.style.pointerEvents = "none";

//     if(game.player.gameBoard.areAllSunk()){
//         msg.textContent = "computer wins !";
//         disableAllCells();
//         return;
//     }
// }

// compCells.forEach((cell) => {
//   cell.addEventListener("click", (e) => {
//     if (!GameStarted || game.gameOver) return;

//     const x = Number(e.target.dataset.x);
//     const y = Number(e.target.dataset.y);

//     const res = game.PlayerTurn(x, y);

//     // Update clicked cell visually
//     const val = game.computer.gameBoard.board[y][x];
//     if(val === "hit") cell.classList.add("hit");
//     else if(val === "miss") cell.classList.add("miss");

//     e.target.style.pointerEvents = "none";

//     // Display messages
//     if(res === "win") msg.textContent = "Player wins!";
//     else if(res === "hit") msg.textContent = "Player hit computer's ship!";
//     else if(res === "miss") msg.textContent = "Player missed!";

//     if(game.gameOver){
//       disableAllCells();
//       return;
//     }

//     // Computer turn if player missed
//     if(res === "miss") setTimeout(() => {
//       game.computerTurn();
//       renderBoard(playerEl, game.player.gameBoard); // show computer hits
//     }, 800);
//   });
// });

// function disableAllCells() {
//   playerEl.querySelectorAll(".cell").forEach(c => c.style.pointerEvents = "none");
//   compEl.querySelectorAll(".cell").forEach(c => c.style.pointerEvents = "none");
// }

// import { createBoard } from "./dom";
// import { GameController } from "./gameController";
// import "./styles/index.css";

// const playerEl = document.querySelector(".player-board");
// const compEl = document.querySelector(".computer-board");
// const msg = document.querySelector(".msg");
// const startBtn = document.querySelector(".start");
// const placeChoice = document.querySelector(".place-option");
// const manualBtn = placeChoice.querySelector(".manual");
// const autoBtn = placeChoice.querySelector(".auto");
// const rotateBtn  = document.querySelector(".rotate");

// const createBoard = (boardEL) =>{

//     boardEL.innerHTML = "";

// for (let y = 0; y < 10; y++) {
//   for (let x = 0; x < 10; x++) {
//     const cell = document.createElement("div");
//     cell.classList.add("cell");
//     cell.dataset.x = x;
//     cell.dataset.y = y;
//     boardEL.appendChild(cell);
//   }
// }
// }


// createBoard(playerEl);
// createBoard(compEl);

// const game = new GameController();
// let currentShipIndex = 0;
// let isHorizontal = true;
// let GameStarted = false;

// // ✅ Disable computer board until game starts
// compEl.querySelectorAll(".cell").forEach(c => c.style.pointerEvents = "none");

// // ✅ AUTO PLACEMENT
// autoBtn.addEventListener("click", () => {
//   game.player.gameBoard.autoPlaceShips();
//   game.computer.gameBoard.autoPlaceShips();
//   renderBoard(playerEl, game.player.gameBoard);
//   renderBoard(compEl, game.computer.gameBoard);
//   msg.textContent = "Ships placed automatically! Click Start to play.";
//   startBtn.style.display = "inline";
//   placeChoice.style.display = "none";
// });

// // ✅ MANUAL PLACEMENT
// manualBtn.addEventListener("click", () => {
//   placeChoice.style.display = "none";
//   renderBoard(playerEl, game.player.gameBoard);
//   setupManualPlacement();
//   game.computer.gameBoard.autoPlaceShips();
//   renderBoard(compEl, game.computer.gameBoard);
// });

// // ✅ ROTATE SHIP
// rotateBtn.addEventListener("click", () => {
//   isHorizontal = !isHorizontal;
//   if (currentShipIndex < game.player.gameBoard.ships.length) {
//     const ship = game.player.gameBoard.ships[currentShipIndex];
//     msg.textContent = `Placing ${ship.name} (${ship.length}) - ${isHorizontal ? "Horizontal" : "Vertical"}`;
//   }
// });

// // ✅ Render board function
// function renderBoard(boardEl, gameBoard, hideShips = false) {
//   boardEl.innerHTML = "";
//   for (let y = 0; y < gameBoard.size; y++) {
//     for (let x = 0; x < gameBoard.size; x++) {
//       const cell = document.createElement("div");
//       cell.classList.add("cell");
//       cell.dataset.x = x;
//       cell.dataset.y = y;

//       const val = gameBoard.board[y][x];
//       if (val !== null && !hideShips) cell.classList.add("ship");

//       boardEl.appendChild(cell);
//     }
//   }
// }

// // ✅ Manual Placement Setup
// function setupManualPlacement() {
//   const ship = game.player.gameBoard.ships[currentShipIndex];
//   msg.textContent = `Place your ${ship.name} (${ship.length})`;

//   const cells = playerEl.querySelectorAll(".cell");
//   cells.forEach(cell => cell.addEventListener("click", handleManualPlace));
// }

// // ✅ Handle Manual Ship Placement
// function handleManualPlace(e) {
//   const x = Number(e.target.dataset.x);
//   const y = Number(e.target.dataset.y);
//   const ship = game.player.gameBoard.ships[currentShipIndex];

//   const placed = game.player.gameBoard.placeShips(ship, x, y, isHorizontal);

//   if (placed) {
//     renderBoard(playerEl, game.player.gameBoard);
//     removeManualListeners();
//     currentShipIndex++;

//     if (currentShipIndex < game.player.gameBoard.ships.length) {
//       setupManualPlacement();
//     } else {
//       msg.textContent = "✅ All ships placed! Click Start to begin.";
//       startBtn.style.display = "inline";
//     }
//   } else {
//     msg.textContent = "❌ Invalid position, try again.";
//   }
// }

// // ✅ Remove manual listeners
// function removeManualListeners() {
//   const cells = playerEl.querySelectorAll(".cell");
//   cells.forEach(cell => cell.removeEventListener("click", handleManualPlace));
// }

// // ✅ Start game button
// startBtn.addEventListener("click", () => {
//   GameStarted = true;
//   msg.textContent = "Game started! Attack the computer's board!";
//   startBtn.style.display = "none";

//   compEl.querySelectorAll(".cell").forEach(c => c.style.pointerEvents = "auto");
// });

// // ✅ Player attacks computer
// compEl.querySelectorAll(".cell").forEach(cell => {
//   cell.addEventListener("click", e => {
//     if (!GameStarted || game.gameOver) return;

//     const x = Number(e.target.dataset.x);
//     const y = Number(e.target.dataset.y);

//     const res = game.PlayerTurn(x, y);

//     // Update clicked cell visually
//     const val = game.computer.gameBoard.board[y][x];
//     if (val === "hit") cell.classList.add("hit");
//     else if (val === "miss") cell.classList.add("miss");

//     e.target.style.pointerEvents = "none";

//     // Display messages
//     if (res === "win") msg.textContent = "Player wins!";
//     else if (res === "hit") msg.textContent = "Player hit computer's ship!";
//     else if (res === "miss") msg.textContent = "Player missed!";

//     if (game.gameOver) {
//       disableAllCells();
//       return;
//     }

//     // Computer turn if player missed
//     if (res === "miss") setTimeout(() => {
//       game.computerTurn();
//       renderBoard(playerEl, game.player.gameBoard); // show computer hits
//       if (game.gameOver) disableAllCells();
//     }, 800);
//   });
// });

// // ✅ Disable all cells on game over
// function disableAllCells() {
//   playerEl.querySelectorAll(".cell").forEach(c => c.style.pointerEvents = "none");
//   compEl.querySelectorAll(".cell").forEach(c => c.style.pointerEvents = "none");
// }


// import { GameController } from "./gameController.js";
// import "./styles/index.css";

// const playerEl = document.querySelector(".player-board");
// const compEl = document.querySelector(".computer-board");
// const msg = document.querySelector(".msg");
// const startBtn = document.querySelector(".start");
// const placeChoice = document.querySelector(".place-option");
// const manualBtn = placeChoice.querySelector(".manual");
// const autoBtn = placeChoice.querySelector(".auto");
// const rotateBtn = document.querySelector(".rotate");

// const game = new GameController();
// let currentShipIndex = 0;
// let isHorizontal = true;
// let GameStarted = false;

// // ✅ Create empty 10x10 board
// function createBoard(boardEl) {
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

// createBoard(playerEl);
// createBoard(compEl);
// disableAllCells(); // disable computer clicks initially

// // ✅ Render board state
// function renderBoard(boardEl, gameBoard, hideShips = false) {
//   boardEl.innerHTML = "";
//   for (let y = 0; y < gameBoard.size; y++) {
//     for (let x = 0; x < gameBoard.size; x++) {
//       const cell = document.createElement("div");
//       cell.classList.add("cell");
//       cell.dataset.x = x;
//       cell.dataset.y = y;

//       const val = gameBoard.board[y][x];
//       if (val !== null && !hideShips) cell.classList.add("ship");

//       // Keep pointer events off if board disabled
//       if (boardEl === compEl && !GameStarted) {
//         cell.style.pointerEvents = "none";
//       }

//       boardEl.appendChild(cell);
//     }
//   }
// }

// // ✅ AUTO PLACEMENT
// autoBtn.addEventListener("click", () => {
//   game.player.gameBoard.autoPlaceShips();
//   game.computer.gameBoard.autoPlaceShips();
//   renderBoard(playerEl, game.player.gameBoard);
//   renderBoard(compEl, game.computer.gameBoard, true);
//   msg.textContent = "Ships placed automatically! Click Start to play.";
//   startBtn.style.display = "inline";
//   placeChoice.style.display = "none";
// });

// // ✅ MANUAL PLACEMENT
// manualBtn.addEventListener("click", () => {
//   placeChoice.style.display = "none";
//   renderBoard(playerEl, game.player.gameBoard);
//   setupManualPlacement();
//   game.computer.gameBoard.autoPlaceShips();
//   renderBoard(compEl, game.computer.gameBoard, true);
// });

// // ✅ Rotate ship
// rotateBtn.addEventListener("click", () => {
//   isHorizontal = !isHorizontal;
//   if (currentShipIndex < game.player.gameBoard.ships.length) {
//     const ship = game.player.gameBoard.ships[currentShipIndex];
//     msg.textContent = `Placing ${ship.name} (${ship.length}) - ${isHorizontal ? "Horizontal" : "Vertical"}`;
//   }
// });

// // ✅ Manual Placement Setup
// function setupManualPlacement() {
//   const ship = game.player.gameBoard.ships[currentShipIndex];
//   msg.textContent = `Place your ${ship.name} (${ship.length})`;
//   const cells = playerEl.querySelectorAll(".cell");
//   cells.forEach(cell => cell.addEventListener("click", handleManualPlace));
// }

// // ✅ Handle Manual Ship Placement
// function handleManualPlace(e) {
//   const x = Number(e.target.dataset.x);
//   const y = Number(e.target.dataset.y);
//   const ship = game.player.gameBoard.ships[currentShipIndex];
//   const placed = game.player.gameBoard.placeShips(ship, x, y, isHorizontal);

//   if (placed) {
//     renderBoard(playerEl, game.player.gameBoard);
//     removeManualListeners();
//     currentShipIndex++;

//     if (currentShipIndex < game.player.gameBoard.ships.length) {
//       setupManualPlacement();
//     } else {
//       msg.textContent = "✅ All ships placed! Click Start to begin.";
//       startBtn.style.display = "inline";
//     }
//   } else {
//     msg.textContent = "❌ Invalid position, try again.";
//   }
// }

// function removeManualListeners() {
//   const cells = playerEl.querySelectorAll(".cell");
//   cells.forEach(c => c.removeEventListener("click", handleManualPlace));
// }

// // ✅ Start game
// startBtn.addEventListener("click", () => {
//   GameStarted = true;
//   msg.textContent = "Game started! Attack the computer's board!";
//   startBtn.style.display = "none";

//   // Re-render computer board and enable clicks
//   renderBoard(compEl, game.computer.gameBoard, true);
//   enableComputerClicks();
// });

// // ✅ Enable computer board clicks
// function enableComputerClicks() {
//   const cells = compEl.querySelectorAll(".cell");
//   cells.forEach(cell => {
//     cell.style.pointerEvents = "auto";
//     cell.addEventListener("click", handlePlayerAttack);
//   });
// }

// // ✅ Player attacks computer
// function handlePlayerAttack(e) {
//   if (!GameStarted || game.gameOver) return;

//   const x = Number(e.target.dataset.x);
//   const y = Number(e.target.dataset.y);

//   const res = game.PlayerTurn(x, y);
//   const val = game.computer.gameBoard.board[y][x];

//   if (val === "hit") e.target.classList.add("hit");
//   else if (val === "miss") e.target.classList.add("miss");

//   e.target.style.pointerEvents = "none";

//   if (res === "win") {
//     msg.textContent = "🎉 Player wins!";
//     disableAllCells();
//     return;
//   } else if (res === "hit") msg.textContent = "🔥 Player hit!";
//   else msg.textContent = "💨 Player missed!";

//   if (!game.gameOver && res === "miss") {
//     setTimeout(() => {
//       game.computerTurn();
//       renderBoard(playerEl, game.player.gameBoard);
//       if (game.gameOver) {
//         msg.textContent = "💻 Computer wins!";
//         disableAllCells();
//       }
//     }, 800);
//   }
// }

// // ✅ Disable all clicks
// function disableAllCells() {
//   playerEl.querySelectorAll(".cell").forEach(c => c.style.pointerEvents = "none");
//   compEl.querySelectorAll(".cell").forEach(c => c.style.pointerEvents = "none");
// }


// index.js
// import { GameController } from "./gameController.js";
// import "./styles/index.css";
// import { updateAttackCellOnBoard } from "./dom.js";

// const playerEl = document.querySelector(".player-board");
// const compEl = document.querySelector(".computer-board");
// const msg = document.querySelector(".msg");
// const startBtn = document.querySelector(".start");
// const placeChoice = document.querySelector(".place-option");
// const manualBtn = placeChoice.querySelector(".manual");
// const autoBtn = placeChoice.querySelector(".auto");
// const rotateBtn = document.querySelector(".rotate");

// const game = new GameController();
// let currentShipIndex = 0;
// let isHorizontal = true;
// let GameStarted = false;

// // create empty grid
// function createBoard(boardEl) {
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

// createBoard(playerEl);
// createBoard(compEl);
// disableAllCells();

// // render a gameBoard state into a DOM board (hideShips hides ships for opponent)
// function renderBoard(boardEl, gameBoard, hideShips = false) {
//   boardEl.innerHTML = "";
//   for (let y = 0; y < gameBoard.size; y++) {
//     for (let x = 0; x < gameBoard.size; x++) {
//       const cell = document.createElement("div");
//       cell.classList.add("cell");
//       cell.dataset.x = x;
//       cell.dataset.y = y;

//       const val = gameBoard.board[y][x];
//       if (val !== null && !hideShips) {
//         cell.classList.add("ship");
//       }

//       boardEl.appendChild(cell);
//     }
//   }
// }

// // auto place
// autoBtn.addEventListener("click", () => {
//   game.player.gameBoard.autoPlaceShips();
//   game.computer.gameBoard.autoPlaceShips();
//   renderBoard(playerEl, game.player.gameBoard, false);
//   renderBoard(compEl, game.computer.gameBoard, true);
//   msg.textContent = "Ships placed automatically! Click Start to play.";
//   startBtn.style.display = "inline";
//   placeChoice.style.display = "none";
// });

// // manual placement flow (kept simple)
// manualBtn.addEventListener("click", () => {
//   placeChoice.style.display = "none";
//   renderBoard(playerEl, game.player.gameBoard, false);
//   setupManualPlacement();
//   game.computer.gameBoard.autoPlaceShips();
//   renderBoard(compEl, game.computer.gameBoard, true);
// });

// rotateBtn.addEventListener("click", () => {
//   isHorizontal = !isHorizontal;
//   if (currentShipIndex < game.player.gameBoard.ships.length) {
//     const ship = game.player.gameBoard.ships[currentShipIndex];
//     msg.textContent = `Placing ${ship.name} (${ship.length}) - ${isHorizontal ? "Horizontal" : "Vertical"}`;
//   }
// });

// function setupManualPlacement() {
//   const ship = game.player.gameBoard.ships[currentShipIndex];
//   msg.textContent = `Place your ${ship.name} (${ship.length})`;
//   const cells = playerEl.querySelectorAll(".cell");
//   cells.forEach(cell => cell.addEventListener("click", handleManualPlace));
// }

// function handleManualPlace(e) {
//   const x = Number(e.target.dataset.x);
//   const y = Number(e.target.dataset.y);
//   const ship = game.player.gameBoard.ships[currentShipIndex];
//   const placed = game.player.gameBoard.placeShips(ship, x, y, isHorizontal);

//   if (placed) {
//     renderBoard(playerEl, game.player.gameBoard, false);
//     removeManualListeners();
//     currentShipIndex++;

//     if (currentShipIndex < game.player.gameBoard.ships.length) {
//       setupManualPlacement();
//     } else {
//       msg.textContent = "✅ All ships placed! Click Start to begin.";
//       startBtn.style.display = "inline";
//     }
//   } else {
//     msg.textContent = "❌ Invalid position, try again.";
//   }
// }

// function removeManualListeners() {
//   const cells = playerEl.querySelectorAll(".cell");
//   cells.forEach(c => c.removeEventListener("click", handleManualPlace));
// }

// // Start game
// startBtn.addEventListener("click", () => {
//   GameStarted = true;
//   msg.textContent = "Game started! Attack the computer's board!";
//   startBtn.style.display = "none";

//   // render boards (computer ships hidden)
//   renderBoard(playerEl, game.player.gameBoard, false);
//   renderBoard(compEl, game.computer.gameBoard, true);

//   // enable clicks on comp board (attach event listeners AFTER render)
//   enableComputerClicks();
// });

// // attach listeners to current comp cells (call after every render if re-rendering comp board)
// function enableComputerClicks() {
//   const cells = compEl.querySelectorAll(".cell");
//   cells.forEach(cell => {
//     cell.style.pointerEvents = "auto";
//     // remove existing listener first (avoid duplicate)
//     cell.removeEventListener("click", handlePlayerAttack);
//     cell.addEventListener("click", handlePlayerAttack);
//   });
// }

// function handlePlayerAttack(e) {
//   if (!GameStarted || game.gameOver) return;

//   const x = Number(e.currentTarget.dataset.x);
//   const y = Number(e.currentTarget.dataset.y);

//   const res = game.PlayerTurn(x, y);

//   // update player's view of comp board
//   const val = game.computer.gameBoard.board[y][x];
//   if (val === "hit") updateAttackCellOnBoard("computer", x, y, "hit");
//   else if (val === "miss") updateAttackCellOnBoard("computer", x, y, "miss");

//   e.currentTarget.style.pointerEvents = "none";

//   if (res === "win") {
//     msg.textContent = "🎉 Player wins!";
//     disableAllCells();
//     return;
//   } else if (res === "hit") {
//     msg.textContent = "🔥 Player hit!";
//     // player gets another turn — keep computer board active
//     return;
//   } else if (res === "miss") {
//     msg.textContent = "💨 Player missed!";
//     // computer turn after a short delay
//     setTimeout(() => {
//       // computer will pick coords and attack
//       const compRes = game.computerTurn();

//       // We need to know last coords the computer attacked. Because randomAttack pushed coords to computer.attacks,
//       // the last entry is the coords we just used — but computerTurn used receiveAttack directly.
//       // To get coords: we'll track them by reading computer.attacks's last element.
//       const last = game.computer.attacks[game.computer.attacks.length - 1];
//       if (last) {
//         const [cx, cy] = last;
//         // update player board DOM
//         const val2 = game.player.gameBoard.board[cy][cx];
//         if (val2 === "hit") updateAttackCellOnBoard("player", cx, cy, "hit");
//         else if (val2 === "miss") updateAttackCellOnBoard("player", cx, cy, "miss");
//       }

//       renderBoard(playerEl, game.player.gameBoard, false);

//       if (game.gameOver) {
//         msg.textContent = "💻 Computer wins!";
//         disableAllCells();
//       } else {
//         // re-enable comp clicks (some cells are disabled individually)
//         enableComputerClicks();
//       }
//     }, 700);
//   } else if (res === "already") {
//     // shouldn't happen since UI disables clicked cell, but handle gracefully
//     msg.textContent = "You already attacked this cell!";
//   }
// }

// function disableAllCells() {
//   playerEl.querySelectorAll(".cell").forEach(c => c.style.pointerEvents = "none");
//   compEl.querySelectorAll(".cell").forEach(c => c.style.pointerEvents = "none");
// }


// import { GameController } from "./gameController.js";
// import "./styles/index.css";
// import { updateAttackCellOnBoard } from "./dom.js";

// const playerEl = document.querySelector(".player-board");
// const compEl = document.querySelector(".computer-board");
// const msg = document.querySelector(".msg");
// const startBtn = document.querySelector(".start");
// const placeChoice = document.querySelector(".place-option");
// const manualBtn = placeChoice.querySelector(".manual");
// const autoBtn = placeChoice.querySelector(".auto");
// const rotateBtn = document.querySelector(".rotate");

// const game = new GameController();
// let currentShipIndex = 0;
// let isHorizontal = true;
// let GameStarted = false;

// // create empty grids
// createBoard(playerEl);
// createBoard(compEl);
// disableAllCells();

// // render a board (hideShips hides opponent ships)
// function renderBoard(boardEl, gameBoard, hideShips = false) {
//   boardEl.innerHTML = "";
//   for (let y = 0; y < gameBoard.size; y++) {
//     for (let x = 0; x < gameBoard.size; x++) {
//       const cell = document.createElement("div");
//       cell.classList.add("cell");
//       cell.dataset.x = x;
//       cell.dataset.y = y;

//       const val = gameBoard.board[y][x];
//       if (val !== null && !hideShips) cell.classList.add("ship");

//       boardEl.appendChild(cell);
//     }
//   }
// }

// // ================= AUTO PLACEMENT =================
// autoBtn.addEventListener("click", () => {
//   game.player.gameBoard.autoPlaceShips();
//   game.computer.gameBoard.autoPlaceShips();
//   renderBoard(playerEl, game.player.gameBoard, false);
//   renderBoard(compEl, game.computer.gameBoard, true);
//   msg.textContent = "Ships placed automatically! Click Start to play.";
//   startBtn.style.display = "inline";
//   placeChoice.style.display = "none";
// });

// // ================= MANUAL PLACEMENT =================
// manualBtn.addEventListener("click", () => {
//   placeChoice.style.display = "none";
//   renderBoard(playerEl, game.player.gameBoard, false);
//   setupManualPlacement();
//   game.computer.gameBoard.autoPlaceShips();
//   renderBoard(compEl, game.computer.gameBoard, true);
// });

// // ================= ROTATE SHIP =================
// rotateBtn.addEventListener("click", () => {
//   isHorizontal = !isHorizontal;
//   if (currentShipIndex < game.player.gameBoard.ships.length) {
//     const ship = game.player.gameBoard.ships[currentShipIndex];
//     msg.textContent = `Placing ${ship.name} (${ship.length}) - ${isHorizontal ? "Horizontal" : "Vertical"}`;
//   }
// });

// // ================= MANUAL PLACEMENT HANDLERS =================
// function setupManualPlacement() {
//   const ship = game.player.gameBoard.ships[currentShipIndex];
//   msg.textContent = `Place your ${ship.name} (${ship.length})`;
//   const cells = playerEl.querySelectorAll(".cell");
//   cells.forEach(cell => cell.addEventListener("click", handleManualPlace));
// }

// function handleManualPlace(e) {
//   const x = Number(e.target.dataset.x);
//   const y = Number(e.target.dataset.y);
//   const ship = game.player.gameBoard.ships[currentShipIndex];
//   const placed = game.player.gameBoard.placeShips(ship, x, y, isHorizontal);

//   if (placed) {
//     renderBoard(playerEl, game.player.gameBoard, false);
//     removeManualListeners();
//     currentShipIndex++;

//     if (currentShipIndex < game.player.gameBoard.ships.length) {
//       setupManualPlacement();
//     } else {
//       msg.textContent = "✅ All ships placed! Click Start to begin.";
//       startBtn.style.display = "inline";
//     }
//   } else {
//     msg.textContent = "❌ Invalid position, try again.";
//   }
// }

// function removeManualListeners() {
//   const cells = playerEl.querySelectorAll(".cell");
//   cells.forEach(c => c.removeEventListener("click", handleManualPlace));
// }

// // ================= START GAME =================
// startBtn.addEventListener("click", () => {
//   GameStarted = true;
//   msg.textContent = "Game started! Attack the computer's board!";
//   startBtn.style.display = "none";

//   renderBoard(playerEl, game.player.gameBoard, false);
//   renderBoard(compEl, game.computer.gameBoard, true);

//   enableComputerClicks();
// });

// // enable clicks on computer board
// function enableComputerClicks() {
//   const cells = compEl.querySelectorAll(".cell");
//   cells.forEach(cell => {
//     cell.style.pointerEvents = "auto";
//     cell.removeEventListener("click", handlePlayerAttack);
//     cell.addEventListener("click", handlePlayerAttack);
//   });
// }

// // ================= PLAYER ATTACK =================
// function handlePlayerAttack(e) {
//   if (!GameStarted || game.gameOver) return;

//   const x = Number(e.currentTarget.dataset.x);
//   const y = Number(e.currentTarget.dataset.y);

//   const res = game.PlayerTurn(x, y);
//   const val = game.computer.gameBoard.board[y][x];

//   if (val === "hit") updateAttackCellOnBoard("computer", x, y, "hit");
//   else if (val === "miss") updateAttackCellOnBoard("computer", x, y, "miss");

//   e.currentTarget.style.pointerEvents = "none";

//   if (res === "win") {
//     msg.textContent = "🎉 Player wins!";
//     disableAllCells();
//     return;
//   } else if (res === "hit") {
//     msg.textContent = "🔥 Player hit!";
//     return;
//   } else if (res === "miss") {
//     msg.textContent = "💨 Player missed!";
//     setTimeout(() => {
//       const compRes = game.computerTurn();
//       const last = game.computer.attacks[game.computer.attacks.length - 1];
//       if (last) {
//         const [cx, cy] = last;
//         const val2 = game.player.gameBoard.board[cy][cx];
//         if (val2 === "hit") updateAttackCellOnBoard("player", cx, cy, "hit");
//         else if (val2 === "miss") updateAttackCellOnBoard("player", cx, cy, "miss");
//       }
//       renderBoard(playerEl, game.player.gameBoard, false);

//       if (game.gameOver) {
//         msg.textContent = "💻 Computer wins!";
//         disableAllCells();
//       } else {
//         enableComputerClicks();
//       }
//     }, 700);
//   } else if (res === "already") {
//     msg.textContent = "You already attacked this cell!";
//   }
// }

// // ================= DISABLE ALL CELLS =================
// function disableAllCells() {
//   playerEl.querySelectorAll(".cell").forEach(c => c.style.pointerEvents = "none");
//   compEl.querySelectorAll(".cell").forEach(c => c.style.pointerEvents = "none");
// }


// import { GameController } from "./gameController.js";
// import "./styles/index.css";
// import { updateAttackCellOnBoard, createBoard } from "./dom.js";

// const playerEl = document.querySelector(".player-board");
// const compEl = document.querySelector(".computer-board");
// const msg = document.querySelector(".msg");
// const startBtn = document.querySelector(".start");
// const placeChoice = document.querySelector(".place-option");
// const manualBtn = placeChoice.querySelector(".manual");
// const autoBtn = placeChoice.querySelector(".auto");
// const rotateBtn = document.querySelector(".rotate");

// const game = new GameController();
// let currentShipIndex = 0;
// let isHorizontal = true;
// let GameStarted = false;

// // create empty grids
// createBoard(playerEl);
// createBoard(compEl);
// disableAllCells();

// // render a board (hideShips hides opponent ships)
// function renderBoard(boardEl, gameBoard, hideShips = false) {
//   boardEl.innerHTML = "";
//   for (let y = 0; y < gameBoard.size; y++) {
//     for (let x = 0; x < gameBoard.size; x++) {
//       const cell = document.createElement("div");
//       cell.classList.add("cell");
//       cell.dataset.x = x;
//       cell.dataset.y = y;

//       const val = gameBoard.board[y][x];
//       if (val !== null && !hideShips) cell.classList.add("ship");

//       boardEl.appendChild(cell);
//     }
//   }
// }

// // ================= AUTO PLACEMENT =================
// autoBtn.addEventListener("click", () => {
//   game.player.gameBoard.autoPlaceShips();
//   game.computer.gameBoard.autoPlaceShips();
//   renderBoard(playerEl, game.player.gameBoard, false);
//   renderBoard(compEl, game.computer.gameBoard, true);
//   msg.textContent = "Ships placed automatically! Click Start to play.";
//   startBtn.style.display = "inline";
//   placeChoice.style.display = "none";
// });

// // ================= MANUAL PLACEMENT =================
// manualBtn.addEventListener("click", () => {
//   placeChoice.style.display = "none";
//   renderBoard(playerEl, game.player.gameBoard, false);
//   setupManualPlacement();
//   game.computer.gameBoard.autoPlaceShips();
//   renderBoard(compEl, game.computer.gameBoard, true);
// });

// // ================= ROTATE SHIP =================
// rotateBtn.addEventListener("click", () => {
//   isHorizontal = !isHorizontal;
//   if (currentShipIndex < game.player.gameBoard.ships.length) {
//     const ship = game.player.gameBoard.ships[currentShipIndex];
//     msg.textContent = `Placing ${ship.name} (${ship.length}) - ${isHorizontal ? "Horizontal" : "Vertical"}`;
//   }
// });

// // ================= MANUAL PLACEMENT HANDLERS =================
// function setupManualPlacement() {
//   const ship = game.player.gameBoard.ships[currentShipIndex];
//   msg.textContent = `Place your ${ship.name} (${ship.length})`;
//   const cells = playerEl.querySelectorAll(".cell");
//   cells.forEach(cell => cell.addEventListener("click", handleManualPlace));
// }

// function handleManualPlace(e) {
//   const x = Number(e.target.dataset.x);
//   const y = Number(e.target.dataset.y);
//   const ship = game.player.gameBoard.ships[currentShipIndex];
//   const placed = game.player.gameBoard.placeShips(ship, x, y, isHorizontal);

//   if (placed) {
//     renderBoard(playerEl, game.player.gameBoard, false);
//     removeManualListeners();
//     currentShipIndex++;

//     if (currentShipIndex < game.player.gameBoard.ships.length) {
//       setupManualPlacement();
//     } else {
//       msg.textContent = "✅ All ships placed! Click Start to begin.";
//       startBtn.style.display = "inline";
//     }
//   } else {
//     msg.textContent = "❌ Invalid position, try again.";
//   }
// }

// function removeManualListeners() {
//   const cells = playerEl.querySelectorAll(".cell");
//   cells.forEach(c => c.removeEventListener("click", handleManualPlace));
// }

// // ================= START GAME =================
// startBtn.addEventListener("click", () => {
//   GameStarted = true;
//   msg.textContent = "Game started! Attack the computer's board!";
//   startBtn.style.display = "none";

//   renderBoard(playerEl, game.player.gameBoard, false);
//   renderBoard(compEl, game.computer.gameBoard, true);

//   enableComputerClicks();
// });

// // enable clicks on computer board
// function enableComputerClicks() {
//   const cells = compEl.querySelectorAll(".cell");
//   cells.forEach(cell => {
//     cell.style.pointerEvents = "auto";
//     cell.removeEventListener("click", handlePlayerAttack);
//     cell.addEventListener("click", handlePlayerAttack);
//   });
// }

// // ================= PLAYER ATTACK =================
// function handlePlayerAttack(e) {
//   if (!GameStarted || game.gameOver) return;

//   const x = Number(e.currentTarget.dataset.x);
//   const y = Number(e.currentTarget.dataset.y);

//   const res = game.PlayerTurn(x, y);
//   const val = game.computer.gameBoard.board[y][x];

//   if (val === "hit") updateAttackCellOnBoard("computer", x, y, "hit");
//   else if (val === "miss") updateAttackCellOnBoard("computer", x, y, "miss");

//   e.currentTarget.style.pointerEvents = "none";

//   if (res === "win") {
//     msg.textContent = "🎉 Player wins!";
//     disableAllCells();
//     return;
//   } else if (res === "hit") {
//     msg.textContent = "🔥 Player hit!";
//     return;
//   } else if (res === "miss") {
//     msg.textContent = "💨 Player missed!";
//     setTimeout(() => {
//       const compRes = game.computerTurn();
//       const last = game.computer.attacks[game.computer.attacks.length - 1];
//       if (last) {
//         const [cx, cy] = last;
//         const val2 = game.player.gameBoard.board[cy][cx];
//         if (val2 === "hit") updateAttackCellOnBoard("player", cx, cy, "hit");
//         else if (val2 === "miss") updateAttackCellOnBoard("player", cx, cy, "miss");
//       }
//       renderBoard(playerEl, game.player.gameBoard, false);

//       if (game.gameOver) {
//         msg.textContent = "💻 Computer wins!";
//         disableAllCells();
//       } else {
//         enableComputerClicks();
//       }
//     }, 700);
//   } else if (res === "already") {
//     msg.textContent = "You already attacked this cell!";
//   }
// }

// // ================= DISABLE ALL CELLS =================
// function disableAllCells() {
//   playerEl.querySelectorAll(".cell").forEach(c => c.style.pointerEvents = "none");
//   compEl.querySelectorAll(".cell").forEach(c => c.style.pointerEvents = "none");
// }
  

import { GameController } from "./gameController.js";
import Ship from "./ship.js";  // Import Ship
import "./styles/index.css";
import { updateAttackCellOnBoard, createBoard } from "./dom.js";

const playerEl = document.querySelector(".player-board");
const compEl = document.querySelector(".computer-board");
const msg = document.querySelector(".msg");
const startBtn = document.querySelector(".start");
const placeChoice = document.querySelector(".place-option");
const manualBtn = placeChoice.querySelector(".manual");
const autoBtn = placeChoice.querySelector(".auto");
const rotateBtn = document.querySelector(".rotate");
const restartBtn = document.querySelector(".restart");

let game;
let currentShipIndex = 0;
let isHorizontal = true;
let GameStarted = false;

// Initialize game
function initGame() {
  try {
    game = new GameController();
    currentShipIndex = 0;
    isHorizontal = true;
    GameStarted = false;
    
    createBoard(playerEl);
    createBoard(compEl);
    disableAllCells();
    
    msg.textContent = "Choose ship placement method";
    startBtn.style.display = "none";
    placeChoice.style.display = "flex";
    rotateBtn.style.display = "inline-block";
    
    console.log("Game initialized successfully");
  } catch (error) {
    console.error("Error initializing game:", error);
    msg.textContent = "Error initializing game. Check console.";
  }
}

// Render board with ships
function renderBoard(boardEl, gameBoard, hideShips = false) {
  boardEl.innerHTML = "";
  for (let y = 0; y < gameBoard.size; y++) {
    for (let x = 0; x < gameBoard.size; x++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.x = x;
      cell.dataset.y = y;

      const val = gameBoard.board[y][x];
      if (val instanceof Ship && !hideShips) {
        cell.classList.add("ship");
      } else if (val === "hit") {
        cell.classList.add("hit");
      } else if (val === "miss") {
        cell.classList.add("miss");
      }

      boardEl.appendChild(cell);
    }
  }
}

// Auto placement
autoBtn.addEventListener("click", () => {
  if (!game) {
    msg.textContent = "Game not initialized. Please refresh.";
    return;
  }
  
  try {
    game.player.gameBoard.autoPlaceShips();
    game.computer.gameBoard.autoPlaceShips();
    renderBoard(playerEl, game.player.gameBoard, false);
    renderBoard(compEl, game.computer.gameBoard, true);
    msg.textContent = "Ships placed automatically! Click Start to play.";
    startBtn.style.display = "inline";
    placeChoice.style.display = "none";
  } catch (error) {
    console.error("Auto placement error:", error);
    msg.textContent = "Error placing ships automatically.";
  }
});

// Manual placement
manualBtn.addEventListener("click", () => {
  if (!game) {
    msg.textContent = "Game not initialized. Please refresh.";
    return;
  }
  
  try {
    placeChoice.style.display = "none";
    renderBoard(playerEl, game.player.gameBoard, false);
    setupManualPlacement();
    game.computer.gameBoard.autoPlaceShips();
    renderBoard(compEl, game.computer.gameBoard, true);
  } catch (error) {
    console.error("Manual placement error:", error);
    msg.textContent = "Error starting manual placement.";
  }
});

// Rotate ship
rotateBtn.addEventListener("click", () => {
  isHorizontal = !isHorizontal;
  if (game && currentShipIndex < game.player.gameBoard.ships.length) {
    const ship = game.player.gameBoard.ships[currentShipIndex];
    msg.textContent = `Placing ${ship.name} (${ship.length}) - ${isHorizontal ? "Horizontal" : "Vertical"}`;
  }
});

// Manual placement handlers
function setupManualPlacement() {
  if (!game || currentShipIndex >= game.player.gameBoard.ships.length) return;
  
  const ship = game.player.gameBoard.ships[currentShipIndex];
  msg.textContent = `Place your ${ship.name} (${ship.length}) - ${isHorizontal ? "Horizontal" : "Vertical"}`;
  
  const cells = playerEl.querySelectorAll(".cell");
  cells.forEach(cell => {
    cell.removeEventListener("click", handleManualPlace);
    cell.addEventListener("click", handleManualPlace);
  });
}

function handleManualPlace(e) {
  if (!game) return;
  
  const x = Number(e.target.dataset.x);
  const y = Number(e.target.dataset.y);
  const ship = game.player.gameBoard.ships[currentShipIndex];
  
  const placed = game.player.gameBoard.placeShips(ship, x, y, isHorizontal);

  if (placed) {
    renderBoard(playerEl, game.player.gameBoard, false);
    removeManualListeners();
    currentShipIndex++;

    if (currentShipIndex < game.player.gameBoard.ships.length) {
      setupManualPlacement();
    } else {
      msg.textContent = "✅ All ships placed! Click Start to begin.";
      startBtn.style.display = "inline";
      rotateBtn.style.display = "none";
    }
  } else {
    msg.textContent = "❌ Invalid position, try again.";
  }
}

function removeManualListeners() {
  const cells = playerEl.querySelectorAll(".cell");
  cells.forEach(c => c.removeEventListener("click", handleManualPlace));
}

// Start game
startBtn.addEventListener("click", () => {
  if (!game) {
    msg.textContent = "Game not initialized. Please refresh.";
    return;
  }
  
  GameStarted = true;
  msg.textContent = "Game started! Attack the computer's board!";
  startBtn.style.display = "none";
  rotateBtn.style.display = "none";

  renderBoard(playerEl, game.player.gameBoard, false);
  renderBoard(compEl, game.computer.gameBoard, true);
  enableComputerClicks();
});

// Enable computer board clicks
function enableComputerClicks() {
  const cells = compEl.querySelectorAll(".cell");
  cells.forEach(cell => {
    cell.style.pointerEvents = "auto";
    cell.removeEventListener("click", handlePlayerAttack);
    cell.addEventListener("click", handlePlayerAttack);
  });
}

// Player attack handler
function handlePlayerAttack(e) {
  if (!game || !GameStarted || game.gameOver) return;

  const x = Number(e.currentTarget.dataset.x);
  const y = Number(e.currentTarget.dataset.y);

  const res = game.PlayerTurn(x, y);

  // Update computer board visual
  const val = game.computer.gameBoard.board[y][x];
  updateAttackCellOnBoard("computer", x, y, val === "hit" ? "hit" : "miss");
  e.currentTarget.style.pointerEvents = "none";

  if (res === "win") {
    msg.textContent = "🎉 Player wins!";
    disableAllCells();
    return;
  } else if (res === "hit") {
    msg.textContent = "🔥 Player hit!";
    return;
  } else if (res === "miss") {
    msg.textContent = "💨 Player missed! Computer's turn...";
    
    setTimeout(() => {
      const compRes = game.computerTurn();
      const lastAttack = game.getLastComputerAttack();
      
      if (lastAttack) {
        const [cx, cy] = lastAttack;
        const val2 = game.player.gameBoard.board[cy][cx];
        updateAttackCellOnBoard("player", cx, cy, val2 === "hit" ? "hit" : "miss");
      }

      if (compRes === "win") {
        msg.textContent = "💻 Computer wins!";
        disableAllCells();
      } else {
        msg.textContent = "Computer attacked! Your turn.";
        enableComputerClicks();
      }
    }, 1000);
  } else if (res === "already") {
    msg.textContent = "You already attacked this cell!";
  }
}

// Disable all cells
function disableAllCells() {
  playerEl.querySelectorAll(".cell").forEach(c => c.style.pointerEvents = "none");
  compEl.querySelectorAll(".cell").forEach(c => c.style.pointerEvents = "none");
}

// Restart game
restartBtn.addEventListener("click", initGame);

// Initialize the game when page loads
document.addEventListener('DOMContentLoaded', initGame);