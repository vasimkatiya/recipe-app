import { GameBoard } from "./game-board";
import Ship from "./Ship";


export class Player{
    constructor(name,gameBoard){
        this.name = name;
        this.gameBoard = gameBoard;
        this.attacks = [];
    }

    attack(oppoBoard,x,y){
        if(this.attacks.some(([a,b])=> a === x && b === y))
        {
            console.error('already attacked !');
            return false;
        }

        this.attacks.push([x,y]);
        let res = oppoBoard.reciveAttack(x,y);
        console.log(`res : ${res}`);
        return res;
    }

    randomAttack(oppoBoard)
    {
        let x , y ,valid = false;
        while(!valid)
        {
            x = Math.floor(Math.random()* oppoBoard.size);
            y = Math.floor(Math.random()* oppoBoard.size);

            valid = !this.attacks.some(([a,b])=> a === x && b === y);
        }
        this.attacks.push([x,y]);
        let res = oppoBoard.reciveAttack(x,y);
        console.log(`${this.name} attacked [${x} , ${y}] result : ${res}`);
        return res;
    }
}
