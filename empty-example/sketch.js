function setup() {
  createCanvas(1000, 1000);
  var save = true;
}

function draw() {
  ellipse(100, 100, 80, 80);
   if(save){
     save("simple_circle_output2.png");
     save = false;
   }

}