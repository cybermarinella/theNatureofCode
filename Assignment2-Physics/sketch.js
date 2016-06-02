// For a better experience, please listen at this:
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

// Pelini
var unit = 40;
var count;
var mods = [];
var pelini;


// Random Center
var cerchi;
var cerchiw;
var cerchih;

// wind
var wind;

// Load natural sounds
function preload() {
  Din = loadSound('assets/Din.mp3');
  Tac = loadSound('assets/Tac.mp3');
  Poff= loadSound('assets/Poff.mp3');
  
  //cantata =  loadFont('assets/CantataOneRegular.otf');
  Wind= loadSound('assets/Wind.mp3');
}

function setup() {
  
  colorMode(HSB, 360, 360, 360);  
  createCanvas(windowWidth, windowHeight);
  
  liquidSize = height/1.618;
  liquidCenterx = width/2-liquidSize/2;
  liquidCentery = height/2-liquidSize/2-height/13;
  liquidCenter = createVector(liquidCenterx,liquidCentery);
  
  unit = liquidSize/8;
  h = random(0, 360);
  m1 = random((liquidSize/1.618)/21, 30);
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
  
  //pelini count
  var wideCount = width / unit;
  var highCount = height / unit;
  count = wideCount * highCount;
  
  var index = 0;
  for (var y = 0; y < highCount; y++) {
    for (var x = 0; x < wideCount; x++) {
      mods[index++] = new Module(x*unit, y*unit, unit/2, unit/2, random(0.08, 0.80), unit, 8);
    }
  }
}

function draw() {
  frameRate(1000);
  noStroke();
  
  // is there is sun outside my screen will be multicolored and clear, otherwise it will have a better eyesight in a dark room
  if(n >=9 && n<=18 ){
    background(300, 0, 320); 
  }else{
    background(h, 300, 320);
  }
  //n=2; // positive day view
  //n=11; // negative night view
  
  blendMode(DIFFERENCE);


  // Draw water
  liquid.display();

  // Is the Mover in the liquid?
  var distance1 = int(liquidCenter.dist(particle1.position));
  var distance2 = int(liquidCenter.dist(particle2.position)); 
  
  if (liquid.contains(particle1)) {
    // Calculate drag force
    var dragForce = liquid.calculateDrag(particle1);
    // Apply drag force to Mover
    particle1.applyForce(dragForce);
  }

  if (keyIsPressed === true) {
    wind = createVector(windx, windy);

  } else {                  
    wind = createVector(0, 0);
    Wind.stop();
  }

  for (var i = 0; i < count; i++) {
    mods[i].applyForce(wind);
    mods[i].update();
    mods[i].draw();
  }
  
  
  // Gravity is scaled by mass here!
  var gravity = createVector(0.1 * particle1.mass, 0.007* particle1.mass);
  
  // Apply external forces
  particle1.applyForce(gravity);
  particle1.applyForce(wind);
  
  particle1.update();
  particle1.display();
  particle1.checkEdges();


  // Is the Mover in the liquid?
  if (liquid.contains(particle2)) {
    // Calculate drag force
    var dragForce = liquid.calculateDrag(particle2);
    // Apply drag force to Mover
    particle2.applyForce(dragForce);
  }

  // Gravity is scaled by mass here!
  var gravity = createVector(0.1 * particle2.mass, 0.007* particle2.mass);
  
  // Apply external forces
  particle2.applyForce(gravity);
  particle2.applyForce(wind);
  
  // Update and display
  particle2.update();
  particle2.display();
  particle2.checkEdges();
  
  noStroke();
  textAlign(CENTER);
  textSize(16);
  text("// Press any key for wind", width / 2, height / 2 + liquidSize/2);
  text("// Click to regenerate", width / 2, height / 2 +20 + liquidSize/2);
}

// Reset and random on press
function mousePressed() {
  location.reload();
}

function flicker(num) {
  return num % 5;
}

// change wind direction on every release
function keyPressed() {
  Wind.play();
}

// change wind direction on every release
function keyReleased() {
  windx=random(-3,3);
  windy=random(-3,3);
}

// Would change saturation depending on weather, on a sunny day color is much brighter 
// http://openweathermap.org/api