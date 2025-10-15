import { CreateBoard } from './board';
import { GameBoard } from './game-board';
import { Player } from './player';
import './styles/board.css';
CreateBoard('player');
CreateBoard('computer');

const ele = document.querySelectorAll('.computer');
console.log(ele);

ele.forEach((e)=>{
    console.log(e);
    
})

// const game = new GameBoard();

// // ✅ Horizontal ship (fits)
// game.placeShips(game.ships[0], 0, 0, true);

// // ✅ Vertical ship (fits)
// console.log(game.placeShips(game.ships[1], 3, 3, false));
// ;

// // ❌ Overlap test (will throw error)
// console.log("over lap :",game.placeShips(game.ships[2], 3, 3, true));




const game = new GameBoard();

const player = new Player('vasim',game);
console.log(player.gameBoard.autoPlaceShips());

