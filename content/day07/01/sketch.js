let video;
let poseNet;
let leftEyeX = 0;
let leftEyeY = 0;
let rightEyeX = 0;
let rightEyeY = 0;
let eyeSize = 50;
let debug = true;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on("pose", gotPoses);
}

function gotPoses(poses) {
  if (poses.length > 0) {
    // Assuming the eyes are detected as keypoint 1 and 2
    let leftEye = poses[0].pose.keypoints[1];
    let rightEye = poses[0].pose.keypoints[2];

    if (leftEye.score > 0.5 && rightEye.score > 0.5) {
      leftEyeX = leftEye.position.x;
      leftEyeY = leftEye.position.y;
      rightEyeX = rightEye.position.x;
      rightEyeY = rightEye.position.y;
    }
  }
}

function modelReady() {
  console.log("model ready");
}

function draw() {
  image(video, 0, 0);

  if (debug) {
    // Calculate the center of the left eye
    let leftEyeCenterX = leftEyeX;
    let leftEyeCenterY = leftEyeY;

    // Calculate the center of the right eye
    let rightEyeCenterX = rightEyeX;
    let rightEyeCenterY = rightEyeY;

    // Randomly shift the slices (you can adjust the range as needed)
    let leftEyeShiftX = floor(noise(-10, 10));
    let leftEyeShiftY = floor(noise(-10, 10));
    let rightEyeShiftX = floor(noise(-10, 10));
    let rightEyeShiftY = floor(noise(-10, 10));

    // Calculate the position of the cropped area centered on the left eye
    let leftEyeCropX = leftEyeCenterX - eyeSize / 2 + leftEyeShiftX;
    let leftEyeCropY = leftEyeCenterY - eyeSize / 2 + leftEyeShiftY;

    // Calculate the position of the cropped area centered on the right eye
    let rightEyeCropX = rightEyeCenterX - eyeSize / 2 + rightEyeShiftX;
    let rightEyeCropY = rightEyeCenterY - eyeSize / 2 + rightEyeShiftY;

    // Copy a horizontal slice from the left eye
    let leftEyeSlice = video.get(
      leftEyeCropX,
      leftEyeCropY,
      eyeSize,
      eyeSize
    );

    // Copy a horizontal slice from the right eye
    let rightEyeSlice = video.get(
      rightEyeCropX,
      rightEyeCropY,
      eyeSize,
      eyeSize
    );

    // Check if leftEyeSlice and rightEyeSlice have valid dimensions
    if (leftEyeSlice.width > 0 && leftEyeSlice.height > 0) {
      // Draw the sliced video onto the canvas centered on the left eye
      image(leftEyeSlice, leftEyeCenterX, leftEyeCenterY, eyeSize, eyeSize);
    }

    if (rightEyeSlice.width > 0 && rightEyeSlice.height > 0) {
      // Draw the sliced video onto the canvas centered on the right eye
      image(rightEyeSlice, rightEyeCenterX, rightEyeCenterY, eyeSize, eyeSize);
    }
  }
}
