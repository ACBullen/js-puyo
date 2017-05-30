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
      circle.graphics.beginFill(puyo.color).drawCircle(puyo.xCoord,puyo.yCoord,20);
      stage.addChild(circle);
    });

    stage.update();
  }

  dropPuyo(){
    let grid = this.grid;
    grid.forEach((puyo, idx, grid)=>{
      if(!puyo.supported(grid)){
        puyo.yCoord += 5;
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
        if(breaking.indexOf(puyo3)){
          breaking.push(puyo3);
        }
      });
    }

    return breaking;
  }


}

export default Board;
