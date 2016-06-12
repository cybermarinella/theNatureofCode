// Daniel Shiffman Base
// https://www.kadenze.com/courses/the-nature-of-code
// http://natureofcode.com/
// Rainbow Puffs 

// Via Reynolds: http://www.red3d.com/cwr/steer/FlowFollow.html

// Using this variable to decide whether to draw all the stuff
var debug = true;
var h ;

// Flowfield object
var flowfield;
// An ArrayList of vehicles
var vehicles = [];
// set ragnetti colors
var colors = 0;

function setup() {
  h = random(0, 100);
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 100, 100, 100);  
  noStroke();
  frameRate(100000)
  flowfield = new FlowField(120);
  
  // many rainbow puffs
  var pmanypuffs = 21;
  var lg_diam = height/1.618;
  for (var i = 0; i < pmanypuffs; i++) {
    var angle = i * TWO_PI / pmanypuffs;
    var px = width/2 + sin(angle) * lg_diam/2;
    var py = height/2 + cos(angle) * lg_diam/2;
    colors = colors + 100/pmanypuffs;
    //vehicles.push(new Vehicle(random(width/2+(height/1.618)/2, width/2-(height/1.618)/2), random(height/2+(height/1.618)/2, height/2-(height/1.618)/2), random(2, 6), random(0.1, 0.5), colors));
    vehicles.push(new Vehicle(px, py, random(2, 6), random(0.1, 0.5), colors));
  }
}

function draw() {
  background(h, 0, 95); 
  
  // Display the flowfield 
  flowfield.display();
  
  /*push()
  blendMode(SCREEN);
  fill(h, 0, 98, 10);
  rect(0, 0, width, height)
  pop()*/
  
  
  // Tell all the vehicles to follow the flow field
  for (var i = 0; i < vehicles.length; i++) {
    vehicles[i].follow(flowfield);
    vehicles[i].run();
  }

}

// Make a new flowfield
function mousePressed() {
  flowfield.init();
}


