let video;
let canvas;
let detections = [];

let eyeSize = 20; // Initial size of the animated eyes
let eyeSpeed = 2; // Speed of eye movement

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  canvas = createGraphics(width, height);

  // Load face detection models
  Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models')
  ]).then(startDetection);

  noStroke();
  fill(0, 255, 0);
}

function startDetection() {
  setInterval(detectFaces, 1000); // Adjust the interval as needed
}

async function detectFaces() {
  const { width, height } = video;
  const results = await faceapi.detectAllFaces(video.elt, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();

  canvas.clear();

  for (let result of results) {
    const { x, y, width, height } = result.detection.box;
    canvas.stroke(0, 255, 0);
    canvas.noFill();
    canvas.rect(x, y, width, height);

    // Calculate eye positions within the detected face
    const leftEyeX = result.landmarks.getLeftEye()[0]._x;
    const leftEyeY = result.landmarks.getLeftEye()[0]._y;
    const rightEyeX = result.landmarks.getRightEye()[5]._x;
    const rightEyeY = result.landmarks.getRightEye()[5]._y;

    // Update eye size and positions for animation
    eyeSize += random(-eyeSpeed, eyeSpeed);
    const leftEyeSize = eyeSize;
    const rightEyeSize = eyeSize;

    // Draw animated eyes
    canvas.fill(255);
    canvas.ellipse(leftEyeX, leftEyeY, leftEyeSize, leftEyeSize);
    canvas.ellipse(rightEyeX, rightEyeY, rightEyeSize, rightEyeSize);
  }
}

function draw() {
  image(video, 0, 0, width, height);
  image(canvas, 0, 0, width, height);
}
