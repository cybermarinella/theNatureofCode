// Change Interface depending on sun position (now Day Hours)
// once, will change saturation depending on weather (if it is raining, colors are less bright)
// http://openweathermap.org/api
var d = new Date();
var n = d.getHours();

// Two particles, this could be an array
var particle1;
var particle2;

// Liquid
var liquid;
var liquidSize;

// Random Color
var h;
var y;

// Pelini
var separator;
var segLength = 90;

function setup() {
  h = random(0, 360);
  m1 = random(10, 30);
  m2 = random(0.5, 2)
  
  liquidSize = windowHeight/1.618
  separator = liquidSize/7;
  
  colorMode(HSB, 360, 360, 360);  
  createCanvas(windowWidth, windowHeight);
  noStroke();
  fill(h, 300, 300);
  
  // Create liquid object
  liquid = new Liquid(width/2-liquidSize/2, height/2-liquidSize/2, liquidSize, liquidSize, 0.2845);

  particle1 = new Particle(m1, width/2, 100);
  particle2 = new Particle(m2, width/2, 0.01);
}

function draw() {
  var wind;
  
  // is there is sun outside my schreen will be clear, otherwise it will be colored
  if(n >=9 && n<=18 ){
    background(300, 0, 300); 
  }else{
    background(h, 300, 300);
  }
  
  
  blendMode(DIFFERENCE);
  push()
  for(var x = separator/2; x <= width; x+=separator){
    for(var y = separator/2; y <= height; y+=separator){
      stroke(h, 300, 300);
      strokeWeight(0.5);
			line(x, y, x+10, y+10);
    }
  }
  pop()

  // Draw water
  liquid.display();

  // Is the Mover in the liquid?
  if (liquid.contains(particle1)) {
    // Calculate drag force
    var dragForce = liquid.calculateDrag(particle1);
    // Apply drag force to Mover
    particle1.applyForce(dragForce);
  }

  if (keyIsPressed === true) {
    wind = createVector(0.3, 0);
  } else {
    wind = createVector(0, 0);
  }
  
  particle1.applyForce(wind);
  particle2.applyForce(wind);
  
  // Gravity is scaled by mass here!
  var gravity = createVector(0, 0.1 * particle1.mass);
  // Apply gravity
  particle1.applyForce(gravity);

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
  var gravity = createVector(0, 0.1 * particle2.mass);
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
