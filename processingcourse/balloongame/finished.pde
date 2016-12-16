int numBalloons = 5;

float[] balloonX = new float[numBalloons];
float[] balloonY = new float[numBalloons];
float[] balloonSize = new float[numBalloons];
color[] balloonColour = new color[numBalloons];
float[] balloonSpeed = new float[numBalloons];

String state;
final String START = "start";
final String GAME = "game";
final String GAME_OVER = "gameOver";

int score = 0;
int maxScore = 0;
int lives;
final int MAX_LIVES = 3;

boolean oldMousePressed = false;

void setup() {
  size(500, 500);
  noStroke();
  state = START;
}

void draw() {
  if (state == START) {
    showStartScreen();
  } else if (state == GAME) {
    showGameScreen();
  } else if (state == GAME_OVER) {
    showGameOverScreen();
  }
}

void mousePressed() {
  for (int i = 0; i < numBalloons; i++) {
    if (distance(mouseX, mouseY, balloonX[i], balloonY[i]) < balloonSize[i] / 2) {
      resetBalloon(i);
      score++;
    }
  }
}

void resetGame() {
  for (int i = 0; i < numBalloons; i++) {
    resetBalloon(i);
  }
  lives = MAX_LIVES;
  score = 0;
}

void resetBalloon(int index) {
  balloonSize[index] = random(50, 100);
  balloonX[index] = random(0, width);
  balloonY[index] = height + (balloonSize[index] / 2);
  balloonColour[index] = color(random(255), random(255), random(255));
  balloonSpeed[index] = random(1, 4);
}

float distance(float x1, float y1, float x2, float y2) {
  float deltaX = x2 - x1;
  float deltaY = y2 - y1;
  float dist = sqrt(deltaX * deltaX + deltaY * deltaY);
  return dist;
}

//state handlers
/////////////////

void showStartScreen() {
  background(#66cc33);
  fill(255);
  
  textSize(40);
  textAlign(CENTER, CENTER);
  text("Balloon Game", width / 2, height / 2);
  
  textSize(20);
  text("Press SPACE to start", width / 2, height / 2 + 50);

  if (keyPressed && key == ' ') {
    state = GAME;
    resetGame();
  }
}

void showGameScreen() {
  background(#6633cc);

  for (int i = 0; i < numBalloons; i++) {
    fill(balloonColour[i]);
    ellipse(balloonX[i], balloonY[i], balloonSize[i], balloonSize[i]);

    balloonY[i] -= balloonSpeed[i];

    boolean isBalloonOutOfScreen = balloonY[i] < -balloonSize[i] / 2;
    if (isBalloonOutOfScreen) {
      resetBalloon(i);
      lives--;
    }
  }
  
  if(lives <= 0) {
    state = GAME_OVER;
    maxScore = max(score, maxScore);
  }
  
  fill(255);
  textSize(20);
  textAlign(LEFT, TOP);
  text("Score: " + score, 10, 10);
  text("Lives: " + lives, 10, 40);
}

void showGameOverScreen() {
  background(#111111);
  fill(255);
  
  textAlign(CENTER, TOP);
  textSize(40);
  text("Game over :(", width / 2, 50);
  
  textAlign(LEFT, TOP);
  textSize(20);
  text("Score: " + score, 20, height / 2);
  text("Best Score: " + maxScore, 20, height / 2 + 30);
  textSize(18);
  text("Press SPACE to restart", 20, height / 2 + 70);

  if (keyPressed && key == ' ') {
    state = GAME;
    resetGame();
  }
}