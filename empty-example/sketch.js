var xoff = 0; 

function setup() {
  // put setup code here
  createCanvas(400, 400);
}

function draw() {
  // put drawing code here
  background(51);
  var x = map(noise(xoff), 0, 1, 0, width);
  xoff += 0.09;
  ellipse(x,200, 24, 24);
}