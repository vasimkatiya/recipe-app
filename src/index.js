import { GameController } from "./gameController.js";
import Ship from "./ship.js";
import "./styles/index.css";
import { createBoard, updateAttackCellOnBoard, disableAllCells, enableAllCells, showMessage } from "./ui.js";

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
let gameStarted = false;

function initGame() {
  game = new GameController();
  currentShipIndex = 0;
  isHorizontal = true;
  gameStarted = false;

  createBoard(playerEl);
  createBoard(compEl);
  disableAllCells();

  showMessage("Choose ship placement method");
  startBtn.style.display = "none";
  placeChoice.style.display = "flex";
  rotateBtn.style.display = "inline-block";
}

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
        cell.innerHTML = "💥";
      } else if (val === "miss") {
        cell.classList.add("miss");
        cell.innerHTML = "•";
      }

      boardEl.appendChild(cell);
    }
  }
}

startBtn.addEventListener("click", () => {
  if (!game) return showMessage("Game not initialized.");
  gameStarted = true;
  showMessage("Game started! Attack the computer's board!");
  startBtn.style.display = "none";
  rotateBtn.style.display = "none";

  renderBoard(playerEl, game.player.gameBoard, false);
  renderBoard(compEl, game.computer.gameBoard, true);

  enableComputerClicks();
});

function enableComputerClicks() {
  enableAllCells("computer", handlePlayerAttack);
}

function handlePlayerAttack(e) {
  if (!game || !gameStarted || game.gameOver) return;
  
  const x = Number(e.currentTarget.dataset.x);
  const y = Number(e.currentTarget.dataset.y);

  const res = game.PlayerTurn(x, y);
  
  const val = game.computer.gameBoard.board[y][x];
  updateAttackCellOnBoard("computer", x, y, val === "hit" ? "hit" : "miss");
  e.currentTarget.style.pointerEvents = "none";

  if (res === "win") {
    showMessage("🎉 Player wins! All computer ships are sunk!");
    disableAllCells();
    return;
  }
  if (res === "hit") {
    showMessage("🔥 Player hit! Your turn again.");
    return;
  }
  if (res === "miss") {
    showMessage("💨 Player missed! Computer's turn...");
    disableAllCells();
    setTimeout(() => {
      game.computerTurn();
    }, 1000);
  }
  if (res === "already") {
    showMessage("You already attacked this cell!");
  }
}

autoBtn.addEventListener("click", () => {
  if (!game) return showMessage("Game not initialized.");
  game.player.gameBoard.autoPlaceShips();
  game.computer.gameBoard.autoPlaceShips();
  renderBoard(playerEl, game.player.gameBoard, false);
  renderBoard(compEl, game.computer.gameBoard, true);
  showMessage("Ships placed automatically! Click Start.");
  startBtn.style.display = "inline";
  placeChoice.style.display = "none";
});

manualBtn.addEventListener("click", () => {
  if (!game) return showMessage("Game not initialized.");
  placeChoice.style.display = "none";
  renderBoard(playerEl, game.player.gameBoard, false);
  setupManualPlacement();
  game.computer.gameBoard.autoPlaceShips();
  renderBoard(compEl, game.computer.gameBoard, true);
});

rotateBtn.addEventListener("click", () => {
  isHorizontal = !isHorizontal;
  if (game && currentShipIndex < game.player.gameBoard.ships.length) {
    const ship = game.player.gameBoard.ships[currentShipIndex];
    showMessage(`Placing ${ship.name} (${ship.length}) - ${isHorizontal ? "Horizontal" : "Vertical"}`);
  }
});

function setupManualPlacement() {
  if (!game || currentShipIndex >= game.player.gameBoard.ships.length) return;
  const ship = game.player.gameBoard.ships[currentShipIndex];
  showMessage(`Place your ${ship.name} (${ship.length}) - ${isHorizontal ? "Horizontal" : "Vertical"}`);
  playerEl.querySelectorAll(".cell").forEach(cell => {
    cell.onclick = handleManualPlace;
  });
}

function handleManualPlace(e) {
  if (!game) return;
  const x = Number(e.currentTarget.dataset.x);
  const y = Number(e.currentTarget.dataset.y);
  const ship = game.player.gameBoard.ships[currentShipIndex];

  const placed = game.player.gameBoard.placeShips(ship, x, y, isHorizontal);
  if (placed) {
    renderBoard(playerEl, game.player.gameBoard, false);
    currentShipIndex++;
    if (currentShipIndex < game.player.gameBoard.ships.length) setupManualPlacement();
    else {
      showMessage("✅ All ships placed! Click Start.");
      startBtn.style.display = "inline";
      rotateBtn.style.display = "none";
    }
  } else {
    showMessage("❌ Invalid position, try again.");
  }
}

restartBtn.addEventListener("click", initGame);

document.addEventListener("DOMContentLoaded", initGame);