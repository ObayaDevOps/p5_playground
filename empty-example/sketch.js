

var inc = 0.1;
var scl = 10;
var rows, cols;
var fr; //frameRate

var zoff = 0;

function setup() {
  // put setup code here
  // createCanvas(3840, 2160);
  createCanvas(1920,1080);
  // createCanvas(200,200);
  cols = floor(width/scl);
  rows = floor(height/scl);
  fr = createP(''); //creates a paragraph elemer
}

function draw() {
  // put drawing code here
  var xoff = 0;
  background(255);
  // randomSeed(100);

  for(var x=0; x< cols; x++)  {  
    var yoff = 0;
    for(var y=0; y< rows; y++)  { 
      var angle =  noise(xoff, yoff, zoff)*TWO_PI;
      var vect = p5.Vector.fromAngle(angle); //radians

      yoff += inc;
      fill(angle);
      stroke(0);
      push();
      translate(x*scl, y*scl);
      rotate(vect.heading());
      line(0,0,scl,0)
      pop();

    }
    xoff += inc;
    zoff += inc/65;
  }

  fr.html(floor(frameRate()));
  // noLoop();
}