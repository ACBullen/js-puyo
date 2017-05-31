import Board from './board.js';
import Puyo from './puyo.js';
import Game from './game.js';

document.addEventListener("DOMContentLoaded", ()=>{
  let welcome = document.getElementById("welcome")
  let button = document.getElementById("startGame");
  document.addEventListener("click", () => {
    welcome.style.display = "none";
    return  new Game();
  })

});
