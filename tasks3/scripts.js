new p5(function(p) {
  p.setup = function () {
    p.createCanvas(480, 200);
    p.noStroke();
  }

  //счетчик кадров
  var count = 1;
  p.draw = function () {
    p.background(0);

    //если количество кадров без остатка делится на 30,
    //то отрисовываем круг
    if (count % 30 == 0) {
      p.fill('#A65BB7');
      p.ellipse(p.width/2, p.height/2, 30, 30);
    }

    p.fill(255);
    for (var i = 0; i < count / 30; i++) {
      p.ellipse(8 + i * 15, 8, 10, 10);
    }

    //увеличиваем счетчик в конце кадра
    count++;
  }
});

new p5(function(p) {
  p.setup = function () {
    p.createCanvas(480, 120);
    p.strokeWeight(4);
    p.stroke(0, 102);
    p.background(200);
  }

  //определение функции draw обязательно,
  //хоть она здесь и пустая.
  //без нее события не будут срабатывать
  p.draw = function () {
    
  }

  //координаты первой точки по которой кликнули
  var firstPoint;

  //переменная для запоминания того, что мы уже раз кликнули по холсту
  var clicked = false;

  //mouseClicked автоматически вызывается ядром языка
  //по событию клика мыши
  p.mouseClicked = function () {
    //если clicked == true, то мы щелкнули по холсту второй раз
    //и можно отрисовать отрезок из предыдущей точки в текущую.
    //иначе - это первый клик и надо  отрисовать начальную точку
    if(clicked){
      p.line(firstPoint.x, firstPoint.y, p.mouseX, p.mouseY);
    } else {
      p.point(p.mouseX, p.mouseY);
    }
    
    //в конце функции запоминаем координаты мыши,
    //чтобы использовать их при следующем клике
    firstPoint = new p.createVector(p.mouseX, p.mouseY);
    
    //после первого клика изменяем значение флага clickied на true,
    //чтобы запомнить, что клик произошел.
    //после второго клика возращаем значение флага clickied в исходное состояние false,
    //чтобы забыть о первом отрисованном отрезке и рисовать следующий заново
    if(clicked == false){
      clicked = true;
    } else {
      clicked = false;
    }
  }
});

new p5(function(p) {
  var x = 240;
  var y = 0;

  var speed = 0;   // скорость
  var gravity = 0.1;  // ускорение
  var lostEnergy = 0.95; // коэффициент потери скорости при ударе о землю

  //массив для хранения координат ячеек по которым мы кликнули 
  var points = [];
  //счетчик кликов
  var clickCount = 0;

  p.setup = function () {
    p.createCanvas(480, 270);
    p.noStroke();
  }

  p.draw = function () {
    // очистим экран
    p.background(255);

    // отрисуем мяч
    p.fill('#E3983C');
    p.ellipse(x, y, 30, 30);

    // добавим скорость к текущему положению
    y = y + speed;

    // добавим ускорение к скорости
    speed = speed + gravity;

    // когда шар достиг земли,
    // меняем скорость на противоположную
    if (y > p.height) {
      speed = speed * -lostEnergy;
      y = p.height;
    }

    for (var i = 0; i < clickCount; i++) {
      var point = points[i];
      p.fill(0);
      p.ellipse(point.x, point.y, 30, 30);
    }
  }

  p.mouseClicked = function () {
    points[clickCount] = p.createVector(p.mouseX, p.mouseY);

    clickCount++;
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