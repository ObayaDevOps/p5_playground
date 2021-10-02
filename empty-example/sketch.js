var xoff1 = 0; 
var xoff2 = 100000; 


function setup() {
  // put setup code here
  createCanvas(400, 400);
}

function draw() {
  // put drawing code here
  background(51);
  var x = map(noise(xoff1), 0, 1, 0, width);
  var y = map(noise(xoff2), 0, 1, 0, height);


  xoff1 += 0.02;
  xoff2 += 0.02;

  ellipse(x,y, 24, 24);
}