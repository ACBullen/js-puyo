import Board from './board'

class Game {
  constructor(){
    this.stage = new createjs.Stage("PuyoField");

    this.board = new Board(this);
    let diamond = new Image();
    diamond.src = "./singleDiamond.png"
    let bitmap = new createjs.Bitmap(diamond);

    this.board.renderBoard(this.stage);
    createjs.Ticker.addEventListener("tick", this.handleTick.bind(this));
    Ticker.setFPS(60);
  }

  handleTick(){

    this.board.dropPuyo();
    if(this.board.activePuyo.supported(this.board.grid)){
      if (this.board.puyoQueue.length > 0){
        this.board.activePuyo = this.board.puyoQueue.shift();
        console.log(this.board.activePuyo);
        this.board.grid.push(this.board.activePuyo)
        this.board.grid.push(this.board.activePuyo.childPuyo);
      }
    }
    this.board.renderBoard(this.stage);
  }



}

export default Game;
