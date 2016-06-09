// Daniel Shiffman
// https://www.kadenze.com/courses/the-nature-of-code
// http://natureofcode.com/
// Session 3: Flow Field Following

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
  frameRate(1000)
  flowfield = new FlowField(120);
  // Make a whole bunch of vehicles with random maxspeed and maxforce values
  for (var i = 0; i < 7; i++) {
    colors = colors + 14.285;
    vehicles.push(new Vehicle(random(width/2+(height/1.618)/2, width/2-(height/1.618)/2), random(height/2+(height/1.618)/2, height/2-(height/1.618)/2), random(2, 6), random(0.1, 0.5), colors));
  }
}

function draw() {
  background(h, 0, 95); 
  // Display the flowfield in "debug" mode

  flowfield.display();
  
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


