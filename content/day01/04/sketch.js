let canvas video

function setup() {
  createCanvas(500, 500);
  rect(30, 50, 55, 55);
  triangle(30, 50, 58, 20, 86, 50);
  line(30, 50, 85, 105);
  line(30, 105, 85, 50);
}
  function draw() {
  ellipse(70, 200, 120, 30);
  beginShape();
  vertex(26, 150);
  vertex(115, 150);
  vertex(100, 200);
  vertex(40, 200);
  endShape(CLOSE);

  ellipse(70, 146, 90, 30);

}
  function draw() {
    rect(100, 350, 10, 150);
    rect(35, 350, 150, 10);
    quad(35, 350, 184, 350, 150, 320, 70, 320)

}
