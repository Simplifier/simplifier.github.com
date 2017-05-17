new p5(function(p) {
  p.setup = function () {
    p.createCanvas(480, 200);
    p.noStroke(); 
    p.rectMode(p.CENTER);

    var cell = 8;

    p.background(0);

    for (var x = 0; x < p.width; x += cell) {
      for (var y = 0; y < p.height; y += cell) {
        var r = p.random(cell);
        if (p.random(1) < 0.5) {
          p.fill(0, 155, 255);
          p.ellipse(x + cell/2, y + cell/2, r, r);
        } else {
          p.fill(155, 25, 0);
          p.rect(x + cell/2, y + cell/2, r, r);
        }
      }
    }
  }
});

new p5(function(p) {
  var hero;
  var ground;
  var bullet;

  var angle = 90;
  var pos = -70;
  var isShooting;
  var bulletPos;

  var aimX;
  var aimY;

  var score = 0;

  p.setup = function () {
    hero = loadImage("pix/engineer.png");
    ground = loadImage("pix/ground.png");
    bullet = loadImage("pix/big shot.png");

    aimX = random(150, width);
    aimY = random(height);
    noStroke();
    fill(#CEA75E);
    textSize(36);
    textAlign(LEFT, TOP);
  }

  p.draw = function () {
    image(ground, 0, 0);
    ellipse(aimX, aimY, 50, 50);
    
    pushMatrix();
    translate(50, height / 2 - 42);
    rotate(radians(angle));

    if (isShooting) {
      image(bullet, -7, -110 + bulletPos, 61, 100);
      bulletPos -= 15;

      float x = modelX(24, -79 + bulletPos, 0);
      float y = modelY(24, -79 + bulletPos, 0);

      if (dist(x, y, aimX, aimY) < 25) {
        isShooting = false;
        aimX = random(150, width);
        aimY = random(height);
        score += 10;
      }
      
      if(x < 0 || x > width || y < 0 || y > height) {
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

  p.draw = function () {
    if (key == ' ') {
      isShooting = true;
      bulletPos = 0;
    }
  }
});

onload = function() {
  var tasks = document.getElementsByClassName('task');
  var canvases = document.getElementsByTagName('canvas');
  
  var len = tasks.length;
  for (var i = 0; i < len; i++) {
    insertAfter(canvases[i], tasks[i]);
  }
}

function insertAfter(elem, refElem) {
  return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
}