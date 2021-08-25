//Global Variables
var grid;
var next;

var fr = 60;
var time = 1;
var offsetX0 = Math.floor(1* Math.random());
var offsetY0 = Math.floor(25* Math.random());


//SEED Positioning Offset
var offsetX1 = Math.floor(10* Math.random());
var offsetY1 = Math.floor(10* Math.random());
var offsetX2 = Math.floor(1* Math.random());
var offsetY2 = Math.floor(30* Math.random());
var offsetX3 = Math.floor(30* Math.random());
var offsetY3 = Math.floor(1* Math.random());

var offsetX4 = Math.floor(40* Math.random());
var offsetY4 = Math.floor(40* Math.random());
var offsetX5 = Math.floor(50* Math.random());
var offsetY5 = Math.floor(60* Math.random());

var offsetX6 = Math.floor(30* Math.random());
var offsetY6 = Math.floor(60* Math.random());
var offsetX7 = Math.floor(55* Math.random());
var offsetY7 = Math.floor(60* Math.random());
var offsetX8 = Math.floor(75* Math.random());
var offsetY8 = Math.floor(75* Math.random());
var offsetX9 = Math.floor(70* Math.random());
var offsetY9 = Math.floor(70* Math.random());
var offsetX10 = Math.floor(80* Math.random());
var offsetY10 = Math.floor(1* Math.random());

var dA = 1.25;
var dB = 2
var feed = 0.0248;
var kill = 0.055;


function setup() {
  createCanvas(100, 100);
  // colorMode(HSB); //Colour cycling - HSB:Hue, Saturation, Brightness

  frameRate(fr);
  pixelDensity(1);
  grid = [];
  next = [];

  //grid initialisation - break the canvas into grid (width and height - so a place for each pixel)
  for (var x = 0; x < width; x++) {
    grid[x] = [];
    next[x] = [];
    for (var y = 0; y < height; y++) {
      //initialise the chemical concentrations in the grid cell
      grid[x][y] = {
        a: 1,
        b: 0
      };
      next[x][y] = {
        a: 1,
        b: 0
      };
    }
  }
  
  //initial SEED of chemicals of centre of Grid
  for (var i = 10; i < 20; i++) {
    for (var j = 10; j < 20; j++) {
      grid[i+offsetX0][j+offsetY0].b = 1;
       grid[i+offsetX1][j+offsetY1].b = 1; 
      grid[i+offsetX2][j+offsetY2].b = 1;
      grid[i+offsetX3][j+offsetY3].b = 1;  
      grid[i+offsetX4][j+offsetY4].b = 1;
      grid[i+offsetX5][j+offsetY5].b = 1;
      grid[i+offsetX6][j+offsetY6].b = 1;       
      grid[i+offsetX7][j+offsetY7].b = 1;       
      grid[i+offsetX8][j+offsetY8].b = 1;       
      grid[i+offsetX9][j+offsetY9].b = 1;       
      grid[i+offsetX10][j+offsetY10].b = 1;              
    }
  }
}

function draw() {
  // background(51);
  print(frameRate());

  if (frameCount === 1) {
    capturer.start()
  }

  for (var x = 10; x < width - 10; x++) {
    for (var y = 10; y < height - 10; y++) {
      var a = grid[x][y].a;
      var b = grid[x][y].b;

      //The actual Reaction-Diffusion Equation
      //http://karlsims.com/rd.html
      next[x][y].a = (a + dA * laplaceA(x, y) - a * b * b + feed * (1 - a)) * time;
      next[x][y].b = (b + dB * laplaceB(x, y) + a * b * b - (kill + feed) * b) * time;

      //maps it to between 0 and 1
      next[x][y].a = constrain(next[x][y].a, 0, 1);
      next[x][y].b = constrain(next[x][y].b, 0, 1);
    }
  }

  loadPixels();
  //This creating a mapping between the grids (representations of our canvas) and the screen displaying pixels
  //**  Look up pixel array in p5 and see how it works */
  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {
      var pix = (x + y * width) * 4; // The pixel array is *1-Dimensional* and has 4 spots for every pixel (The colours - RGBA - Red Green Blue Alpha(Transparency))
      var a = next[x][y].a;
      var b = next[x][y].b;
      var c = floor((a - b) * 255 );
      c = constrain(c, 0, 255);
      pixels[pix + 0] = a*255;
      pixels[pix + 1] = c;//c;
      pixels[pix + 2] = b*255;
      pixels[pix + 3] = 255;
    }
  }
  updatePixels();

  swap();

  if(frameCount < 60 * 5) {
    capturer.capture(canvas)
  } else if ( frameCount === 60 * 5) {
    capturer.save();
    capturer.stop();
  }
}

//Laplacian functions perform 'convolutions'
// Calculate a value of a cell based on the values of its neighbours
function laplaceA(x, y) {
  var sumA = 0;

  //The Laplacian is performed with a 3x3 convolution 
  //with center weight -1, adjacent neighbors .2, and diagonals .05.
  //This is a hardcoded naive implementation
  sumA += grid[x][y].a * -1;
  sumA += grid[x - 1][y].a * 0.2;
  sumA += grid[x + 1][y].a * 0.2;
  sumA += grid[x][y + 1].a * 0.2;
  sumA += grid[x][y - 1].a * 0.2;
  sumA += grid[x - 1][y - 1].a * 0.05;
  sumA += grid[x + 1][y - 1].a * 0.05;
  sumA += grid[x + 1][y + 1].a * 0.05;
  sumA += grid[x - 1][y + 1].a * 0.05;
  return sumA;
}

function laplaceB(x, y) {
  var sumB = 0;
  sumB += grid[x][y].b * -1;
  sumB += grid[x - 1][y].b * 0.2;
  sumB += grid[x + 1][y].b * 0.2;
  sumB += grid[x][y + 1].b * 0.2;
  sumB += grid[x][y - 1].b * 0.2;
  sumB += grid[x - 1][y - 1].b * 0.05;
  sumB += grid[x + 1][y - 1].b * 0.05;
  sumB += grid[x + 1][y + 1].b * 0.05;
  sumB += grid[x - 1][y + 1].b * 0.05;
  return sumB;
}

function swap() {
  var temp = grid;
  grid = next;
  next = temp;
}