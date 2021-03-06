import Board from './board'

class Game {
  constructor(){
    this.stage = new createjs.Stage("PuyoField");
    this.upNext = new createjs.Stage("UpNext");

    this.board = new Board(this);
    this.score = 0;
    this.gameTime = 0;
    this.timeString = "0:00"
    this.initialTime = Math.floor(createjs.Ticker.getTime()/1000)|| 0;
    this.breakNoise = new Audio('./assets/8-bit-soft-impact.wav');

    let scoreBoard = document.getElementById("scoreBoard");
    let scoreString = document.createTextNode(`${this.score}`);
    scoreBoard.innerHTML = '';
    scoreBoard.appendChild(scoreString);

    let diamond = new Image();
    diamond.src = "./assets/singleDiamond.png"
    this.bitmap = new createjs.Bitmap(diamond);

    this.board.renderBoard(this.stage);
    this.handleTick = this.handleTick.bind(this);
    createjs.Ticker.addEventListener("tick", this.handleTick);
    createjs.Ticker.setFPS(35);
  }

  handleTimeUpdate(){
    let msTime =  Math.floor(createjs.Ticker.getTime() / 1000) - this.initialTime;
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
    this.upNext.removeAllChildren();
    let childPuyo = puyo.childPuyo;
    let circle = new createjs.Shape();
    this.upNext.addChild(circle);
    // circle.graphics.beginFill("greenyellow").drawCircle(30, 30, 20);
    circle.graphics.beginFill(puyo.color).drawCircle(30, 30, 18);
    if (puyo.breaker){
      this.bitmap.x = 15;
      this.bitmap.y = 20;
      this.upNext.addChild(this.bitmap.clone());
    }

    let childCircle = new createjs.Shape();
    this.upNext.addChild(childCircle);
    childCircle.graphics.beginFill(childPuyo.color).drawCircle(70, 30, 18);
    if (childPuyo.breaker){
      this.bitmap.x = 55;
      this.bitmap.y = 20;
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

    this.board.advanceChildToTarget();
    this.board.dropPuyo();
    let breaking = this.board.breakingPuyo();
    let removal = [];
    this.board.grid.forEach((puyo)=>{
      if (puyo.color === "#cccccc"){
        puyo.color = "#737373"
      } else if (puyo.color === "#737373"){
        puyo.color = "#ff6600";
      } else if (puyo.color === "#ff6600"){
        puyo.color = "#737374"
      } else if (puyo.color === "#737374"){
        puyo.color = "black";
      } else if (puyo.color === "black"){
        removal.push(puyo)
      }
    })
    let startLength = this.board.grid.length;
    this.board.grid = this.board.grid.filter((puyo)=>  puyo.color !== "black");
    let newLength = this.board.grid.length;
    if (startLength > newLength && !window.muted){
      this.breakNoise.play();
    }
    if(this.board.activePuyo.supported(this.board.grid) || this.board.activePuyo.childPuyo.xCoord === undefined){

      if (this.board.puyoQueue.length <= 1){
        this.board.puyoQueue = this.board.fillQueue(this.board.puyoQueue);
      }
      if (this.board.activePuyo.supported(this.board.grid) && this.board.activePuyo.yCoord <= 20){
        this.gameTime = 0;
        createjs.Ticker.removeEventListener("tick", this.handleTick);
        document.removeEventListener('keydown', this.board.handleKeypress);
        document.getElementById("GameOver").style.display = "inline-block";
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

export default Game;
