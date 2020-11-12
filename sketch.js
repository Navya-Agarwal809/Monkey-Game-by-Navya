
var monkey , monkey_running; 
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;

var survivalTime= 0

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  
  createCanvas(400, 400);
  
  monkey= createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale= 0.1; 
  
  ground= createSprite(400, 350, 900, 10);
  ground.velocityX= -4;
  
  ground.x= ground.width/2;
  console.log(ground.x); 
  
  foodGroup= new Group();
  obstacleGroup= new Group();
}


function draw() {
  
  background("white");
  
  if(ground.x<0){
      ground.x= ground.width/2;

  }
  
  if(keyDown("space")){
    monkey.velocityY= -12; 
  }
  
  
  monkey.velocityY= monkey.velocityY + 0.8; 
  
  
  if(obstacleGroup.isTouching(monkey)){
  
    ground.velocityX= 0;
    monkey.velocityY= 0; 
    monkey.velocityX= 0; 
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    obstacleGroup.destroyEach();
    foodGroup.destroyEach(); 
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
  }
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime= Math.ceil(frameCount/frameRate());
  text("Survival Time:" + survivalTime, 100, 50);
  
  
  monkey.collide(ground);
  
  spawnFood();
  spawnObstacles();

  drawSprites();
  
}


function spawnFood(){
  
  if(frameCount%80===0){
    banana= createSprite(400, 250, 40, 10);
    banana.y= random(120, 200);
    banana.velocityX= -5; 
    banana.lifetime= 300;
    banana.addImage(bananaImage);
    banana.scale= 0.1; 
    monkey.depth= banana.depth+1;
    
    foodGroup.add(banana);
  }
  
}


function spawnObstacles(){
  
  if(frameCount%80===0){
    
    obstacle= createSprite(400, 320, 10, 40);
    obstacle.velocityX= -6;
    obstacle.addImage(obstaceImage);
    obstacle.scale= 0.1; 
    obstacle.lifetime= 300; 
    
    obstacleGroup.add(obstacle);
    
  }
  
}



