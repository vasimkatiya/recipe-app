const Ship = require("./Ship");

//  new Ship('distroyer',2);
//  new Ship('submurine',3);
//  new Ship('battleship',4);



export class GameBoard{
    constructor()
    {
        this.size = 10;
        this.missedAttack = [];
        this.ships = [
            new Ship('distroyer',2),
            new Ship('submurine',3),
            new Ship('battleship',4)
        ];
        // this.board = document.querySelector(`.${user}`);
        this.board = Array.from({length : this.size},()=>
            Array(this.size).fill(null)
        )
    }


    placeShips(ship,startX,startY,isHorizontal = true)
    {


        const {length} = ship;
        
        const dx = isHorizontal ? 1 : 0;
        const dy = isHorizontal ? 0 : 1;


        const endX = startX + dx * (length - 1);
        const endY = startY + dy * (length - 1);

        if (startX < 0 || startY < 0 || endX >= this.size || endY >= this.size) {
    console.error('ship does not fit in the coordinates !');
    return false;
}
ship.coordinates = [];
for(let i = 0; i<length; i++)
{
   const x = startX + dx * i;
   const y = startY + dy * i;

    if(this.board[y][x] !== null)
    {
        console.error("already placed !");
        return false;
        
    }

   this.board[y][x] = ship;
   ship.coordinates.push([x,y]);

}
    
    this.printBoard();
    return this.board;
} 

//auto place ships... 

autoPlaceShips()
{
    this.ships.forEach((ship)=>{
        let placed = false;

        while(!placed)
        {
            let isHorizontal = Math.random() <0.5 ;
            let x = Math.floor(Math.random() * this.size);
            let y = Math.floor(Math.random() * this.size);
            placed = this.placeShips(ship,x,y,isHorizontal);
        }
    })
}

printBoard() {
        this.board.forEach((row) => {
            console.log(row.map((cell) => (cell ? cell.name[0].toUpperCase() : ".")).join(" "));
        });
        console.log("\n");
    }

}

