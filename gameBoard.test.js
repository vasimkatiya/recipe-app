// const GameBoard = require('./src/game-board');

const { GameBoard } = require("./src/game-board");

test('hello',()=>{
    const game = new GameBoard();
    expect(game.size).toBe(10)
});

