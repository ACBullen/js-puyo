import Board from './board.js';
import Puyo from './puyo.js';
import Game from './game.js';

document.addEventListener("DOMContentLoaded", ()=>{
  let welcome = document.getElementById("welcome")
  let startButton = document.getElementById("startGame");
  let restartButton = document.getElementById("restartGame")
  let gameOver = document.getElementById("GameOver");
  let volControl = document.getElementById("vcDiv");
  window.muted = false;
  startButton.addEventListener("click", () => {
    welcome.style.display = "none";
    return  new Game();
  })
  restartButton.addEventListener("click", ()=>{
    gameOver.style.display ="none";
    return new Game();
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
