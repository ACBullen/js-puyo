class Puyo {
  constructor(color, active, breaker, childPuyo, xCoord, yCoord, parentPuyo){
    this.color = color;
    this.active = active;
    this.childPuyo = childPuyo
    this.parentPuyo = parentPuyo
    this.xCoord = xCoord;
    this.yCoord = yCoord;
    this.adjacentMatchingPuyo = [];
    this.breaker = breaker;
    this.childOrientation = 0;
  }

  supported(grid) {
    let isSupported = false;

    if(this.yCoord === 460){
      isSupported = true;
      if(this.parentPuyo){
        this.parentPuyo.childPuyo = {};
      }
      if(this.childPuyo){
        this.childPuyo.parentPuyo = {}
      }
      this.parentPuyo = {};
      this.childPuyo = {};
      return isSupported;
    }

    grid.forEach((puyo) => {
      if (puyo === this.childPuyo){
        null;
        } else if(puyo === this.parentPuyo){
          null;

      } else if ((puyo.yCoord - this.yCoord === 40 && this.yCoord !== puyo.yCoord )&&(this.xCoord === puyo.xCoord)){

        isSupported = true;
        if(this.parentPuyo){
          this.parentPuyo.childPuyo = {};
        }
        if (this.childPuyo){
          this.childPuyo.parentPuyo = {};
        }
        this.parentPuyo = {};
        this.childPuyo = {};
      }
  })

    return isSupported;

  }

  isAdjacent(puyo){
    let adj = false;
    if(((Math.abs(puyo.yCoord - this.yCoord) < 41 && this.yCoord !== puyo.yCoord) && puyo.xCoord === this.xCoord
      )||(
       (Math.abs(puyo.xCoord - this.xCoord) < 41 && this.xCoord !== puyo.xCoord) && puyo.yCoord === this.yCoord)){
      adj = true;
    }
    return adj;
  }

  adjacentPuyos(grid){
    grid.forEach((puyo)=>{
      if (this.isAdjacent(puyo) && this.color === puyo.color){
        this.adjacentMatchingPuyo.push(puyo);
      } else if(this.adjacentMatchingPuyo.indexOf(puyo) > -1) {
        this.adjacentMatchingPuyo = this.adjacentMatchingPuyo.slice(0, this.adjacentMatchingPuyo.indexOf(puyo)).concat(
          this.adjacentMatchingPuyo.slice(this.adjacentMatchingPuyo.indexOf(puyo) + 1)
        )
      }
    })
  }

  generatePuyo (){
    let colors = ["red", "green", "yellow", "blue"];
    let randColor = colors[Math.floor(Math.random() * 4) ];
    let breaker = false;
    if (Math.floor(Math.random() * 4 + 1) > 3){
      breaker = true;
    }
    let childPuyo = new Puyo(randColor, false, breaker, null, 140, -20)
    let parentPuyo = new Puyo(randColor, false, breaker, childPuyo, 100, -20)
    childPuyo.parentPuyo = parentPuyo;
    return parentPuyo;
  }

  generateBreakerPuyo (){
    let puyo = this.generatePuyo();
    puyo.breaker = true;
    puyo.childPuyo.breaker = true;
    return puyo;
  }
}

export default Puyo;
