import Puyo from './puyo.js';

class Board {
  constructor(game) {
    //hold an array of puyo blocks
    this.basePuyo = new Puyo();
    this.grid = [];
    this.game = game;
    //holds the next several puyo blocks to be dropped
    this.puyoQueue = this.fillQueue();
    this.activePuyo = this.puyoQueue.shift();
    this.activePuyo.breaker = false;
    this.activePuyo.childPuyo.breaker = false;
    this.puyoQueue[0].breaker = false;
    this.puyoQueue[0].childPuyo.breaker = false;
    this.grid.push(this.activePuyo);
    this.grid.push(this.activePuyo.childPuyo);
    this.activePuyo.xCoord = 100;
    this.activePuyo.yCoord = 20;
    this.activePuyo.AnimX = 100;
    this.activePuyo.AnimY = 20
    this.activePuyo.childPuyo.xCoord = 140;
    this.activePuyo.childPuyo.yCoord = 20;
    this.activePuyo.childPuyo.AnimX = 140;
    this.activePuyo.childPuyo.AnimY = 20;

    this.game.handleNewNext(this.puyoQueue[0]);

    this.bitmap = this.game.bitmap;

    this.handleKeypress = this.handleKeypress.bind(this)

    document.addEventListener("keydown", this.handleKeypress);
  }
    handleKeypress(e){
      let activeNewCoord;
      let childNewCoord;
      let nextMoveIdx;
      let moveAry = [
        [this.activePuyo.xCoord + 40, this.activePuyo.yCoord],
        [this.activePuyo.xCoord, this.activePuyo.yCoord + 44],
        [this.activePuyo.xCoord - 40, this.activePuyo.yCoord],
        [this.activePuyo.xCoord, this.activePuyo.yCoord - 44]
      ];
      if ((this.activePuyo.childPuyo.AnimX === moveAry[this.activePuyo.childOrientation][0]
        )&& (
          this.activePuyo.childPuyo.AnimY === moveAry[this.activePuyo.childOrientation][1])){
        if(e.code === "KeyA"){
          activeNewCoord = this.activePuyo.xCoord - 40;
          childNewCoord = this.activePuyo.childPuyo.xCoord - 40;
          if ((this.xValid(activeNewCoord, this.activePuyo.yCoord)
            ) && (this.xValid(childNewCoord, this.activePuyo.childPuyo.yCoord))){
            this.activePuyo.xCoord = activeNewCoord;
            this.activePuyo.AnimX = activeNewCoord;
            this.activePuyo.childPuyo.xCoord = childNewCoord;
            this.activePuyo.childPuyo.AnimX = childNewCoord;
          }
        } else if(e.code === "KeyD"){
          activeNewCoord = this.activePuyo.xCoord + 40;
          childNewCoord = this.activePuyo.childPuyo.xCoord + 40;
          if (this.xValid(activeNewCoord, this.activePuyo.yCoord) && this.xValid(childNewCoord, this.activePuyo.childPuyo.yCoord)){
            this.activePuyo.xCoord = activeNewCoord;
            this.activePuyo.AnimX = activeNewCoord;
            this.activePuyo.childPuyo.xCoord = childNewCoord;
            this.activePuyo.childPuyo.AnimX = childNewCoord;
          }
        } else if(e.code === "KeyW"){
          nextMoveIdx = this.activePuyo.childOrientation + 1;
          if(nextMoveIdx === moveAry.length){
            nextMoveIdx = 0;
          }
          if (this.xValid(moveAry[nextMoveIdx][0], moveAry[nextMoveIdx][1]) && this.yValid(moveAry[nextMoveIdx][1], moveAry[nextMoveIdx][0])){
            this.activePuyo.childOrientation = nextMoveIdx;
            this.activePuyo.childPuyo.xCoord = moveAry[nextMoveIdx][0]
            this.activePuyo.childPuyo.yCoord = moveAry[nextMoveIdx][1]
          }
        } else if(e.code === "KeyS"){
          nextMoveIdx = this.activePuyo.childOrientation - 1;
          if(nextMoveIdx < 0){
            nextMoveIdx = moveAry.length - 1
          }
          if (this.xValid(moveAry[nextMoveIdx][0], moveAry[nextMoveIdx][1]) && this.yValid(moveAry[nextMoveIdx][1], moveAry[nextMoveIdx][0])){
            this.activePuyo.childOrientation = nextMoveIdx;
            this.activePuyo.childPuyo.xCoord = moveAry[nextMoveIdx][0]
            this.activePuyo.childPuyo.yCoord = moveAry[nextMoveIdx][1]
          }
        }
      }
    }
    xValid(newCoord, curHeight){
      if(newCoord < 20 || newCoord > 220){
        return false
      } else if (this.grid.some(puyo=> (
        (puyo.xCoord === newCoord && Math.abs(puyo.yCoord - curHeight) < 35) && (
          puyo !== this.activePuyo && puyo !== this.activePuyo.childPuyo
        )))) {
        return false
      }
      return true
    }

