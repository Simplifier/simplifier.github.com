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
  camera();
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
}

void keyReleased() {
  if (key == ' ') {
    isShooting = true;
    bulletPos = 0;
  }
}