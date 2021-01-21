var PLAY = 1;
var END = 0;
var gameState = PLAY;

var lady,man,;
var ground, invisibleGround, groundImage;
var backgroundImage;
var cloudsGroup, cloudImage;
var obstacle1,obstaclesGroup,obstacle2;

var score=0;



localStorage["HighestScore"] = 0;

function preload(){
  lady =   loadAnimation("images/jumpinglady.png");
  man = loadAnimation("images/manwalking.png");
 
  
  groundImage = loadImage("images/ground.png");
  backgroundImage = loadImage("images/day.jpg");
  
  cloudImage = loadImage("images/cloud.png");
  
  obstacle1 = loadImage("images/obstacle1.png");
  obstacle2 = loadImage("images/obstacle2.png");
  
  
  
}

function setup() {
  createCanvas(displayWidth - 20, displayHeight-120);
  
  
  lady = createSprite(100,180,20,50);
  
  
  lady.scale = 0.55;
  
  ground = createSprite(200,180,700,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  

  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  obstaclesGroup = newGroup();
  
  textSize(18);

  textFont("Georgia");
  textStyle(BOLD);
  fill("white");
  score = 0;
}

function draw() {
  
  camera.x = mario.x;
  camera.y = mario.y;

  gameOver.position.x = restart.position.x = camera.x

  background(backgroundImage);
  
  textAlign(RIGHT, TOP);
  text("Score: "+ score, 600,5);
 
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
    

    if(keyDown("space") && mario.y >= 159) {
      lady.velocityY = -12;
    }
   
    
    lady.velocityY = lady.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/3;
    }
  
    lday.collide(invisibleGround);
    
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(mario)){
        gameState = END;
    }
  }
  else if (gameState === END) {
   
    //set velcity of each game object to 0
    ground.velocityX = 0;
    lady.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
  
    obstaclesGroup.setLifetimeEach(-1);

  }
  
  drawSprites();
}


function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(camera.x+width/2,165,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}


