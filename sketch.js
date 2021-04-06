var space, star, starG, rocket, moon, moonG, gameOver;
var spaceImg, starImg, rocketImg, moonImg, gameOverImg;


var gameState = "play";
var stars = 0;
var score = 0;

function preload() {
  spaceImg = loadImage("space.png");
  rocketImg = loadAnimation("rocket.png");
  moonImg = loadImage("moon2.png");
  starImg = loadImage("star2.png");
  gameOverImg = loadImage("gameOver2.png");

}

function setup() {
  createCanvas(windowWidth,windowHeight);

  space = createSprite(width/2,height/2);
  space.addImage(spaceImg);
  space.velocityY = 1;

  rocket = createSprite(width/2,height/2);
  rocket.addAnimation("rocket",rocketImg);
  rocket.scale = 0.08;
rocket.setCollider("circle",5,10,450);
  rocket.debug=false;             
  
  gameOver = createSprite(width/2,height/2);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
 

  starG = new Group();
  moonG = new Group();

}

function draw() {
  
  if (gameState === "play") {
gameOver.visible=false;
    score = score + Math.round(getFrameRate() / 60);
    if (space.y > 400) {
      space.y = 300;
    }
    if (keyDown("space")) {
      rocket.velocityY = -2;
    }
    rocket.velocityY = rocket.velocityY + 0.8;
    if (keyDown("left_arrow")) {
      rocket.x = rocket.x - 3;

    }
    if (keyDown("right_arrow")) {
      rocket.x = rocket.x + 3;
    }
   
    if (starG.bounceOff(rocket)) {
      stars+=1;
      starG.destroyEach();

    }
     if (moonG.isTouching(rocket) || rocket.y > 600) {
      gameState = "end";
       gameOver.visible = true;
       moonG.destroyEach();
       starG.destroyEach();
    }

    spawnMoon();
    spawnStar();

    drawSprites();

    textSize(25);
    fill("yellow");
    text("Score: " + score, 30, 70);

    textSize(25);
    fill("yellow");
    text("stars: " + stars, 30, 40);
  }
   else if (gameState === "end") {
   
    space.velocityY = 0;
       moonG.destroyEach();
    starG.destroyEach();
      
    
  if (mousePressedOver(gameOver)) {
      reset();
    }

}
}

function spawnStar() {

  if (frameCount % 190 === 0) {
    star = createSprite(180, 40);
    star.x = Math.round(random(100, 400));
    star.addImage(starImg);
    star.scale = 0.01;
    star.velocityY = 1;
    star.setLifetime = 800;
    starG.add(star);
  }


}

function spawnMoon() {

  if (frameCount % 190 === 0) {
    moon = createSprite(200, 60);
    moon.x = Math.round(random(100, 500));
    moon.addImage(moonImg);
    moon.scale = 0.03;
    moon.velocityY = 1;
    moon.setLifetime = 800;
    moonG.add(moon);

  }

}

function reset() {
  gameState = "play";
  gameOver.visible = false;
  starG.destroyEach();
  moonG.destroyEach();
  score = 0;
  stars = 0;
 rocket.changeAnimation("rocket",rocketImg);
}