import { GameBoard } from "./game-board.js";

export class Player {
  constructor(name, gameBoard) {
    this.name = name;
    this.gameBoard = gameBoard;
    this.attacks = new Set();
  }

  attack(oppoBoard, x, y) {
    const attackKey = `${x},${y}`;
    if (this.attacks.has(attackKey)) {
      return "already";
    }

    this.attacks.add(attackKey);
    const res = oppoBoard.receiveAttack(x, y);
    console.log(`${this.name} attacked [${x}, ${y}] -> ${res}`);
    return res;
  }

  randomAttack(oppoBoard) {
    const size = oppoBoard.size;
    const allPossibleAttacks = [];
    
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const attackKey = `${x},${y}`;
        if (!this.attacks.has(attackKey)) {
          allPossibleAttacks.push([x, y]);
        }
      }
    }

    if (allPossibleAttacks.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * allPossibleAttacks.length);
    return allPossibleAttacks[randomIndex];
  }
}