// Daniel Shiffman
// https://www.kadenze.com/courses/the-nature-of-code
// http://natureofcode.com/
// Session 3: Flow Field Following

// Via Reynolds: http://www.red3d.com/cwr/steer/FlowFollow.html

// Using this variable to decide whether to draw all the stuff
var debug = true;

// Flowfield object
var flowfield;
// An ArrayList of vehicles
var vehicles = [];

function setup() {
  //frameRate(15)
  createCanvas(windowWidth, windowHeight);
  //colorMode(HSB, 360, 360, 360, 360);  
  noStroke();
  fill(240);
  flowfield = new FlowField(80);
  // Make a whole bunch of vehicles with random maxspeed and maxforce values
  for (var i = 0; i < 10; i++) {
    vehicles.push(new Vehicle(random(width), random(height), random(2, 6), random(0.1, 0.5)));
  }
}

function draw() {
  background(240);
  blendMode(DIFFERENCE);
  //fill(0, 360, 360, 50);
  // Display the flowfield in "debug" mode
  if (debug) flowfield.display();
  // Tell all the vehicles to follow the flow field
  for (var i = 0; i < vehicles.length; i++) {
     //fill(i*10);
    vehicles[i].follow(flowfield);
    vehicles[i].run();
  }

}


function keyPressed() {
  if (key == ' ') {
    debug = !debug;
  }
}

// Make a new flowfield
function mousePressed() {
  flowfield.init();
}


