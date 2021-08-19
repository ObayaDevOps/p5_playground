var grid;
var nextGrid; //Not space efficient: As the next

function setup() {
  // put setup code here
  createCanvas(200,200);
  pixelDensity(1);
  grid = [];
  nextGrid = [];

  //grid initialisation - break the canvas into grid (width and height - so a place for each pixel)
  for (var x = 0; x < width; x++) {
    grid[x] = [];
    nextGrid[x] = [];
    for(var y = 0; y < height; y++){
        grid[x][y] = {a: random(1), b: random(1)}; //initialise the chemical concentrations in the grid cell
        nextGrid[x][y] = {a: 0, b: 0}; 
    }
  }
  
}

function draw() {
  // put drawing code here
  background(51);

  loadPixels();

  //This creating a mapping between the grids (representations of our canvas) and the screen displaying pixels
  //**  Look up pixel array in p5 and see how it works */
  for(var x = 0; x < width; x++){
    for(var y = 0; y < height; y++) {
      var pix = (x + y * width) * 4; // The pixel array is *1-Dimensional* and has 4 spots for every pixel (The colours - RGBA - Red Green Blue Alpha(Transparency))
      pixels[pix + 0] = grid[x][y].a * 255; //RED - multiplied to convert to pixel
      pixels[pix + 1] = 0;
      pixels[pix + 2] = grid[x][y].b * 255; //BLUE
      pixels[pix + 3] = 255;
      
    }
  }

  updatePixels();
}