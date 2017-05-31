import Board from './board'

class Game {
  constructor(){
    this.stage = new createjs.Stage("PuyoField");
    this.upNext = new createjs.Stage("UpNext");

    this.board = new Board(this);
    this.score = 0;
    this.gameTime = 0;
    this.timeString = "0:00"

    let diamond = new Image();
    diamond.src = "./singleDiamond.png"
    this.bitmap = new createjs.Bitmap(diamond);

    this.board.renderBoard(this.stage);
    this.handleTick = this.handleTick.bind(this);
    createjs.Ticker.addEventListener("tick", this.handleTick);
    createjs.Ticker.setFPS(120);
  }

  handleTimeUpdate(){
    let msTime =  Math.floor(createjs.Ticker.getTime() / 1000);
    if (this.gameTime < msTime){
      this.gameTime = msTime;
      this.timeString = this.buildTimeString(this.gameTime);
    }
  }

  buildTimeString(secTime){
    let seconds = secTime % 60;
    let minutes = Math.floor(secTime / 60);
    let secString;
    let minString;
    if (seconds < 10){
      secString = `0${seconds}`
    } else {
      secString = `${seconds}`
    }
    minString = `${minutes}`

    return `${minString}:${secString}`
  }

  handleNewNext(puyo){
    console.log("hit");
    this.upNext.removeAllChildren();
    console.log(puyo);
    let childPuyo = puyo.childPuyo;
    let circle = new createjs.Shape();
    this.upNext.addChild(circle);
    circle.graphics.beginFill("black").drawCircle(20, 20, 20);
    circle.graphics.beginFill(puyo.color).drawCircle(20, 20, 19);
    if (puyo.breaker){
      this.bitmap.x = 5;
      this.bitmap.y = 10;
      this.upNext.addChild(this.bitmap.clone());
    }

    let childCircle = new createjs.Shape();
    this.upNext.addChild(childCircle);
    childCircle.graphics.beginFill('black').drawCircle(60, 20, 20);
    childCircle.graphics.beginFill(childPuyo.color).drawCircle(60, 20, 19);
    if (childPuyo.breaker){
      this.bitmap.x = 45;
      this.bitmap.y = 10;
      this.upNext.addChild(this.bitmap.clone());
    }
    this.upNext.update();
  }


  handleTick(){
    this.handleTimeUpdate();
    let timer = document.getElementById("timer");
    let timeString = document.createTextNode(`${this.timeString}`);
    timer.innerHTML = '';
    timer.appendChild(timeString);
    if(!createjs.Ticker.pause){
      this.board.dropPuyo();
      if(this.board.activePuyo.supported(this.board.grid) || this.board.activePuyo.childPuyo.xCoord === undefined){
        let breaking = this.board.breakingPuyo();
        this.board.grid = this.board.grid.filter(((puyo)=> breaking.indexOf(puyo) === -1))
        if (this.board.puyoQueue.length <= 1){
          this.board.puyoQueue = this.board.fillQueue(this.board.puyoQueue);
        }
        if (this.board.activePuyo.supported(this.board.grid) && this.board.activePuyo.yCoord === 20){
          createjs.Ticker.removeEventListener("tick", this.handleTick);
          document.removeEventListener('keydown', this.board.handleKeypress);
        } else {
          this.board.activePuyo = this.board.puyoQueue.shift();
          this.board.grid.push(this.board.activePuyo)
          this.board.grid.push(this.board.activePuyo.childPuyo);
          this.handleNewNext(this.board.puyoQueue[0]);
        }
      }

      this.board.renderBoard(this.stage);
    }
  }

}

export default Game;
