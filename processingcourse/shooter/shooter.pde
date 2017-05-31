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
  size(800, 800);
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
  
  pushMatrix();
  translate(50, height / 2 - 42);
  rotate(radians(angle));

  if (isShooting) {
    image(bullet, -7, -110 + bulletPos, 61, 100);
    bulletPos -= 15;

    PVector v = getPosition(24, -79 + bulletPos);

    // check hit
    if (dist(v.x, v.y, aimX, aimY) < 25) {
      isShooting = false;
      aimX = (int)random(150, width);
      aimY = (int)random(height);
      score += 10;
    }
    
    if(v.x < 0 || v.x > width || v.y < 0 || v.y > height) {
      isShooting = false;
      score -= 5;
    }
  }

  image(hero, -41, -70, 82, 95);
  ellipse(24, -79, 4, 4);

  if (keyPressed) {
    if (keyCode == LEFT) {
      angle--;
    } else if (keyCode == RIGHT) {
      angle++;
    }
  }
  
  popMatrix();
  text(score, 10, 5);
}

void keyReleased() {
  if (key == ' ') {
    isShooting = true;
    bulletPos = 0;
  }
}

PVector getPosition(int x, int y) {
  pushMatrix();
  translate(x, y);
  PMatrix2D m = (PMatrix2D)getMatrix();
  popMatrix();
  return new PVector(m.m02, m.m12);
}