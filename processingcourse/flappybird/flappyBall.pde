//состояние игры
//1 - стартовый экран, 0 - игра
int gamestate = 1;

int score = 0;
int highScore = 0;

int y;
int speedY = 0;

int wallX;
int gapWallY;

void setup() {
  size(360, 700);
  fill(0);
  textSize(40);
}

void draw() {
  background(255);
  if (gamestate == 0) {
    speedY = speedY + 1;
    y = y + speedY;

    //рисуем верхнюю и нижнюю стены
    rectMode(CENTER);
    rect(wallX, gapWallY - 500, 45, 800);
    rect(wallX, gapWallY + 500, 45, 800);

    //если стена уехала влево за пределы экрана,
    //то генерируем новую справа
    if (wallX < 0) {
      wallX = width;
      gapWallY = (int)random(200, height-200);
    }

    //когда стена проезжает половину экрана,
    //засчитывается +1 балл
    if (wallX == width/2) {
      score = score + 1;
      highScore = max(score, highScore);
    }

    //если птица сталкивается со стеной или улетает выше/ниже экрана,
    //то переходим к стартовому экрану
    if (y>height || y<0 || (abs(width/2-wallX)<25 && abs(y-gapWallY)>100)) {
      gamestate=1;
    }

    wallX = wallX - 6;

    //рисуем птицу
    ellipse(width/2, y, 30, 30);
    //выводим очки
    text(str(score), width/2-15, 550);
  } else {
    rectMode(CENTER);
    rect(width/2, height/2, 100, 100);
    text("High Score: "+highScore, 50, 450);
  }
}

void mousePressed() {
  //по клику птичке придается импульс вверх
  speedY = -17;

  //если мы на стартовом экране,
  //инициализируем игру по клику
  if (gamestate==1) {
    //стартовая позиция стен
    wallX = 600;
    gapWallY = y = height/2;

    gamestate = score = 0;
  }
}