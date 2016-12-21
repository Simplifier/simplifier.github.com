float rectAX = 20;
float rectAY = 50;
int rectAW = 100;
int rectAH = 50;
boolean rectAPressed;

float rectBX = 300;
float rectBY = 10;
int rectBW = 70;
int rectBH = 150;
boolean rectBPressed;

float relativeX;
float relativeY;

String message;

void setup() {
  size(480, 200);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(18);
}

void draw() {
  if (mousePressed) {
    if (rectAPressed) {
      rectAX = mouseX - relativeX;
      rectAY = mouseY - relativeY;
    } else if (rectBPressed) {
      rectBX = mouseX - relativeX;
      rectBY = mouseY - relativeY;
    }
  } else {
    rectAPressed = rectBPressed = false;
  }

  float area = getIntersectionArea(rectAX, rectAY, rectAW, rectAH, rectBX, rectBY, rectBW, rectBH);
  if (area == -1) {
    message = "Прямоугольники не пересекаются!";
  } else {
    message = "Площадь пересечения прямоугольников: " + area;
  }

  display();
}

void mousePressed() {
  if (isPointInRect(mouseX, mouseY, rectBX, rectBY, rectBW, rectBH)) {
    rectBPressed = true;
    relativeX = mouseX - rectBX;
    relativeY = mouseY - rectBY;
  } else if (isPointInRect(mouseX, mouseY, rectAX, rectAY, rectAW, rectAH)) {
    rectAPressed = true;
    relativeX = mouseX - rectAX;
    relativeY = mouseY - rectAY;
  }
}

void display() {
  background(30);

  fill(#FFE731);
  rect(rectAX, rectAY, rectAW, rectAH);

  fill(#316DFF, 200);
  rect(rectBX, rectBY, rectBW, rectBH);

  fill(255);
  text(message, 5, 5);
}

boolean isPointInRect(float pointX, float pointY, float rectX, float rectY, int rectWidth, int rectHeight) {
  boolean xInRect = pointX >= rectX && pointX <= rectX + rectWidth;
  boolean yInRect= pointY >= rectY && pointY <= rectY + rectHeight;
  return xInRect && yInRect;
}

float getIntersectionArea(float rectAX, float rectAY, int rectAWidth, int rectAHeight, float rectBX, float rectBY, int rectBWidth, int rectBHeight) {
  float xIntersection = getIntersection(rectAX, rectAX + rectAWidth, rectBX, rectBX + rectBWidth);
  float yIntersection = getIntersection(rectAY, rectAY + rectAHeight, rectBY, rectBY + rectBHeight);

  if (xIntersection <= 0 || yIntersection <= 0) {
    return -1;
  } else {
    return xIntersection * yIntersection;
  }
}

float getIntersection(float a, float b, float c, float d) {
  if (a > c) {
    if (b > d) {
      return d - a;
    } else {
      return b - a;
    }
  } else {
    if (d > b) {
      return b - c;
    } else {
      return d - c;
    }
  }
}