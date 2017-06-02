/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__puyo_js__ = __webpack_require__(1);


class Board {
  constructor(game) {
    //hold an array of puyo blocks
    this.basePuyo = new __WEBPACK_IMPORTED_MODULE_0__puyo_js__["a" /* default */]();
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
        if(e.code === "KeyA" || e.code === "ArrowLeft"){
          activeNewCoord = this.activePuyo.xCoord - 40;
          childNewCoord = this.activePuyo.childPuyo.xCoord - 40;
          if ((this.xValid(activeNewCoord, this.activePuyo.yCoord)
            ) && (this.xValid(childNewCoord, this.activePuyo.childPuyo.yCoord))){
            this.activePuyo.xCoord = activeNewCoord;
            this.activePuyo.AnimX = activeNewCoord;
            this.activePuyo.childPuyo.xCoord = childNewCoord;
            this.activePuyo.childPuyo.AnimX = childNewCoord;
          }
        } else if(e.code === "KeyD" || e.code === "ArrowRight"){
          activeNewCoord = this.activePuyo.xCoord + 40;
          childNewCoord = this.activePuyo.childPuyo.xCoord + 40;
          if (this.xValid(activeNewCoord, this.activePuyo.yCoord) && this.xValid(childNewCoord, this.activePuyo.childPuyo.yCoord)){
            this.activePuyo.xCoord = activeNewCoord;
            this.activePuyo.AnimX = activeNewCoord;
            this.activePuyo.childPuyo.xCoord = childNewCoord;
            this.activePuyo.childPuyo.AnimX = childNewCoord;
          }
        } else if(e.code === "KeyW"|| e.code === "ArrowUp"){
          nextMoveIdx = this.activePuyo.childOrientation + 1;
          if(nextMoveIdx === moveAry.length){
            nextMoveIdx = 0;
          }
          if (this.xValid(moveAry[nextMoveIdx][0], moveAry[nextMoveIdx][1]) && this.yValid(moveAry[nextMoveIdx][1], moveAry[nextMoveIdx][0])){
            this.activePuyo.childOrientation = nextMoveIdx;
            this.activePuyo.childPuyo.xCoord = moveAry[nextMoveIdx][0]
            this.activePuyo.childPuyo.yCoord = moveAry[nextMoveIdx][1]
          }
        } else if(e.code === "KeyS" || e.code === "ArrowDown"){
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

/* harmony default export */ __webpack_exports__["a"] = (Board);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Puyo {
  constructor(color, active, breaker, childPuyo, xCoord, yCoord, parentPuyo){
    this.color = color;
    this.active = active;
    this.childPuyo = childPuyo
    this.parentPuyo = parentPuyo
    this.xCoord = xCoord;
    this.yCoord = yCoord;
    this.AnimX = xCoord;
    this.AnimY = yCoord;
    this.adjacentMatchingPuyo = [];
    this.breaker = breaker;
    this.childOrientation = 0;
  }

  supported(grid) {
    let isSupported = false;

    if(this.yCoord === 460){
      isSupported = true;
      this.AnimY = this.yCoord;
      this.AnimX = this.xCoord;
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

      } else if ((puyo.yCoord - this.yCoord < 41 && puyo.yCoord - this.yCoord > 0 && this.yCoord !== puyo.yCoord
        )&&(this.xCoord === puyo.xCoord)){

        isSupported = true;
        this.AnimY = this.yCoord;
        this.AnimX = this.xCoord;
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
      if (this.isAdjacent(puyo) && this.color === puyo.color && puyo.supported(grid)){
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
    let randColor2;
    if ((Math.random() *100) > 74){
      randColor2 = colors[Math.floor(Math.random() * 4) ];
    } else {
      randColor2 = randColor;
    }

    let childPuyo = new Puyo(randColor2, false, breaker, null, 140, -20)
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

/* harmony default export */ __webpack_exports__["a"] = (Puyo);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__board__ = __webpack_require__(0);


class Game {
  constructor(){
    this.stage = new createjs.Stage("PuyoField");
    this.upNext = new createjs.Stage("UpNext");

    this.board = new __WEBPACK_IMPORTED_MODULE_0__board__["a" /* default */](this);
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
    createjs.Ticker.setFPS(45);
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

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__board_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__puyo_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__game_js__ = __webpack_require__(2);




document.addEventListener("DOMContentLoaded", ()=>{
  let welcome = document.getElementById("welcome")
  let startButton = document.getElementById("startGame");
  let restartButton = document.getElementById("restartGame")
  let gameOver = document.getElementById("GameOver");
  let volControl = document.getElementById("vcDiv");
  window.muted = false;
  startButton.addEventListener("click", () => {
    welcome.style.display = "none";
    return  new __WEBPACK_IMPORTED_MODULE_2__game_js__["a" /* default */]();
  })
  restartButton.addEventListener("click", ()=>{
    gameOver.style.display ="none";
    return new __WEBPACK_IMPORTED_MODULE_2__game_js__["a" /* default */]();
  })
  volControl.addEventListener("click", ()=>{
    volControl.innerHTML = ''
    if(window.muted){
      volControl.innerHTML = `<i class="fa fa-volume-up" aria-hidden="true"></i>`
    } else {
      volControl.innerHTML = `<i class="fa fa-volume-off" aria-hidden="true"></i>`
    }
    window.muted = !window.muted
  })


});


/***/ })
/******/ ]);