// // gameController.js
// import { Player } from "./player.js";
// import { GameBoard } from "./game-board.js";

// export class GameController {
//   constructor() {
//     this.player = new Player("you", new GameBoard());
//     this.computer = new Player("computer", new GameBoard());

//     // optionally auto-place at start (index.js can also call autoPlace)
//     // this.player.gameBoard.autoPlaceShips();
//     // this.computer.gameBoard.autoPlaceShips();

//     this.currentPlayer = this.player;
//     this.gameOver = false;
//   }

//   // return "hit" | "miss" | "already" | "invalid" | "win"
//   PlayerTurn(x, y) {
//     if (this.gameOver) return null;

//     const attacker = this.currentPlayer;
//     const defender = attacker === this.player ? this.computer : this.player;

//     const result = attacker.attack(defender.gameBoard, x, y);

//     if (result === "already" || result === "invalid") {
//       return result;
//     }

//     if (defender.gameBoard.areAllSunk()) {
//       this.gameOver = true;
//       return "win";
//     }

//     if (result === "miss") {
//       // switch turn
//       this.currentPlayer = defender;
//       if (this.currentPlayer === this.computer && !this.gameOver) {
//         // allow a short delay externally (index.js handles setTimeout for UI)
//       }
//       return "miss";
//     }

//     if (result === "hit") {
//       // attacker gets another turn
//       return "hit";
//     }

//     return result;
//   }

//   // computer AI: choose coords then perform attack and return result
//   computerTurn() {
//     if (this.gameOver) return null;

//     const coords = this.computer.randomAttack(this.player.gameBoard);
//     if (!coords) return null;
//     const [x, y] = coords;

//     // perform attack using computer (records already in randomAttack but we do a real receive)
//     // Note: randomAttack already pushed coords into this.computer.attacks, so call receiveAttack directly
//     const result = this.player.gameBoard.receiveAttack(x, y);

//     if (result === "hit") {
//       if (this.player.gameBoard.areAllSunk()) {
//         this.gameOver = true;
//         return "win";
//       }
//       // computer gets another turn - caller can setTimeout to call computerTurn again
//       return "hit";
//     } else if (result === "miss") {
//       this.currentPlayer = this.player;
//       return "miss";
//     } else if (result === "already") {
//       // this should not happen because randomAttack avoids repeats, but handle gracefully
//       return "already";
//     }
//     return result;
//   }
// }


// gameController.js
import { Player } from "./player.js";  // Fixed import
import { GameBoard } from "./game-board.js";

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

    const attacker = this.currentPlayer;
    const defender = attacker === this.player ? this.computer : this.player;

    // Check if already attacked
    if (attacker.attacks.some(([a, b]) => a === x && b === y)) {
      return "already";
    }

    const result = defender.gameBoard.receiveAttack(x, y);
    attacker.attacks.push([x, y]); // Record the attack

    if (result === "invalid" || result === "already") {
      return result;
    }

    if (defender.gameBoard.areAllSunk()) {
      this.gameOver = true;
      return "win";
    }

    if (result === "miss") {
      this.currentPlayer = defender;
      return "miss";
    }

    return "hit";
  }

  computerTurn() {
    if (this.gameOver) return null;

    const coords = this.computer.randomAttack(this.player.gameBoard);
    if (!coords) return null;
    
    const [x, y] = coords;
    this.lastComputerAttack = coords;

    const result = this.player.gameBoard.receiveAttack(x, y);

    if (this.player.gameBoard.areAllSunk()) {
      this.gameOver = true;
      return "win";
    }

    if (result === "miss") {
      this.currentPlayer = this.player;
    }

    return result;
  }

  getLastComputerAttack() {
    return this.lastComputerAttack;
  }
}