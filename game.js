import Board from './board'

class Game {
  constructor(){
    this.stage = new createjs.Stage("PuyoField");
    this.upNext = new createjs.Stage("UpNext");

    this.board = new Board(this);
    this.score = 0;
    this.gameTime = 0;
    this.timeString = "0:00"
    this.initialTime = createjs.Ticker.getTime() || 0;

    let scoreBoard = document.getElementById("scoreBoard");
    let scoreString = document.createTextNode(`${this.score}`);
    scoreBoard.innerHTML = '';
    scoreBoard.appendChild(scoreString);

    let diamond = new Image();
    diamond.src = "./singleDiamond.png"
    this.bitmap = new createjs.Bitmap(diamond);

    this.board.renderBoard(this.stage);
    this.handleTick = this.handleTick.bind(this);
    createjs.Ticker.addEventListener("tick", this.handleTick);
    createjs.Ticker.setFPS(120);
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
    circle.graphics.beginFill("black").drawCircle(30, 30, 20);
    circle.graphics.beginFill(puyo.color).drawCircle(30, 30, 18);
    if (puyo.breaker){
      this.bitmap.x = 15;
      this.bitmap.y = 20;
      this.upNext.addChild(this.bitmap.clone());
    }

    let childCircle = new createjs.Shape();
    this.upNext.addChild(childCircle);
    childCircle.graphics.beginFill('black').drawCircle(70, 30, 20);
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
