// For a rainy experience, please listen at this:
// https://play.spotify.com/album/0MmYPcifcnVnCOlMLRbZI1
// https://www.youtube.com/watch?v=JxVXNWdHDq8


// Change day/night interface (now day hours)
var d = new Date();
var n = d.getHours();

// mooving circles
var particle1;
var particle2;

// Liquid
var liquid;
var liquidSize;

// Random Color
var h;
var y;

// Pelini
var p = [];
var separator;
var segLength = 90;

// Random Center
var cerchi;
var cerchiw;
var cerchih;


var wind;

// Load natural sounds
function preload() {
  Din = loadSound('assets/Din.mp3');
  Tac = loadSound('assets/Tac.mp3');
  Poff= loadSound('assets/Poff.mp3');
}

function setup() {
  
  colorMode(HSB, 360, 360, 360);  
  createCanvas(windowWidth, windowHeight);
  
  liquidSize = height/1.618;
  liquidCenterx = width/2-liquidSize/2;
  liquidCentery = height/2-liquidSize/2-height/13;
  liquidCenter = createVector(liquidCenterx,liquidCentery);
  
  separator = liquidSize/8;
  h = random(0, 360);
  m1 = random((liquidSize/1.618)/30, 30);
  m2 = random(0.8, (m1/1.618)/8);
  windx=random(-1,1);
  windy=random(-1,1);
  cerchi = int(random(3, 21));
  cerchiw = int(random(1, 55));
  cerchih = int(random(1, 55));
  
  noStroke();
  fill(h, 320, 360);
  
  // Create circles
  liquid = new Liquid(liquidCenterx, liquidCentery, liquidSize, liquidSize, 0.25); // set optical center height/2-liquidSize/2-height/21
  particle1 = new Particle(m1, 0, height/2);
  particle2 = new Particle(m2, 0, height/2);
}

function draw() {
  // is there is sun outside my screen will be multicolored and clear, otherwise it will have a better eyesight in a dark room
  if(n >=9 && n<=18 ){
    background(300, 0, 320); 
  }else{
    background(h, 300, 320);
  }
  //n=2; // positive day view
  //n=11; // negative night view
  
  blendMode(DIFFERENCE);

  pelini();

  // Draw water
  liquid.display();
  
  // Is the Mover in the liquid?
  var distance1 = liquidCenter.dist(particle1.position);
  var distance2 = liquidCenter.dist(particle2.position); 
  
  if (distance1 > liquidSize/2) {
    // Calculate drag force
    var dragForce = liquid.calculateDrag(particle1);
    // Apply drag force to Mover
    particle1.applyForce(dragForce);
  }

  if (keyIsPressed === true) {
    wind = createVector(windx, windy);
  } else {                  
    wind = createVector(0, 0);
  }
  
  particle1.applyForce(wind);
  particle2.applyForce(wind);
  
  // Gravity is scaled by mass here!
  var gravity = createVector(0.1 * particle1.mass, 0.007* particle1.mass);
  // Apply gravity
  particle1.applyForce(gravity);

  particle1.update();
  particle1.display();
  particle1.checkEdges();


  if (distance2 > liquidSize/2) {
    var dragForce = liquid.calculateDrag(particle2);
    particle2.applyForce(dragForce);
    //console.log(distance2);
  }

  // Gravity is scaled by mass here!
  var gravity = createVector(0.1 * particle2.mass, 0.007* particle2.mass);
  // Apply gravity
  particle2.applyForce(gravity);

  
  // Update and display
  particle2.update();
  particle2.display();
  particle2.checkEdges();
}

// Reset and random on press
function mousePressed() {
    location.reload();
}

function flicker(num) {
  return num % 5;
}

// change wind direction on every release
function keyReleased() {
  windx=random(-1,1);
  windy=random(-1,1);
}

// Would change saturation depending on weather, on a sunny day color is much brighter 
// http://openweathermap.org/api