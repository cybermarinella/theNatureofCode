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

function preload() {  // preload() runs once
     body_01l = loadImage("assets/body_01l.png"); 
     body_01s = loadImage("assets/body_01s.png"); 
}

function setup() {
  h = random(0, 100);
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 100, 100, 100);
  frameRate(60);
  noStroke();

  flowfield = new FlowField(160);

  // many rainbow puffs
  var pmanypuffs = 21;
  var lg_diam = height/1.618;
  for (var i = 0; i < pmanypuffs; i++) {
    var angle = i * TWO_PI / pmanypuffs;
    var px = width/2 + sin(angle) * lg_diam/2;
    var py = height/2 + cos(angle) * lg_diam/2;
    
    colors = colors + 100/pmanypuffs;
    vehicles.push(new Vehicle(px, py, random(0.5, 7), random(0.5, 1), colors));
  }
}

function draw() {
  background(0, 0, 10, 100);

  // Display the flowfield
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
