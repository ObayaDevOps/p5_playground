var font;

function preload() {
  font = loadFont('DigiGroteskBoldCondensedRegular.otf');
}


function setup() {
  // put setup code here
  createCanvas(800,800, WEBGL);
  background(51);
  
  textFont(font);
  textSize(128);
  fill(255);
  noStroke();
  text('studioLab', 10, 100)


  textSize (12);
  text('inquiries:', 100, 500)

}

function draw() {
  // put drawing code here
}