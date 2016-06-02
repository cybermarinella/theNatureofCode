// Daniel Shiffman
// https://www.kadenze.com/courses/the-nature-of-code
// http://natureofcode.com/
// Session 1: Random Walker

var w
var size
var a
var y = 100
var xe = 0
var xo = 30

function preload() {
  spiderFart = loadSound('assets/flap.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  colorMode(HSB, height, height, height)
  frameRate(60)
  size = 80
  w = new Walker()
}

function draw() {
  // Background Color Change on mouse position
  chiaro = map(mouseX, width / 2, height / 2, 30, 50);
  
  // this stupid bug change color and saturation depending on mouse position
  riempimento = color(mouseY, height - mouseX / 2, height / 1.618);
  complementare = color(mouseY + 180, height - mouseY / 2, height / 1.618);
  background(chiaro)
  
  // Update and display object
  w.update()
  w.display()
}

function Walker() {

  // Start Walker in center
  this.pos = createVector(width / 2, height / 2)

  // Initial velocity and acceleration
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0.1);

  // define a destination
  this.destination = createVector(random(0, width), random(0, height));

  this.update = function() {
    if (this.pos.dist(this.destination) < 10) {
      this.vel = createVector(0, 0);
      this.acc = createVector(0, 0.1);
      this.destination = createVector(random(0, width), random(0, height));
    }

    this.acc = p5.Vector.sub(this.destination, this.pos);
    this.acc.setMag(0.05);

    // "Position is changed by velocity, and velocity by acceleration"
    this.vel.add(this.acc);
    this.pos.add(this.vel);
  }

  this.display = function(a) {
    
    push()
    
    // Draw Walker as circle
    noStroke()
    stroke(riempimento)

    y = y - 0.5;
    
    // Legs moovement and sound
    if (y <= this.pos.y - 30 || y >= this.pos.y + 30) {
      y = this.pos.y;
      spiderFart.play();
    }

    push()
    stroke(complementare)
    line(this.pos.x, this.pos.y + size / 2, this.pos.x, 0);
    noStroke();
    fill(riempimento);
    ellipse(this.pos.x, this.pos.y, size, size);
    fill(chiaro);
    ellipse(this.pos.x + size / 3, this.pos.y - size / 2, size / 2, size / 2);
    ellipse(this.pos.x - size / 3, this.pos.y - size / 2, size / 2, size / 2);
    stroke(riempimento)
    fill(riempimento);
    push()

    line(this.pos.x, this.pos.y - 30, this.pos.x + size / 2, y - 20);
    ellipse(this.pos.x + size / 2, y - 20, size / 10, size / 10);
    line(this.pos.x, this.pos.y - 30, this.pos.x - size / 2, y - 20);
    ellipse(this.pos.x - size / 2, y - 20, size / 10, size / 10);
    translate(0, -10);
    line(this.pos.x, this.pos.y, this.pos.x + size / 2 + 15, y);
    ellipse(this.pos.x + size / 2 + 15, y, size / 8, size / 8);
    line(this.pos.x, this.pos.y, this.pos.x - size / 2 - 15, y);
    ellipse(this.pos.x - size / 2 - 15, y, size / 7, size / 7);
    translate(0, 20);
    line(this.pos.x, this.pos.y, this.pos.x + size / 2 + 30, y);
    ellipse(this.pos.x + size / 2 + 30, y, size / 7, size / 7);
    line(this.pos.x, this.pos.y, this.pos.x - size / 2 - 30, y);
    ellipse(this.pos.x - size / 2 - 30, y, size / 7, size / 7);
    translate(0, 40);
    line(this.pos.x, this.pos.y - 30, this.pos.x + size / 2 + 30, y);
    ellipse(this.pos.x + size / 2 + 30, y, size / 7, size / 7);
    line(this.pos.x, this.pos.y - 30, this.pos.x - size / 2 - 30, y);
    ellipse(this.pos.x - size / 2 - 30, y, size / 7, size / 7);
    strokeWeight(12);
    stroke(riempimento)
    line(this.pos.x, this.pos.y - size, this.pos.x, y - size - 30);
    pop()

    //flicker eyes
    if (flicker(frameCount)) {
      fill(complementare);
      noStroke()
      ellipse(this.pos.x + size / 3, this.pos.y - size / 2, size / 4, size / 4);
      ellipse(this.pos.x - size / 3, this.pos.y - size / 2, size / 4, size / 4);
    }
    pop()
  }
}


function flicker(num) {
  return num % 5;
}

//https://www.youtube.com/watch?v=GtHzpX0FCFY - spider walk 
//would like to rotate and have two kind of wolking legs, but it was too much ... so i make it simpler ...