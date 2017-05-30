import Puyo from './puyo.js';

class Board {
  constructor() {
    //hold an array of puyo blocks
    this.grid = [];
    //holds the next several puyo blocks to be dropped
    this.puyoQueue = [];
    this.basePuyo = new Puyo();
    this.puyoQueue = this.fillQueue();
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


}

export default Board;
