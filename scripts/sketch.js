
/* VARIABLES */
let catcher, fallingObject;
let score = 0;
let backgroundImg, catcherImg, fallingObjectImg;

function preload() {
  backgroundImg = loadImage("IMG/backgroundImg.png");
  catcherImg = loadImage("IMG/catcherImg.png");
  fallingObjectImg = loadImage("IMG/fallingObjectImg.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Resize images
  backgroundImg.resize(windowWidth, windowHeight);
  catcherImg.resize(500, 0);
  fallingObjectImg.resize(300, 0);
  
  //Create catcher 
   catcher = new Sprite(catcherImg, width / 2, height - catcherImg.height / 2 * 0.5, "k");
  
  //Create falling object
  fallingObject = new Sprite(fallingObjectImg, 100, 0);
  fallingObject.velocity.y = 2;
  
}

function draw() {
  background(220);
  
  // Draw background image
  image(backgroundImg, 0, 0);
  
  // Draw directions to screen
  fill(0);
  textSize(12);
  text("Move the \ncatcher with the \nleft and right \narrow keys to \navoid the vape \nYou got this!.", width-100, 20);
  
  // If fallingObject reaches bottom, move back to random position at top
  if (fallingObject.y >= height) {
    fallingObject.y = 0;
    fallingObject.x = random(width);
    fallingObject.vel.y = random(1, 5);

    score -= 1;
  }
  // Move catcher
  if (kb.pressing("left")) {
    catcher.vel.x = -3;
  } else if (kb.pressing("right")) {
    catcher.vel.x = 3;
  } else {
    catcher.vel.x = 0;
  }

  // Stop catcher at edges of screen
if (catcher.x - catcherImg.width / 2 < 0) {
  catcher.x = catcherImg.width / 2;
} else if (catcher.x + catcherImg.width / 2 > width) {
  catcher.x = width - catcherImg.width / 2;
}

  // If fallingObject collides with catcher, move back to random position at top
  if (fallingObject.collides(catcher)) {
    fallingObject.y = 0;
    fallingObject.x = random(width);
    fallingObject.vel.y = random(1, 5);
    fallingObject.direction = "down";
    score += 1;
  }

  // Draw the score to screen
  stroke(1);
  fill(255);
  textSize(20);
  text("Score = " + score, 10, 30);

  // Winning screen
  if (score < 0){
    
  background(224, 224, 224);
    // Draw sprites off of screen
  catcher.pos = { x: 600, y: -300 };
  fallingObject.pos = { x: -100, y: 0 };

  noStroke();
  fill(0);
  text("You took the first step towards healing!", width / 2 - 50, height / 2 - 30);
  textSize(12);
  text("Click the mouse anywhere to play again.", width / 2 - 120, height / 2);

    if (mouseIsPressed) {
      restart();
    }
    
  }

  // Check to see if player won
  if (score == 10) {
    youWin();

    // Restart the game if player clicks the mouse
    if (mouseIsPressed) {
      restart();
    }
  }

}

/* FUNCTIONS */

function youWin() {
  background(224, 224, 224);

  // Draw sprites off of screen
  catcher.pos = { x: 600, y: -300 };
  fallingObject.pos = { x: -100, y: 0 };

  // Draw end of game text
  noStroke();
  textSize(20);
  fill(0);
  text("You gave in.", width / 2 - 50, height / 2 - 30);
  textSize(12);
  text("Click the mouse anywhere to play again.", width / 2 - 120, height / 2);
  
  // Create a button
  let buttonX = width / 2 - 50;
  let buttonY = height / 2 + 20;
  let buttonWidth = 100;
  let buttonHeight = 40;
  fill(255);
  rect(buttonX, buttonY, buttonWidth, buttonHeight);
  fill(0);
  textSize(16);
  text("Leave", buttonX + 25, buttonY + 25);

  // Check if the button is clicked
  if (mouseIsPressed && mouseX > buttonX && mouseX < buttonX + buttonWidth && mouseY > buttonY && mouseY < buttonY + buttonHeight) {
    window.location.href = 'resource.html'; // Replace 'your_html_page.html' with your actual HTML page URL
  }
}

// Spicy 
function restart() {
  // Reset score
  score = 0;

  // Reset sprites
  catcher.pos = { x: 200, y: 380 };
  fallingObject.y = 0;
  fallingObject.x = random(width);
  fallingObject.velocity.y = random(1, 5);
  fallingObject.direction = "down";
}
