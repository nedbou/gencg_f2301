let video;
let poseNet;
let noseX = 0;
let noseY = 0;
let eye1X = 0;
let eye1Y = 0;
let eye2X = 0;
let eye2Y = 0;
let eye1Size = 50;
let eye2Size = 50;
let debug;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on("pose", gotPoses);
  debug = true;
}

function gotPoses(poses) {
  if (poses.length > 0) {
    let newX = poses[0].pose.keypoints[0].position.x;
    let newY = poses[0].pose.keypoints[0].position.y;
    let eyeX = poses[0].pose.keypoints[1].position.x;
    let eyeY = poses[0].pose.keypoints[1].position.y;
    let leyeX = poses[0].pose.keypoints[2].position.x;
    let leyeY = poses[0].pose.keypoints[2].position.y;

    noseX = lerp(noseX, newX, 0.5);
    noseY = lerp(noseY, newY, 0.5);
    eye1X = lerp(eye1X, eyeX, 0.5);
    eye1Y = lerp(eye1Y, eyeY, 0.5);
    eye2X = lerp(eye2X, leyeX, 0.5);
    eye2Y = lerp(eye2Y, leyeY, 0.5);
  }

  // Randomly change the size of the detected eyes
  function eyeSize(eyes) {
    eye1Size = noise(millis() * 0.1) * 80;
    eye2Size = noise(millis);
  }
}

function modelReady() {
  console.log("model ready");
}

function draw() {
  image(video, 0, 0);

  let d = dist(noseX, noseY, eye1X, eye1Y);
  if (debug == true) {
    //     fill(255, 0, 0);
    //     rect(noseX, noseY, d);

    // rectangles
    noFill();
    rect(eye1X, eye1Y, d);
    rectMode(CENTER);
    noFill();
    rect(eye2X, eye2Y, d);
    rectMode(CENTER);
  }
}

function keyPressed() {
  if (key === "d") {
    debug = !debug;
  }
}
