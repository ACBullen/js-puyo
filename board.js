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
    this.grid.push(this.activePuyo);
    this.grid.push(this.activePuyo.childPuyo);
    this.activePuyo.xCoord = 100;
    this.activePuyo.yCoord = 20;

    let diamond = new Image();
    diamond.src = "./singleDiamond.png"
    this.bitmap = new createjs.Bitmap(diamond);
    document.addEventListener("keydown", this.handleKeypress.bind(this));
  }
    handleKeypress(e){
      let activeNewCoord;
      let childNewCoord;
      if(e.code === "KeyA"){
        activeNewCoord = this.activePuyo.xCoord - 40;
        childNewCoord = this.activePuyo.childPuyo.xCoord - 40;
        if (this.xValid(activeNewCoord, this.activePuyo.yCoord) && this.xValid(childNewCoord, this.activePuyo.childPuyo.yCoord)){
          this.activePuyo.xCoord = activeNewCoord;
          this.activePuyo.childPuyo.xCoord = childNewCoord;
        }
      } else if(e.code === "KeyD"){
        activeNewCoord = this.activePuyo.xCoord + 40;
        childNewCoord = this.activePuyo.childPuyo.xCoord + 40;
        if (this.xValid(activeNewCoord, this.activePuyo.yCoord) && this.xValid(childNewCoord, this.activePuyo.childPuyo.yCoord)){
          this.activePuyo.xCoord = activeNewCoord;
          this.activePuyo.childPuyo.xCoord = childNewCoord;
        }
      } else if(e.code === "KeyW"){
        console.log("rotate clockwise");
      } else if(e.code === "KeyS"){
        console.log("rotate counterclockwise");
      }
    }
    xValid(newCoord, curHeight){
      if(newCoord < 20 || newCoord > 220){
        console.log("invalid on bounds");
        return false
      } else if (this.grid.some(puyo=> (
        (puyo.xCoord === newCoord && Math.abs(puyo.yCoord - curHeight) < 20) && (
          puyo !== this.activePuyo && puyo !== this.activePuyo.childPuyo
        )))) {
        console.log("invalid on collision");
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
      circle.graphics.beginFill(puyo.color).drawCircle(puyo.xCoord,puyo.yCoord,20);
      if (puyo.breaker){
        this.bitmap.x = puyo.xCoord-15;
        this.bitmap.y = puyo.yCoord-10;
        stage.addChild(this.bitmap.clone());
      }

    });

    stage.update();
  }

  dropPuyo(){
    let grid = this.grid;
    grid.forEach((puyo, idx, grid)=>{
      if(!puyo.supported(grid)){
        puyo.yCoord += 2;
      }
    })


  }

  breakingPuyo(){
    let breaking = [];
    this.grid.forEach((puyo, idx, grid)=>{
      if (puyo.supported && puyo.breaker) {
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
    }
    this.game.score += ((breaking.length+breaking.length/2) * 100);
    return breaking;
  }


}

export default Board;
