// player.js
import { GameBoard } from "./game-board.js";

export class Player {  // Make sure it's exported
  constructor(name, gameBoard) {
    this.name = name;
    this.gameBoard = gameBoard;
    this.attacks = []; // array of [x,y] attacked
  }

  // performs attack on opponent board and returns result string
  attack(oppoBoard, x, y) {
    if (this.attacks.some(([a, b]) => a === x && b === y)) {
      console.error("already attacked !");
      return "already";
    }

    this.attacks.push([x, y]);
    const res = oppoBoard.receiveAttack(x, y);
    console.log(`${this.name} attacked [${x}, ${y}] -> ${res}`);
    return res;
  }

  // choose random coordinate that hasn't been used by this player yet
  randomAttack(oppoBoard) {
    let x, y, valid = false, attempts = 0;
    while (!valid && attempts < 5000) {
      x = Math.floor(Math.random() * oppoBoard.size);
      y = Math.floor(Math.random() * oppoBoard.size);
      valid = !this.attacks.some(([a, b]) => a === x && b === y);
      attempts++;
    }
    if (!valid) {
      // fallback: linear search for a free cell
      for (let yy = 0; yy < oppoBoard.size; yy++) {
        for (let xx = 0; xx < oppoBoard.size; xx++) {
          if (!this.attacks.some(([a, b]) => a === xx && b === yy)) {
            x = xx; y = yy; valid = true; break;
          }
        }
        if (valid) break;
      }
    }
    if (!valid) {
      // no valid moves left
      return null;
    }
    // record the chosen attack coord so player won't repeat it
    this.attacks.push([x, y]);
    return [x, y];
  }
}