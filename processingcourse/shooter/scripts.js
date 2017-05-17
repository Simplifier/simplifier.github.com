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
    p.createCanvas(800, 800, p.WEBGL);
    hero = p.loadImage("pix/engineer.png");
    ground = p.loadImage("pix/ground.png");
    bullet = p.loadImage("pix/big shot.png");

    aimX = p.random(150, p.width);
    aimY = p.random(p.height);
    p.noStroke();
    p.fill('#CEA75E');
    p.textSize(36);
    p.textAlign(LEFT, TOP);
  }

  p.draw = function () {
    p.image(ground, 0, 0);
    p.ellipse(aimX, aimY, 50, 50);
    
    p.pushMatrix();
    p.translate(50, height / 2 - 42);
    p.rotate(p.radians(angle));

    if (isShooting) {
      p.image(bullet, -7, -110 + bulletPos, 61, 100);
      bulletPos -= 15;

      var x = p.modelX(24, -79 + bulletPos, 0);
      var y = p.modelY(24, -79 + bulletPos, 0);

      if (p.dist(x, y, aimX, aimY) < 25) {
        isShooting = false;
        aimX = p.random(150, p.width);
        aimY = p.random(p.height);
        score += 10;
      }
      
      if(x < 0 || x > p.width || y < 0 || y > p.height) {
        isShooting = false;
        score -= 5;
      }
    }

    p.image(hero, -41, -70, 82, 95);
    p.ellipse(24, -79, 4, 4);

    if (p.keyPressed) {
      if (p.keyCode == p.LEFT) {
        angle--;
      } else if (keyCode == p.RIGHT) {
        angle++;
      }
    }
    
    p.popMatrix();
    p.text(score, 10, 5);
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