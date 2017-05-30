import Board from './board.js';
import Puyo from './puyo.js';
import Game from './game.js';

document.addEventListener("DOMContentLoaded", ()=>{

  window.Board = Board;
  window.Puyo = Puyo;
  window.Game = Game;
})
