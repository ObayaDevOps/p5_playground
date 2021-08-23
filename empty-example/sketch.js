//Global Variables
var grid;
var next;

var dA = 1;
var dB = 0.5;
var feed = 0.055;
var k = 0.062;

function setup() {
  createCanvas(200, 200);
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

  //initial seed of chemicals of centre of Grid
  for (var i = 100; i < 110; i++) {
    for (var j = 100; j < 110; j++) {
      grid[i][j].b = 1;
    }
  }
}

function draw() {
  background(51);

  for (var x = 1; x < width - 1; x++) {
    for (var y = 1; y < height - 1; y++) {
      var a = grid[x][y].a;
      var b = grid[x][y].b;

      //The actual Reaction-Diffusion Equation
      //http://karlsims.com/rd.html
      next[x][y].a = a + dA * laplaceA(x, y) - a * b * b + feed * (1 - a);
      next[x][y].b = b + dB * laplaceB(x, y) + a * b * b - (k + feed) * b;

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
      var c = floor((a - b) * 255);
      c = constrain(c, 0, 255);
      pixels[pix + 0] = c;
      pixels[pix + 1] = c;
      pixels[pix + 2] = c;
      pixels[pix + 3] = 255;
    }
  }
  updatePixels();

  swap();
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