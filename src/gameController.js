// // // gameController.js
// // import { Player } from "./player.js";
// // import { GameBoard } from "./game-board.js";

// // export class GameController {
// //   constructor() {
// //     this.player = new Player("you", new GameBoard());
// //     this.computer = new Player("computer", new GameBoard());
// //     this.currentPlayer = this.player;
// //     this.gameOver = false;
// //     this.lastComputerAttack = null;
// //   }

// //   // Handle player attack
// //   PlayerTurn(x, y) {
// //     if (this.gameOver) return null;
// //     if (this.currentPlayer !== this.player) return "not-your-turn";

// //     const result = this.player.attack(this.computer.gameBoard, x, y);

// //     if (result === "invalid" || result === "already") return result;

// //     if (this.computer.gameBoard.areAllSunk()) {
// //       this.gameOver = true;
// //       return "win";
// //     }

// //     // Switch turn only if miss
// //     if (result === "miss") {
// //       this.currentPlayer = this.computer;
// //     }

// //     return result;
// //   }

// //   // Computer keeps attacking until it misses or wins
// //   computerTurn() {
// //     if (this.gameOver) return null;
// //     if (this.currentPlayer !== this.computer) return null;

// //     let result = "hit";
// //     while (result === "hit" && !this.gameOver) {
// //       const coords = this.computer.randomAttack(this.player.gameBoard);
// //       if (!coords) return null;

// //       const [x, y] = coords;
// //       this.lastComputerAttack = coords;

// //       result = this.player.gameBoard.receiveAttack(x, y);

// //       if (this.player.gameBoard.areAllSunk()) {
// //         this.gameOver = true;
// //         return "win";
// //       }
// //     }

// //     if (result === "miss") {
// //       this.currentPlayer = this.player;
// //     }

// //     return result;
// //   }

// //   getLastComputerAttack() {
// //     return this.lastComputerAttack;
// //   }
// // }

// import { Player } from "./player.js";
// import { GameBoard } from "./game-board.js";

// export class GameController {
//   constructor() {
//     this.player = new Player("you", new GameBoard());
//     this.computer = new Player("computer", new GameBoard());
//     this.currentPlayer = this.player;
//     this.gameOver = false;
//     this.lastComputerAttack = null;
//   }

//   PlayerTurn(x, y) {
//     if (this.gameOver) return null;

//     const attacker = this.currentPlayer;
//     const defender = attacker === this.player ? this.computer : this.player;

//     if (attacker.attacks.some(([a, b]) => a === x && b === y)) return "already";

//     const result = defender.gameBoard.receiveAttack(x, y);
//     attacker.attacks.push([x, y]);

//     if (defender.gameBoard.areAllSunk()) {
//       this.gameOver = true;
//       return "win";
//     }

//     if (result === "miss") {
//       this.currentPlayer = defender;
//     }

//     return result;
//   }

//   computerTurn() {
//     if (this.gameOver) return null;

//     const coords = this.computer.randomAttack(this.player.gameBoard);
//     if (!coords) return null;

//     const [x, y] = coords;
//     const result = this.computer.attack(this.player.gameBoard, x, y);

//     this.lastComputerAttack = [x, y];

//     if (this.player.gameBoard.areAllSunk()) {
//       this.gameOver = true;
//       return "win";
//     }

//     if (result === "miss") this.currentPlayer = this.player;

//     return result;
//   }

//   getLastComputerAttack() {
//     return this.lastComputerAttack;
//   }
// }


// gameController.js
import { Player } from "./player.js";
import { GameBoard } from "./game-board.js";
import { updateAttackCellOnBoard, showMessage, disableAllCells, enableAllCells } from "./ui.js";

export class GameController {
  constructor() {
    this.player = new Player("you", new GameBoard());
    this.computer = new Player("computer", new GameBoard());
    this.currentPlayer = this.player;
    this.gameOver = false;
    this.lastComputerAttack = null;
  }

  PlayerTurn(x, y) {
    if (this.gameOver) return null;
    if (this.currentPlayer !== this.player) return "not-your-turn";

    const result = this.player.attack(this.computer.gameBoard, x, y);

    if (result === "invalid" || result === "already") return result;

    // Check if computer's all ships are sunk
    if (this.computer.gameBoard.areAllSunk()) {
      this.gameOver = true;
      return "win";
    }

    // Switch turn only if miss
    if (result === "miss") {
      this.currentPlayer = this.computer;
    }

    return result;
  }

  computerTurn() {
    if (this.gameOver) return null;
    if (this.currentPlayer !== this.computer) return null;

    let result;
    let attackCount = 0;
    const maxAttacks = 1; // Computer gets only one attack per turn

    do {
      const coords = this.computer.randomAttack(this.player.gameBoard);
      if (!coords) {
        this.gameOver = true;
        showMessage("🎉 Player wins! Computer has no valid moves.");
        return "win";
      }

      const [x, y] = coords;
      this.lastComputerAttack = coords;

      result = this.computer.attack(this.player.gameBoard, x, y);

      // Update UI for computer's attack
      updateAttackCellOnBoard("player", x, y, result === "hit" ? "hit" : "miss");

      // Check if player's all ships are sunk
      if (this.player.gameBoard.areAllSunk()) {
        this.gameOver = true;
        showMessage("💻 Computer wins! All your ships are sunk!");
        disableAllCells();
        return "win";
      }

      attackCount++;
      
      // If computer hits, show message but don't give extra turn
      if (result === "hit") {
        showMessage(`💻 Computer hit your ship at [${x},${y}]! Your turn.`);
      }

    } while (result === "hit" && attackCount < maxAttacks);

    // If computer misses or finished attacks, switch back to player
    if (result === "miss" || attackCount >= maxAttacks) {
      this.currentPlayer = this.player;
      showMessage("Your turn! Attack the computer's board.");
      enableAllCells("computer", window.handlePlayerAttack);
    }

    return result;
  }

  getLastComputerAttack() {
    return this.lastComputerAttack;
  }
}

// Make handlePlayerAttack globally accessible
window.handlePlayerAttack = window.handlePlayerAttack || function() {};