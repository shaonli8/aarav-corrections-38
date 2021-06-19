var PLAY=1;
var END=0;
var gameState=PLAY;

var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

var gameOver,gameOverImage;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
  gameOverImage = loadImage("gameOver.png");
}

function setup(){
  
  createCanvas(400,400);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 1;


//creating boy running
boy = createSprite(70,330,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.addAnimation("stoppedSahil",endImg);
boy.scale=0.08;
boy.velocityY = -2; 
console.log(boy);


cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {

  background(0);
  
  camera.position.y = boy.y;
  camera.position.x = 200;

  //edges= createEdgeSprites();
  //boy.collide(edges);
  
  if (gameState===PLAY) { 
    boy.x = World.mouseX;

  //code to reset the background
  if(path.y > boy.y+50 ){
    path.y = boy.y-180;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+20;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection+50;
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
       treasureCollection=treasureCollection+40;
      
    }}
 
      
  if (swordGroup.isTouching(boy)) {
    gameState=END;
    boy.changeAnimation("stoppedSahil",endImg)
    }
 
   else if (gameState===END) {
    path.velocityY=0;
    
    cashG.setLifetimeEach(-1);
    diamondsG.setLifetimeEach(-1);
    jwelleryG.setLifetimeEach(-1);
    swordGroup.setLifetimeEach(-1);
    
    
    cashG.destroyEach();
    cashG.setVelocityYEach(0);
     
    diamondsG.destroyEach();
    diamondsG.setVelocityYEach(0);
     
    jwelleryG.destroyEach();
    jwelleryG.setVelocityYEach(0);
     
    swordGroup.destroyEach();
    swordGroup.setVelocityYEach(0);
     
    boy.velocityY=0;

    boy.scale=0.8;
    //  boy.y=200;
    boy.x=200;
  }
  drawSprites();
  text("Treasure: "+ treasureCollection,150,boy.y-150);
  
 fill(255);
textSize(20);
}

 
function createCash() {
  if (frameCount % 250 == 0) {
  var cash = createSprite(Math.round(random(50, 350),boy.y-400, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 1;
  cash.lifetime = 450;
  cash.depth= path.depth+1
  cash.y=boy.y-400
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (frameCount % 300 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),boy.y-400, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 1;
  diamonds.lifetime = 450;
  diamonds.y=boy.y-400
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (frameCount % 300 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),boy.y-200, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 1;
  jwellery.lifetime = 450;
  jwellery.y=boy.y-400
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (frameCount % 450 == 0) {
  var sword = createSprite(Math.round(random(50, 350),boy.y-200, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 1;
  sword.lifetime = 450;
  sword.y=boy.y-400
  swordGroup.add(sword);
  }
}