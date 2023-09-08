let stripeWidth; // Width of each stripe
let stripes = 60; // Number of stripes
let offsetSeconds = 0; // Offset for moving seconds stripe
let offsetMinutes = 0; // Offset for moving minutes stripe
let offsetHours = 0; // Offset for moving hours stripe
let offsetMilliseconds = 0; // Offset for moving milliseconds stripe

function setup() {
  createCanvas(windowWidth, windowHeight);
  stripeWidth = width / stripes;
  frameRate(60); // Update 60 times per second
  background(0); // Set background to black
  stroke(255); // Set stroke color to white
}

function draw() {
  background(0); // Clear the background

  let now = new Date();
  let seconds = now.getSeconds();
  let minutes = now.getMinutes();
  let hours = now.getHours() % 12; // Convert to 12-hour format
  let milliseconds = now.getMilliseconds();

  // Draw moving stripes for hours
  let hoursStripeIndex = int(hours / 12 * stripes);
  drawStripe(hoursStripeIndex, offsetHours, 6); // Thickest

  // Draw moving stripes for minutes
  let minutesStripeIndex = int(minutes / 60 * stripes);
  drawStripe(minutesStripeIndex, offsetMinutes, 3); // Medium thickness

  // Draw moving stripes for seconds
  let secondsStripeIndex = int(seconds / 60 * stripes);
  drawStripe(secondsStripeIndex, offsetSeconds, 2); // Thinnest

  // Draw moving stripes for milliseconds
  let millisecondsStripeIndex = int(map(milliseconds, 0, 999, 0, stripes));
  drawStripe(millisecondsStripeIndex, offsetMilliseconds, 1); // Thinnest

  // Update the offsets to create the illusion of moving stripes
  offsetSeconds = map(seconds, 0, 59, 0, stripeWidth);
  offsetMinutes = map(minutes, 0, 59, 0, stripeWidth);
  offsetHours = map(hours, 0, 11, 0, stripeWidth * 5);
  offsetMilliseconds = map(milliseconds, 0, 999, 0, stripeWidth);
}

function drawStripe(index, offset, weight) {
  strokeWeight(weight);
  let x = index * stripeWidth + offset;
  let y1 = 0; // Start from the top
  let y2 = height; // Go to the bottom
  let isEven = index % 2 == 0; // Alternate stripe pattern
  if (isEven) {
    line(x, y1, x, y2);
  } else {
    line(x, y1, x, y2);
  }
  strokeWeight(1); // Reset stroke weight to default
}
