// Daniel Shiffman
// https://www.kadenze.com/courses/the-nature-of-code
// http://natureofcode.com/
// Session 2: Drag Force



var Liquid = function(x, y, w, h, c) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.c = c;

  // Is the Mover in the Liquid?
  this.contains = function(m) {
    var l = m.position;
    return l.x > this.x && l.x < this.x + this.w &&
           l.y > this.y && l.y < this.y + this.h;
  };

  // Calculate drag force
  this.calculateDrag = function(m) {
    // Magnitude is coefficient * speed squared
    var speed = m.velocity.mag();
    var dragMagnitude = this.c * speed * speed;

    // Direction is inverse of velocity
    var dragForce = m.velocity.copy();
    dragForce.mult(-1);

    // Scale according to magnitude
    dragForce.setMag(dragMagnitude);
    return dragForce;
  }

  this.display = function() {
    ellipse(this.x+this.w/2, this.y+this.w/2, this.w, this.h);
    for (var i = 1; i <= cerchi; ++i) {
      ellipse(this.x+this.w/2, this.y+this.w/2, this.w-i*cerchiw, this.h-i*cerchih);
    }
  }
}
