import Board from './board.js';
import Puyo from './puyo.js';

document.addEventListener("DOMContentLoaded", ()=>{
  function init(){
    let stage = new createjs.Stage("PuyoField");
    let circle = new createjs.Shape();
    circle.graphics.beginFill("green").drawCircle(0,0,20);
    circle.x = 20;
    circle.y = 460;
    stage.addChild(circle);
    let circle2 = new createjs.Shape();
    circle2.graphics.beginFill("DeepSkyBlue").drawRect(0,0,39,39);
    circle2.x = 40;
    circle2.y = 440;
    stage.addChild(circle2);
    let diamond = new Image();
    diamond.src = "./singleDiamond.png"
    let bitmap = new createjs.Bitmap(diamond);
    stage.addChild(bitmap);
    setTimeout(() => (stage.update()), 1000)
    stage.update();
  }
  window.Board = Board;
  window.Puyo = Puyo;
  init();
})
