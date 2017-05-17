PImage hero;
PImage ground;
PImage bullet;

int angle = 90;
int pos = -70;
boolean isShooting;
int bulletPos;

int aimX;
int aimY;

int score = 0;

void setup() {
  size(800, 800, P3D);
  hero = loadImage("pix/engineer.png");
  ground = loadImage("pix/ground.png");
  bullet = loadImage("pix/big shot.png");

  aimX = (int)random(150, width);
  aimY = (int)random(height);
  noStroke();
  fill(#CEA75E);
  textSize(36);
  textAlign(LEFT, TOP);
}

void draw() {
  image(ground, 0, 0);
  ellipse(aimX, aimY, 50, 50);
  
  //pushMatrix();
  //translate(50, height / 2 - 42);
  //rotate(radians(angle));
}

void keyReleased() {
  if (key == ' ') {
    isShooting = true;
    bulletPos = 0;
  }
}