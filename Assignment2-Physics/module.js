// cybermarinella first steps in
// https://www.kadenze.com/courses/the-nature-of-code
// http://natureofcode.com/
// Session 2: Drag Force

function Module(_xOff, _yOff, _x, _y, _speed, _unit, m) {
  this.xOff = _xOff;
  this.yOff = _yOff;
  this.x = _x;
  this.y = _y;
  this.speed = _speed;
  this.unit = _unit;
  this.xDir = 1;
  this.yDir = -1;
  
  this.mass = m;
  this.position = createVector(this.x, this.y);
  this.velocity = createVector(0,0);
  this.acceleration = createVector(0,0);

  // Newton's 2nd law: F = M * A
  // or A = F / M
  this.applyForce = function(force) {
    var f = p5.Vector.div(force,this.mass);
    this.acceleration.add(f);
  };
}

// Custom method for updating the variables
Module.prototype.update = function() {
      
  // apply forces
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0.01);
    
    this.x = this.x + (this.speed * this.xDir);
    this.y = this.y + (this.speed * this.yDir);
  
    if (this.x >= this.unit || this.x <= 0) {
      this.xDir *= -1;
      this.x = this.x + (1 * this.xDir);
      this.y = this.y + (1 * this.yDir);
    }
    if (this.y >= this.unit || this.y <= 0) {
      this.yDir *= -1;
      this.y = this.y + (1 * this.yDir);
      this.x = this.x + (1 * this.xDir);
    }
  
}
                     
// Custom method for drawing the object
Module.prototype.draw = function() {
  // moove elements depending on wind (would be better adding rotation)
  var xc = constrain(this.position.x, this.x-20, this.x+20);
  var yc = constrain(this.position.y, this.y-20, this.y+20);
  
  stroke(h, 300, 300);
  strokeWeight(0.5);
  //rotate(5);
	line(this.xOff + this.x, this.yOff + this.y, this.xOff + xc +this.mass, this.yOff + yc +this.mass);
}

Module.prototype.checkEdges = function() {
    // screen margins
    if (this.position.y > height) {
      this.velocity.y *= -0.1;  // A little dampening when hitting the bottom
      this.position.y = height;
    }
    if (this.position.y < 0) {
      this.velocity.y *= -0.1;  // no dampening when hitting the top
      this.position.y = 0;
    }
    if (this.position.x > width) {
      this.velocity.x *= -0.9;  // A little dampening when hitting the right
      this.position.x = width;
    }
    if (this.position.x < 0) {
      this.velocity.x *= -0.1;  // no dampening when hitting the left
      this.position.x = 0;
    }
}

  