    yValid(newCoord, curWidth){
      if (newCoord < 20){
        return false
      } else if(this.grid.some((puyo)=>((Math.abs(newCoord - puyo.yCoord) < 41 && Math.abs(puyo.xCoord - curWidth) < 35)
    ))){
        return false
      }
      return true
    }

  fillQueue(remnant){
    let breakerPresent = false;
    let newQueue = remnant || [];
    while (newQueue.length < 9){
      let newPuyo = this.basePuyo.generatePuyo();
      if(newPuyo.breaker){
        breakerPresent = true;
      }
      newQueue.push(newPuyo);
    }
    if (breakerPresent){
      newQueue.push(this.basePuyo.generatePuyo());
    } else {
      newQueue.push(this.basePuyo.generateBreakerPuyo());
    }
    return newQueue;
  }

  renderBoard(stage){
    stage.removeAllChildren();
    this.grid.forEach((puyo)=>{

      let circle = new createjs.Shape();
      stage.addChild(circle);
      circle.graphics.beginFill("black").drawCircle(puyo.AnimX, puyo.AnimY, 20);
      circle.graphics.beginFill(puyo.color).drawCircle(puyo.AnimX,puyo.AnimY,18);
      if (puyo.breaker){
        this.game.bitmap.x = puyo.AnimX-15;
        this.game.bitmap.y = puyo.AnimY-10;
        stage.addChild(this.game.bitmap.clone());
      }
    });
    stage.update();
  }

  advanceChildToTarget(){
    let child = this.activePuyo.childPuyo;
    let active = this.activePuyo;
    let moveAry = [
      [active.xCoord + 40, active.yCoord],
      [active.xCoord, active.yCoord + 44],
      [active.xCoord - 40, active.yCoord],
      [active.xCoord, active.yCoord - 44]
    ];


    if (child.AnimX !== moveAry[active.childOrientation][0] || child.AnimY !== moveAry[active.childOrientation][1]){
      if (active.childOrientation === 0 || active.childOrientation === 2){
        if (child.AnimX !== moveAry[active.childOrientation][0]){
          if ((child.AnimX - moveAry[active.childOrientation][0]) < 0){
            child.AnimX += 20;
          } else {
            child.AnimX -= 20;
          }
        } else {
          if((child.AnimY - moveAry[active.childOrientation][1]) < 0){
            child.AnimY += 22
            if (child.AnimY > 453){
              child.AnimY = 453;
            }
          } else {
            child.AnimY -= 22
          }
        }
      } else {
        if(child.AnimY !== moveAry[active.childOrientation][1]){
          if ((child.AnimY - moveAry[active.childOrientation][1]) < 0){
            child.AnimY += 22;
            if (child.AnimY > 450){
              child.AnimY = 450;
            }
          } else {
            child.AnimY -= 22;
          }
        } else {
          if ((child.AnimX - moveAry[active.childOrientation][0]) < 0){
            child.AnimX += 20;
          } else {
            child.AnimX -= 20;
          }
        }
      }
    }
  }

  dropPuyo(){
    let grid = this.grid;
    grid.forEach((puyo, idx, grid)=>{
      if (((puyo.xCoord - 20) % 40 !== 0) && puyo.parentPuyo.xCoord === undefined){
        if ((puyo.xCoord) - 20 % 40 < 20){
          puyo.xCoord = puyo.xCoord - ((puyo.xCoord - 20) % 40);
          puyo.AnimX = puyo.xCoord
        } else {
          puyo.xCoord = puyo.xCoord + (40 - ((puyo.xCoord - 20) % 40));
          puyo.AnimX = puyo.xCoord
        }
      }
      if(!puyo.supported(grid)){
        if(puyo === this.activePuyo){
          puyo.yCoord += 4;
          puyo.AnimY += 4;
          puyo.childPuyo.yCoord += 4;
          puyo.childPuyo.AnimY += 4
        } else if (puyo.parentPuyo !== this.activePuyo) {
            puyo.yCoord += 4;
            puyo.AnimY += 4;
        }
      }
      if (puyo.AnimY > 460){

        puyo.AnimY = 460;
      }
    })
  }

  breakingPuyo(){
    let breaking = [];
    this.grid.forEach((puyo, idx, grid)=>{
      if (puyo.supported(grid) && puyo.breaker && (
        ["red", "green", "blue", 'yellow'].indexOf(puyo.color) > -1)){
        puyo.adjacentPuyos(grid);
        puyo.adjacentMatchingPuyo.forEach((puyo2)=>{
          if(breaking.indexOf(puyo2) === -1){
            breaking.push(puyo2);
          }
        })
      }
    })

    for(let i = 0; i < breaking.length; i++){
      breaking[i].adjacentPuyos(this.grid);
      breaking[i].adjacentMatchingPuyo.forEach(puyo3=>{
        if(breaking.indexOf(puyo3) === -1){
          breaking.push(puyo3);
        }
      });
      breaking[i].color = "#cccccc"
    }
    this.game.score += ((breaking.length+breaking.length/2) * 100);
    let scoreBoard = document.getElementById("scoreBoard");
    let scoreString = document.createTextNode(`${this.game.score}`);
    scoreBoard.innerHTML = '';
    scoreBoard.appendChild(scoreString);
    return breaking;
  }
}

export default Board;
