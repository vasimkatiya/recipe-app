import { Player } from "./player";
import { GameBoard } from "./game-board";

export class GameController{

    constructor()
    {
        this.player = new Player("you",new GameBoard());
        this.computer = new Player("computer",new GameBoard());

        this.player.gameBoard.autoPlaceShips();
        this.computer.gameBoard.autoPlaceShips();

        this.currentPlayer = this.player;
        this.gameOver = false;
    }

    PlayerTurn(x,y)
    {
        if(this.gameOver) return;

        const attacker = this.currentPlayer;
        const defender = attacker === this.player ? this.computer : this.player;

        const result = defender.gameBoard.reciveAttack(x,y);

        console.log(`${attacker.name} in the [${x} , ${y} ] result : ${result}`);
        
        if(defender.gameBoard.areAllSunk())
        {
            this.gameOver = true;
            console.log(`${attacker.name} wins`);
            return ;
        }

        if(result == "miss")
        {
            this.currentPlayer = defender;
            console.log(`attack is missed ! now turn to ${this.currentPlayer.name}`);
            
        }
        else{
            //if hit then extra turn !!!
            console.log(`hit ! ${attacker.name} another time !`);
        }

        if(this.currentPlayer === this.computer && !this.gameOver)
        {
            //call the computer turn after the player attack is missed and the game is not over !!!
            this.computerTurn();
        }


    }


    computerTurn()
    {

        const [x,y] = this.computer.randomAttack(this.player.gameBoard);

        console.log(`computer attack in ${x} : ${y}`);

        const result = this.player.gameBoard.reciveAttack(x,y);
        
        if(this.player.gameBoard.areAllSunk())
        {
            this.gameOver = true;
            console.log(`computer wins`);
            return ;
        }
        
        if(result === "miss")
        {
            this.currentPlayer = this.player;
            console.log(`computer missed the attack !`);
            
        }else{
            console.log(`computer hit ! , again computer turn !!!`);
            this.computerTurn();
        }
        

    }


}