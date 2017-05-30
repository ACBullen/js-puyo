

document.addEventListener("DOMContentLoaded", ()=>{
  function init(){
    let stage = new createjs.Stage("PuyoField");
    let circle = new createjs.Shape();
    circle.graphics.beginFill("DeepSkyBlue").drawCircle(0,0,20);
    circle.x = 20;
    circle.y = 460;
    stage.addChild(circle);
    let circle2 = new createjs.Shape();
    circle2.graphics.beginFill("DeepSkyBlue").drawCircle(0,0,20);
    circle2.x = 60;
    circle2.y = 460;
    stage.addChild(circle2);
    stage.update();
  }
  init();
})
