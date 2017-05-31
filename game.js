import Board from './board'

class Game {
  constructor(){
    this.stage = new createjs.Stage("PuyoField");

    this.board = new Board(this);
    this.score = 0;


    this.board.renderBoard(this.stage);
    this.handleTick = this.handleTick.bind(this);
    createjs.Ticker.addEventListener("tick", this.handleTick);
    createjs.Ticker.setFPS(120);
  }

  handleTick(){
    if(!createjs.Ticker.pause){
      this.board.dropPuyo();
      if(this.board.activePuyo.supported(this.board.grid) || this.board.activePuyo.childPuyo.xCoord === undefined){
        let breaking = this.board.breakingPuyo();
        this.board.grid = this.board.grid.filter(((puyo)=> breaking.indexOf(puyo) === -1))
        console.log(this.score);
        if (this.board.puyoQueue.length <= 1){
          this.board.puyoQueue = this.board.fillQueue(this.board.puyoQueue);
        }
        this.board.activePuyo = this.board.puyoQueue.shift();
        this.board.grid.push(this.board.activePuyo)
        this.board.grid.push(this.board.activePuyo.childPuyo);
      }
      if (this.board.activePuyo.supported(this.board.grid) && this.board.activePuyo.yCoord === 20){
        createjs.Ticker.removeEventListener("tick", this.handleTick);
        document.removeEventListener('keydown', this.board.handleKeypress);
        console.log(this.score);
      }
      this.board.renderBoard(this.stage);
    } else {
      console.log(this.score);
    }

  }

}

export default Game;
