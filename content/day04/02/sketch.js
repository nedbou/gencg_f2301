let mic;
let fft;
let isDrawing = false;
let prevX, prevY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  mic = new p5.AudioIn();
  mic.start();
  mic.amp(1); // Adjust the microphone input volume as needed
  fft = new p5.FFT();
  fft.setInput(mic); // Set the microphone as input for FFT
  background(220);
}

function draw() {
  let vol = mic.getLevel();
  let spectrum = fft.analyze();
  let mappedStrokeWeight = map(vol, 0, 0.1, 1, 10); // Adjust the stroke weight based on microphone input
  strokeWeight(mappedStrokeWeight);
  stroke(0); // Black color

  if (isDrawing) {
    line(prevX, prevY, mouseX, mouseY);
  }

  prevX = mouseX;
  prevY = mouseY;
}

function keyPressed() {
  if (keyCode === ENTER) {
    isDrawing = !isDrawing; // Toggle drawing on Enter key press
    if (!isDrawing) {
      // Clear the canvas when you stop drawing
      background(220);
    }
  }
}


