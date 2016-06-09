// Daniel Shiffman
// https://www.kadenze.com/courses/the-nature-of-code
// http://natureofcode.com/
// Session 3: Flow Field Following

// The "Vehicle" constructor

function Vehicle(x,y,ms,mf) {
  this.position = createVector(x,y);
  this.acceleration = createVector(0,0);
  this.velocity = createVector(0,0);
  this.r = 4;
  this.maxspeed = ms || 2;
  this.maxforce = mf || 0.1;

  this.run = function() {
    this.update();
    this.borders();
    this.display();
  }

  // Implementing Reynolds' flow field following algorithm
  // http://www.red3d.com/cwr/steer/FlowFollow.html
  this.follow = function(flow) {
    // What is the vector at that spot in the flow field?
    var desired = flow.lookup(this.position);
    // Scale it up by maxspeed
    desired.mult(this.maxspeed);
    // Steering is desired minus velocity
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);  // Limit to maximum steering force
    this.applyForce(steer);
  }

  this.applyForce = function(force) {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force);
  }

    // Method to update location
  this.update = function() {
     fill(h, 300, 320);
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset accelerationelertion to 0 each cycle
    this.acceleration.mult(0);
  }

  // Wraparound
  this.borders = function() {
    if (this.position.x < -this.r) this.position.x = width-this.r;
    if (this.position.y < -this.r) this.position.y = height-this.r;
    if (this.position.x > width+this.r) this.position.x = this.r;
    if (this.position.y > height+this.r) this.position.y = this.r;
  }


  this.display = function() {
    // Draw a triangle rotated in the direction of velocity
    var theta = this.velocity.heading() + PI/2;
    //fill(127);
    //stroke(200);
    //strokeWeight(1);
            y = y + 3;
            
    push();
    //blendMode(DIFFERENCE);
    //fill(h, 300, 320);
    
    translate(this.position.x,this.position.y);
    rotate(theta);
    stroke(h, 320, 360);


    
    // Legs moovement and sound
    if (y <= 0-20 || y >= 0+40) {
      y = 0;
    }
    
    
    line(0, 0, this.r*15, y);
    ellipse(this.r*15, y, 3,3)
    line(0, 0, -this.r*15, y);
    ellipse(-this.r*15, y, 3,3)
    line(0, 0, this.r*15, y+20);
    ellipse(this.r*15, y+20, 3,3)
    line(0, 0, -this.r*15, y+20);
    ellipse(-this.r*15, y+20, 3,3)
    
    line(0, 0, this.r*15, y-40);
    ellipse(this.r*15,y-40, 3,3)
    line(0, 0, -this.r*15, y-40);
    ellipse(-this.r*15, y-40, 3,3)
    line(0, 0, this.r*15, y-60);
    ellipse(this.r*15, y-60, 3,3)
    line(0, 0, -this.r*15, y-60);
    ellipse(-this.r*15, y-60, 3,3);
    
    noStroke();

    push()
    for(var i = 1; i <= 3; ++i){
      rotate(theta)
      //star(0, 0, 10, 40+i, 31+i);
      star(0, 0, 15, 30*i, 20*i)
    }
    pop();
    
   var eye= constrain(20/theta*2, 5, 25);
   
   fill(300, 0, 320);
   ellipse(-10, -7, eye, eye);
   ellipse(10, -7, eye, eye);
   ellipse(-5, -15, eye/1.618, eye/1.618);
   ellipse(5, -15, eye/1.618, eye/1.618);
   
   if (eye >=8){
     
    fill(h, 300, 300);
    ellipse(-10, -7, eye/1.618, eye/1.618);
    ellipse(10, -7, eye/1.618, eye/1.618);
   }
   console.log(eye);

    pop();
  }
}


function star(x, y, radius1, radius2, npoints) {
  var angle = TWO_PI / npoints;
  var halfAngle = angle/2.0;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius2;
    var sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a+halfAngle) * radius1;
    sy = y + sin(a+halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}