var balloon;
var database;
var position;

function preload(){
  back=loadImage("Hot Air Ballon-01.png")
  bg=loadAnimation("Hot Air Ballon-02.png")
  balloonImg=loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-03.png","Hot Air Ballon-04.png")
}

function setup() {
  createCanvas(1300,700);
  database=firebase.database();
  balloon=createSprite(400, 200, 50, 50);
  balloon.addAnimation("hotair",bg)
  balloon.scale=0.5

  var balloonPosition=database.ref("Balloon/Height")
  balloonPosition.on("value",readPosition);
}

function draw() {
  background(back); 
  if(keyDown(LEFT_ARROW)){

    updatePosition(-10,0)
    balloon.addAnimation("hotair",balloonImg)

  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.x=balloon.x+10
    updatePosition(10,0)
    balloon.addAnimation("hotair",balloonImg)
    
  }
  else if(keyDown(UP_ARROW)){
    updatePosition(0,-10)
    //balloon.addAnimation("hotair",balloonImg)
    balloon.scale=balloon.scale-0.01
  } 
  else if(keyDown(DOWN_ARROW)){
    updatePosition(0,+10)
    balloon.addAnimation("hotair",balloonImg)
    balloon.scale=balloon.scale+0.01
  }
 
  drawSprites();
}

function updatePosition(x,y){
  database.ref("Balloon/height").set({
    x:balloon.x+x,
    y:balloon.y+y
  })
}


function readPosition(data){
  position=data.val();
  balloon.x=position.x;
  balloon.y=position.y;
}