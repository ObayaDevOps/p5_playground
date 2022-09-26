let framerate = 30;
var capturer = new CCapture( { format: 'webm',  framerate,  name: 'noise_visualization',  quality: 100} );


let step = 3;

/* Each point object will use the this drawpoint method to draw itself */
function drawPoint(xseed, yseed) {
  push();
  // The noise factors are calculated based on the x and y position of the point
  let xnoise = xseed + this.x * 0.01;
  let ynoise = yseed + this.y * 0.01;
  translate(this.x, this.y);
  // Rotation based on two dimensional noise scaled to be between 0 and roughly 2 Pi
  rotate(map(noise(xnoise, ynoise), 0, 1, 0, 6.18));
  stroke(0, 50);
  line(0, 0, step * 3.3, step * 3.3);
  pop();
}

let points = [];
let xseed, yseed, incrementxnoise, incrementynoise, pointsLength;
function setup() {
  createCanvas(200, 200);
  // Initialising noise seed values
  xseed = random(10);
  yseed = random(10);
  incrementxnoise = random(10);
  incrementynoise = random(10);
  // Populating points array
  for (let x = 0; x < width; x += step) {
    for (let y = 0; y < height; y += step) {
      points.push({
        x,
        y,
        draw: drawPoint
      });
    }
  }
  // Saving length of points array
  pointsLength = points.length;
}

let currentFrameRate;
let lastTime = 0;

function draw() {
  if (frameCount === 1) {
    capturer.start()
  }
  /* Animation code */
  background(255);
  xseed += 0.015 * noise(incrementxnoise);
  yseed += 0.015 * noise(incrementynoise);
  // Hoping saved pointsLength is slightly faster than points.length
  // Might just be wishful thinking on my part
  for (let i = 0; i < pointsLength; i++) {
    points[i].draw(xseed, yseed);
  }
  incrementxnoise += 0.005;
  incrementynoise += 0.005;

  //capture output for video output
  capturer.capture(canvas);

  /* Rough framerate display code */
  let seconds = millis() / 1000;
  let elapsed = seconds - lastTime;
  if (elapsed >= 1) {
    currentFrameRate = 1 / (seconds / frameCount);
    console.log(`Frames/sec ${currentFrameRate}`);
    lastTime = seconds;
  }

  let secondsElapsed = frameCount/framerate;
  
  if (secondsElapsed >= 2) {  
    capturer.stop();  
    capturer.save();  
    noLoop(); // This is optional
  }

}
