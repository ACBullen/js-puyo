

document.addEventListener("DOMContentLoaded", ()=>{
  function init(){
    let stage = new createjs.Stage("PuyoField");
    let circle = new createjs.Shape();
    circle.graphics.beginFill("DeepSkyBlue").drawCircle(0,0,20);
    circle.x = 100;
    circle.y = 480;
    stage.addChild(circle);
    stage.update();
  }
  init();
})
