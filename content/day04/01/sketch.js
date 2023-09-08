let mic;
let fft;
let isPlaying = false;

function setup() {
  let cnv = createCanvas(400, 200);
  cnv.mouseClicked(togglePlay);
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  mic.amp(0.2);
  fft.setInput(mic); // Set the microphone as the input for FFT
  noFill();
}

function draw() {
  background(220);

  if (isPlaying) {
    let spectrum = fft.analyze();
    noStroke();
    fill(255, 0, 255);
    for (let i = 0; i < spectrum.length; i++) {
      let x = map(i, 0, spectrum.length, 0, width);
      let h = -height + map(spectrum[i], 0, 255, height, 0);
      rect(x, height, width / spectrum.length, h);
    }

    let waveForm = fft.waveform();
    beginShape();
    stroke(255, 0, 0); // Red stroke color
    for (let i = 0; i < waveForm.length; i++) {
      let x = map(i, 0, waveForm.length, 0, width);
      let y = map(waveForm[i], -1, 1, 0, height);
      vertex(x, y);
    }
    endShape();
  }

  text('tap to play', 20, 20);
}

function togglePlay() {
  if (!isPlaying) {
    mic.start();
    isPlaying = true;
  } else {
    mic.stop();
    isPlaying = false;
  }
}
