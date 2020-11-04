var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var ground, groundI;
var survivalTime=0;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}

function setup() {
  createCanvas(500, 500);

  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(400, 350, 1000, 10);
  ground.shapeColor = ("brown");

  console.log(ground.x);

  survivalTime = 0;
  
  obstacleGroup = new Group();
  FoodGroup = new Group();
}


function draw() {
  background("lightblue");
  
  ground.velocityX = -6;

  if (keyDown("space") && monkey.y >= 120) {
    monkey.velocityY = -12;
  }

  monkey.velocityY = monkey.velocityY + 0.8

  monkey.collide(ground);
  if(ground.x<0){
    ground.x = ground.width / 2;
  }
  
  
  
  spawnFood();
  spawnObstacle();
  
  //monkey.collide(obstacleGroup);
  
  
  drawSprites();
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time: "+ survivalTime,100,50);
  
  if(monkey.isTouching(obstacleGroup)){
    obstacleGroup.setVelocityXEach(0);
    monkey.velocityX = 0;
    FoodGroup.setVelocityXEach(0);
    ground.velocityY = 0;    
  }
   
}

function spawnFood() {

  if (frameCount % 80 === 0) {
    var banana = createSprite(500, 200, 50, 50);
    banana.y = Math.round(random(120, 200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime = 200; 
    FoodGroup.add(banana);
  }
}

function spawnObstacle() {

  if (frameCount % 300 === 0) {
    var stone = createSprite(500, 328, 50, 50);
    //banana.y = Math.round(random(120, 200));
    stone.addImage(obstacleImage);
    stone.scale = 0.1;
    stone.velocityX = -3;
    stone.lifetime = 200; 
    obstacleGroup.add(stone);
  }
}