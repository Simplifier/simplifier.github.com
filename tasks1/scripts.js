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
  var x = 0;  // x location of square
  var y = 0;  // y location of square

  var speed = 5;  // speed of square

  // A variable to keep track of the square�s "state."  
  // Depending on the value of its state, it will either move right, down, left, or up.
  var state = 0;  

  p.setup = function () {
    p.createCanvas(480, 200);
  }

  p.draw = function () {
    p.background('#38B0E5');

    // Display the square
    p.noStroke();
    p.fill('#E5CC38');
    p.rect(x,y,19,19);

    // If the state is 0, move to the right.
    if (state == 0) {
      x = x + speed;
      // If, while the state is 0, it reaches the right side of the window, change the state to 1
      // Repeat this same logic for all states!?
      if (x > p.width-20) {
        x = p.width-20;
        state = 1;
      }
    } else if (state == 1) {
      y = y + speed;
      if (y > p.height-20) {
        y = p.height-20;
        state = 2;
      }
    } else if (state == 2) {
      x = x - speed;
      if (x < 0) {
        x = 0;
        state = 3;
      }
    } else if (state == 3) {
      y = y - speed;
      if (y < 0) {
        y = 0;
        state=0;
      }
    }
  }
});

new p5(function(p) {
  var ballSize =     10;    // diameter of the ball
  var ballX =      20;    // starting position
  var ballY =      10;
  var ballSpeedX = 2;     // speed
  var ballSpeedY = 2;

  p.setup = function () {
    p.createCanvas(480, 200);
  };

  p.draw = function () {
    p.background(230);

    // draw ball
    p.fill(0);
    p.noStroke();
    p.ellipse(ballX, ballY, ballSize, ballSize);

    // update ball position
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // bounce off edges of the window
    if (ballX - ballSize/2 < 0 || ballX + ballSize/2 > p.width) ballSpeedX *= -1;
    if (ballY - ballSize/2 < 0 || ballY + ballSize/2 > p.height) ballSpeedY *= -1;
  };
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