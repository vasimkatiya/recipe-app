// game-board.js
import Ship from "./ship.js";  // Fixed import

export class GameBoard {
  constructor() {
    this.size = 10;
    this.missedAttack = [];
    this.ships = [
      new Ship("destroyer", 2),
      new Ship("submarine", 3),
      new Ship("battleship", 4),
      new Ship("carrier", 5),
      new Ship("cruiser", 3),
    ];
    this.board = Array.from({ length: this.size }, () =>
      Array(this.size).fill(null)
    );
  }

  placeShips(ship, startX, startY, isHorizontal = true) {
    const { length } = ship;
    const dx = isHorizontal ? 1 : 0;
    const dy = isHorizontal ? 0 : 1;
    const endX = startX + dx * (length - 1);
    const endY = startY + dy * (length - 1);

    if (startX < 0 || startY < 0 || endX >= this.size || endY >= this.size) {
      return false;
    }

    // check overlap
    for (let i = 0; i < length; i++) {
      const x = startX + dx * i;
      const y = startY + dy * i;
      if (this.board[y][x] !== null) return false;
    }

    // place
    ship.coordinates = [];
    for (let i = 0; i < length; i++) {
      const x = startX + dx * i;
      const y = startY + dy * i;
      this.board[y][x] = ship;
      ship.coordinates.push([x, y]);
    }

    return true;
  }

  autoPlaceShips() {
    this.ships.forEach((ship) => {
      let placed = false;
      let attempts = 0;
      while (!placed && attempts < 1000) {
        const isHorizontal = Math.random() < 0.5;
        const x = Math.floor(Math.random() * this.size);
        const y = Math.floor(Math.random() * this.size);
        placed = this.placeShips(ship, x, y, isHorizontal);
        attempts++;
      }
      if (!placed) {
        console.warn(`Could not place ship ${ship.name} after many attempts`);
      }
    });
  }

  printBoard() {
    this.board.forEach((row) => {
      console.log(
        row
          .map((cell) => (cell ? cell.name[0].toUpperCase() : "."))
          .join(" ")
      );
    });
    console.log("\n");
  }

  receiveAttack(x, y) {
    if (x < 0 || y < 0 || x >= this.size || y >= this.size) {
      return "invalid";
    }

    const cur = this.board[y][x];
    if (cur === "hit" || cur === "miss") {
      return "already";
    }

    if (cur instanceof Ship) {
      cur.hit();
      this.board[y][x] = "hit";
      if (cur.isSunk()) {
        console.log(`${cur.name} sunk!`);
      }
      return "hit";
    } else {
      this.board[y][x] = "miss";
      this.missedAttack.push([x, y]);
      return "miss";
    }
  }

  areAllSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }
}