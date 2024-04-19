//Move the catcher(user) with the left and right arrow keys to catch the falling object(benefits of quitting)

let catcher, fallingObject;
let score = 0;
let backgroundImg, catcherImg, fallingObjectImg;

/*PRELOAD LOADS FILES*/
function preload() {
  backgroundImg = loadImage();
  catcherImg = loadImage();
  fallingObjectImg = loadImage();
  )

  //Resize images 
  backgroundImg.resize();
  catcherImg.resize();
  fallingObjectImg.resize();

  //Create catcher 
  catcher = new Sprite();
  catcher.color = color();

  //Create falling object
  fallingObject = new Sprite();
  fallingObject.color = color();
  fallingObject.velocity.y = ;

}


/*DRAW LOOP REPEATS*/
function draw(){
  background();

  //Draw background image 
  image();

  //If fallingObject reaches bottom, move back to random position at top
  if (fallingObject.y >= height) {
    fallingObject.y = 0;
    fallingObject.x = random(width);
    fallingObject.vel.y = random(1, 5);

    //Spicy
    score -= 1;
  }

  //Move catcher 
  if (kb.pressing("left")) {
    catcher.vel.x = -3;
  } else if (kb.pressing("right")) {
    catcher.vel.x = 3;
  } else {
    catcher.vel.x = 0;
  }

  //Stop catcher at edges of screen 
  if (catcher.x < 50) {
    catcher.x = 50;
  } else if (catcher.x > 350) {
    catcher.x = 350;
  }

  //If fallingObject collides with catcher, move back to random position at top 
  if (fallingObject.collides(catcher)) {
    fallingObject.y = 0;
    fallingObject.x = random(width);
    fallingObject.vel.y = random(1, 5);
    fallingObject.direction = "down";
    score += 1;
  }

  //Draw the score to screen 
  stroke(1);
  fill(255);
  textSize(20);
  text("Score = " + score, , );

  //Losing Screen
  if (score < 0) {
    background ();

    //Draw sprites off of screen
    catcher.pos = {x:, y:};
    fallingObject.pos = {x:, y:};

    noStroke();
    fill(0);
    text("",);
    textSize();
    text("",);

    if (mouseIsPressed){
      restart();
    }
  }

  //Check to see if player won
  if (score == 10) {
    youWin();

    //Restart the game if player clicks the mouse
    if (mouseIsPressed) {
      restart();
    }
  }
}

/* FUNCTIONS */

function youWin() {
  background();

  //Draw sprites off of screen 
  catcher.pos = {};
  fallingObject.pos = {};

  //Draw end of game text 
  noStroke();
  textSize();
  fill(0);
  text();
  textSize();
  text();
}
  
function restart() {
  //Reset score 
  score = 0; 

  //Reset sprites 
  catcher.pos = {};
  fallingObject.y = 0; 
  fallingObject.x = random(width);
  fallingObject.velocity.y = random();
  fallingObject.direction = "";
}
