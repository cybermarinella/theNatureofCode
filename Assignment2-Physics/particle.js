// Daniel Shiffman
// https://www.kadenze.com/courses/the-nature-of-code
// http://natureofcode.com/
// Session 2: Drag Force

function Particle(m,x,y) {
  this.mass = m;
  this.position = createVector(x,y-100);
  this.velocity = createVector(0,0);
  this.acceleration = createVector(0,0);

  // Newton's 2nd law: F = M * A
  // or A = F / M
  this.applyForce = function(force) {
    var f = p5.Vector.div(force,this.mass);
    this.acceleration.add(f);
  };

  this.update = function() {
    // Velocity changes according to acceleration
    this.velocity.add(this.acceleration);
    // position changes by velocity
    this.position.add(this.velocity);
    // We must clear acceleration each frame
    this.acceleration.mult(0.1);
  };
  
  var porzioni = int(random(3, 23));
    
  this.display = function() {
    ellipse(this.position.x,this.position.y,this.mass*16,this.mass*16);
    for (var i = 1; i <= porzioni; ++i) {
      var angle = i * TWO_PI / porzioni;
      var x = this.position.x + cos(angle) * 50;
      var y = this.position.y + sin(angle) * 50;
      ellipse(x, y, this.mass*8, this.mass*8);
    }
  };

  // Bounce off bottom of window
  this.checkEdges = function() {
    if (this.position.y > height) {
      this.velocity.y *= -0.9;  // A little dampening when hitting the bottom
      this.position.y = height;
    }
    if (this.position.y < 0) {
      this.velocity.y *= 0.1;  // no dampening when hitting the bottom
      this.position.y = 0;
    }
    if (this.position.x > width) {
      this.velocity.x *= -0.9;  // A little dampening when hitting the bottom
      this.position.x = width;
    }
    if (this.position.x < 0) {
      this.velocity.x *= 0.9;  // no dampening when hitting the bottom
      this.position.x = 0;
    }
  };

}
