import Board from './board.js';
import Puyo from './puyo.js';
import Game from './game.js';

document.addEventListener("DOMContentLoaded", ()=>{
  let welcome = document.getElementById("welcome")
  let startButton = document.getElementById("startGame");
  let restartButton = document.getElementById("restartGame")
  let gameOver = document.getElementById("GameOver");
  startButton.addEventListener("click", () => {
    welcome.style.display = "none";
    return  new Game();
  })
  restartButton.addEventListener("click", ()=>{
    gameOver.style.display ="none";
    return new Game();
  })


});
