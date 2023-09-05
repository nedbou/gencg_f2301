
  function setup() {
  createCanvas(500, 500);
  
  rect(30, 50, 55, 55);
  triangle(30, 50, 58, 20, 86, 50);
  line(30, 50, 85, 105);
  line(30, 105, 85, 50);

  ellipse(70, 200, 120, 30);
  beginShape();
  vertex(26, 150);
  vertex(115, 150);
  vertex(100, 200);
  vertex(40, 200);
  endShape(CLOSE);
  ellipse(70, 146, 90, 30);

  rect(250, 150, 10, 150);
  rect(185, 150, 150, 10);
  quad(185, 150, 335, 150, 300, 110, 220, 110)

}