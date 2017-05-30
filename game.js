import Board from './board'

class Game {
  constructor(){
    this.stage = new createjs.Stage("PuyoField");

    this.board = new Board(this);
    this.score = 0;


    this.board.renderBoard(this.stage);
    createjs.Ticker.addEventListener("tick", this.handleTick.bind(this));
    createjs.Ticker.setFPS(120);
  }

  handleTick(){

    this.board.dropPuyo();
    if(this.board.activePuyo.supported(this.board.grid)){
      let breaking = this.board.breakingPuyo();
      this.board.grid = this.board.grid.filter(((puyo)=> breaking.indexOf(puyo) === -1))
      console.log(this.score);
      if (this.board.puyoQueue.length > 1){
        this.board.activePuyo = this.board.puyoQueue.shift();
        this.board.grid.push(this.board.activePuyo)
        this.board.grid.push(this.board.activePuyo.childPuyo);
      } else {
        this.board.puyoQueue = this.board.fillQueue(this.board.puyoQueue);
      }
    }


    this.board.renderBoard(this.stage);
  }



}

export default Game;
