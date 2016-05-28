new p5(function(p) {
  var button = false;
  var w = 100;
  var h = 75;

  p.setup = function () {
    p.createCanvas(480, 200); 
    p.noStroke();
    p.fill('#A3E541');
  }


  p.draw = function () {
    // The button is pressed if (mouseX,mouseY) is inside the rectangle and mousePressed is true.
    if ((p.mouseX > 0) && (p.mouseX < w) && (p.mouseY > 0) && (p.mouseY < h) && p.mouseIsPressed) {
      button = true;
    } else {
      button = false;
    }

    if (button) {
      p.background(255);
    } else {
      p.background(0);
    }

    p.rect(0, 0, w, h);
  }
});

new p5(function(p) {
  p.setup = function () {
    p.createCanvas(480, 200);
    p.strokeWeight(2);
  }

  var count = 1;
  p.draw = function () {
    if(count % 2 == 0){
      p.line(p.pmouseX, p.pmouseY, p.mouseX, p.mouseY);
    }
    
    count++;
  }
});

new p5(function(p) {
  var GRID_SIZE = 50;  // размер ячейки сетки (константа)

  p.setup = function () {
    p.createCanvas(500,500);
  }

  p.draw = function () {
    //очистим экран
    p.background(255);
    
    p.stroke(0,150,255, 50);
    //рисуем вертикальные линии сетки
    for (var x=0; x<p.width; x+=GRID_SIZE) {
      p.line(x,0, x,p.height);
    }
    p.line(x-1,0, x-1,p.height);
    //рисуем горизонтальные линии сетки
    for (var y=0; y<p.height; y+=GRID_SIZE) {
      p.line(0,y, p.width,y);
    }
    p.line(0,y-1, p.width,y-1);
    
    // зная положение мыши и размер ячейки,
    //вычисляем номер ячейки по горизонтали и вертикали.
    //значения автоматически округлятся до целого
    //при записи в целочисленные переменные
    var numX = Math.floor(p.mouseX/GRID_SIZE);
    var numY = Math.floor(p.mouseY/GRID_SIZE);
    
    //зная номер ячейки и ее размер,
    //можем вычислить ее координаты
    var x = numX * GRID_SIZE;
    var y = numY * GRID_SIZE;
    
    var red = numX * 255 / 9;
    var green = numY * 255 / 9;
    
    p.noStroke();
    p.fill(red,green,0);
    //отрисуем квадрат в вычислененых координатах
    p.rect(x,y, GRID_SIZE,GRID_SIZE);
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