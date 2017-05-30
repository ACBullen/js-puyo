class Puyo {
  constructor(color, active, breaker, childPuyo, xCoord, yCoord){
    this.color = color;
    this.active = active;
    this.childPuyo = childPuyo
    this.xCoord = xCoord;
    this.yCoord = yCoord;
    this.adjacentMatchingPuyo = [];
    this.breaker = breaker;
  }

  supported(grid) {
    let isSupported = false;

    if(this.yCoord === 10){
      isSupported = true;
      return isSupported;
    }
    grid.forEach((puyo) => {
      if (this.yCoord - puyo.yCoord < 21 && this.yCoord !== puyo.yCoord ){
        isSupported = true;
      }
    })

    return isSupported;
  }

  isAdjacent(puyo){
    let adjacent = false;
    if( (this.yCoord - puyo.yCoord < 21 && this.yCoord !== puyo.yCoord)||
    (this.xCoord - puyo.yCoord < 21 && this.)){
      adjacent = true;
    }
    return adjacent;
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

  generatePuyo(){
    let colors = ["red", "green", "yellow", "red"];
    let randColor = colors[Math.floor(Math.random() * 4)];
    let breaker = false;
    if ((Math.random() * 2 + 1) > 1){
      breaker = true;
    }
    let childPuyo = new  Puyo(randColor, false, breaker, null, 120, 20)
    return new Puyo(randColor, false, breaker, 100, childPuyo, 20)
  }

  generateBreakerPuyo(){
    let puyo = generatePuyo();
    puyo.breaker = true;
    puyo.childPuyo.breaker = true;
    return puyo;
  }
}

export default Puyo;
