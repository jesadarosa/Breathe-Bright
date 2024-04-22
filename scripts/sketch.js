/* VARIABLES */
let catcher, fallingObject;
let score = 0;
let backgroundImg, catcherImg, fallingObjectImg;
let buttonWidth, buttonHeight, buttonX, buttonY; // Define button dimensions and position variables

function preload() {
  backgroundImg = loadImage("IMG/backgroundImg.png");
  catcherImg = loadImage("IMG/catcherImg.png");
  fallingObjectImg = loadImage("IMG/fallingObjectImg.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Resize images
  backgroundImg.resize(windowWidth, windowHeight);
  catcherImg.resize(300, 0); // Adjusted catcher width
  fallingObjectImg.resize(300, 0);
  
  // Define button dimensions and position
  buttonWidth = 150;
  buttonHeight = 50;
  buttonX = width / 2 - buttonWidth / 2;
  buttonY = height / 2 + 20;
  
  // Create catcher
  catcher = new Sprite(catcherImg, width / 2, height - catcherImg.height / 2 * 0.5, "k");
  
  // Create falling object
  fallingObject = new Sprite(fallingObjectImg, 100, 0);
  fallingObject.velocity.y = 2;
}

function draw() {
  background(220);
  
  // Draw background image
  image(backgroundImg, 0, 0);
  
  // Draw directions to screen
  fill(0);
  textSize(20);
  text("Move the catcher \nwith the left \nand right \narrow keys to \ncatch the vape. \nFind out what \nhappens next.", width - 150, 20); // Adjusted text position
  
  // Ensure fallingObject stays within screen boundaries
  if (fallingObject.x < 0) {
    fallingObject.x = 0;
  } else if (fallingObject.x > width - fallingObjectImg.width) {
    fallingObject.x = width - fallingObjectImg.width;
  }
  
  // If fallingObject reaches bottom, move back to random position at top
  if (fallingObject.y >= height) {
    fallingObject.y = 0;
    fallingObject.x = random(width);
    fallingObject.velocity.y = random(1, 5); // Fixed typo
    score -= 1; // Moved to inside the if condition
  }
  
  // Move catcher
  if (keyIsDown(LEFT_ARROW)) {
    catcher.vel.x = -3;
  } else if (keyIsDown(RIGHT_ARROW)) {
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
    fallingObject.velocity.y = random(1, 5); // Fixed typo
    score += 1;
  }

  // Draw the score to screen
  fill(0);
  textSize(20);
  text("Score = " + score, 10, 30);
  
  // Medium Losing screen
  if (score < 0) {
    background(224, 224, 224);
    catcher.pos = { x: 600, y: -300 };
    fallingObject.pos = { x: -100, y: 0 };
    noStroke();
    fill(0);
    textAlign(CENTER, CENTER);
    text("You took the first step towards healing!", width / 2 - 50, height / 2 - 30);
    textSize(12);

    // Draw white border
    stroke(255);
    strokeWeight(2);
    fill(255);
    rect(buttonX, buttonY, buttonWidth, buttonHeight);

    // Draw text on the button
    fill(0);
    noStroke();
    textSize(16);
    textAlign(CENTER, CENTER);
    text("Leave", buttonX + buttonWidth / 2, buttonY + buttonHeight / 2);
    
    // Check if the button is clicked
    if (mouseIsPressed && mouseX > buttonX && mouseX < buttonX + buttonWidth && mouseY > buttonY && mouseY < buttonY + buttonHeight) {
      window.location.href = 'resource.html'; 
    }
      
    if (mouseIsPressed) {
      restart();
    }
  }

  // Check if player won
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
  catcher.pos = { x: 600, y: -300 };
  fallingObject.pos = { x: -100, y: 0 };
  noStroke();
  textSize(20);
  fill(0);
  text("You gave in...", width / 2, height / 2 - 30);
  textSize(12);
  text("Click the mouse anywhere to play again.", width / 2, height / 2);

  // Draw white border
  stroke(255);
  strokeWeight(2);
  fill(255);
  rect(buttonX, buttonY, buttonWidth, buttonHeight);

  // Draw text on the button
  fill(0);
  noStroke();
  textSize(16);
  textAlign(CENTER, CENTER);
  text("Leave", buttonX + buttonWidth / 2, buttonY + buttonHeight / 2);
  
  // Check if the button is clicked
  if (mouseIsPressed && mouseX > buttonX && mouseX < buttonX + buttonWidth && mouseY > buttonY && mouseY < buttonY + buttonHeight) {
    window.location.href = 'resource.html'; 
  }
}


function restart() {
  // Reset score
  score = 0;
  // Reset sprites
  catcher.pos = {x: width / 2, y: height - catcherImg.height * 0.5};
  fallingObject.y = 0;
  fallingObject.x = random(width);
  fallingObject.velocity.y = random(1, 5);
}


