

var inc = 0.1;


function setup() {
  // put setup code here
  // createCanvas(3840, 2160);
  // createCanvas(1920,1080);
  createCanvas(200,200);
  pixelDensity(1);
  // noiseDetail(8);

}

function draw() {
  // put drawing code here
  var xoff = 0;

  loadPixels();
  for(var x=0; x< width; x++)  {  
    var yoff = 0;
    for(var y=0; y< height; y++)  { 
      //calculating the pixel index
      var index =( x + y * width) * 4;
      var r =  noise(xoff, yoff)*255;

      var randRed = map(noise(r), 0,1,0,255);
      var randGreen = map(noise(r), 0,1,0,255);
      var randBlue = map(noise(r), 0,1,0,255);


      pixels[index+0] = r;
      pixels[index+1] = r;
      pixels[index+2] = r;
      pixels[index+3] = 255;
      yoff += inc;
    }
    xoff += inc;
  }

  // noLoop();
  updatePixels();
}