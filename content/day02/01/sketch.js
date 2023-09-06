var tileCount = 20;


function setup() {
  createCanvas(600, 600);
  noFill();
}

function draw() {
  translate(width / tileCount / 2, height / tileCount / 2);

  background(255);
  strokeWeight(mouseY / 20);

  for (var gridY = 0; gridY < tileCount; gridY++) {
    for (var gridX = 0; gridX < tileCount; gridX++) {
      var posX = (width / tileCount) * gridX;
      var posY = (height / tileCount) * gridY;

      var shiftX = random(-mouseX, mouseX) / 20;
      var shiftY = random(-mouseX, mouseX) / 20;

      var circleResolution = int(map(mouseY, 0, height, 2, 80));
      var radius = mouseX - width / 2;
      var angle = TAU / circleResolution;

      for (var i = 0; i <= circleResolution; i++) {
        var x = cos(angle * i) * radius;
        var y = sin(angle * i) * radius;
        line(posX + shiftX, posY + shiftY, mouseY / 15, mouseY / 15);
        (posX + shiftX, posY + shiftY, mouseY / 15, mouseY / 15)
      }
    }
  }
}

function keyReleased() {
  if (key == "s" || key == "S") saveCanvas(gd.timestamp(), "png");
}
