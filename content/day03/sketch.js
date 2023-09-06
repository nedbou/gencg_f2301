let gridSize = 24;
let squareSize;
let colors = [];

function setup() {
  createCanvas(400, 400);
  squareSize = width / gridSize;

  // Initialize the colors for each hour
  for (let i = 0; i < 24; i++) {
    colors.push(color(random(255), random(255), random(255)));
  }
}

function draw() {
  background(220);
  noStroke();

  // Get the current time
  let h = hour();
  let m = minute();
  let s = second();

  // Draw the grid
  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      let index = x + y * gridSize;
      fill(colors[index]);
      rect(x * squareSize, y * squareSize, squareSize, squareSize);
    }
  }

  // Highlight the current hour
  let currentHour = h % 24;
  fill(255, 0, 0, 100);
  rect(currentHour * squareSize, 0, squareSize, height);

  // Update the grid's inner cells every full minute
  if (s === 0) {
    for (let x = 1; x < gridSize - 1; x++) {
      for (let y = 1; y < gridSize - 1; y++) {
        let index = x + y * gridSize;
        colors[index] = color(random(255), random(255), random(255));
      }
    }
  }
}
