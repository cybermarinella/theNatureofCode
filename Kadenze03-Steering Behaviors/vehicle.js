// Daniel Shiffman Base
// https://www.kadenze.com/courses/the-nature-of-code
// http://natureofcode.com/
// Rainbow Puffs

// The "Rainbow PUFF" constructor

function Vehicle(x,y,ms,mf, colors) {
  this.position = createVector(x,y);
  this.acceleration = createVector(0,0);
  this.velocity = createVector(0,0);
  this.r = 3;
  this.maxspeed = ms || 3;
  this.maxforce = mf || 0.8;

  this.trailPoints = []
  this.trailLength = 100;

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


  this.update = function() {
     fill(colors, 100, 90);
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset accelerationelertion to 0 each cycle
    this.acceleration.mult(0);
  }

  this.resetTrail = function() {
    this.trailPoints.splice(0, this.trailPoints.length); //qui
  }

  // Wraparound
  this.borders = function() {
    if (this.position.x < -this.r) {
      this.position.x = width-this.r;
      this.resetTrail();
    }
    if (this.position.y < -this.r) {
      this.position.y = height-this.r;
      this.resetTrail();
    }
    if (this.position.x > width+this.r) {
      this.position.x = this.r;
      this.resetTrail();
    }
    if (this.position.y > height+this.r) {
      this.position.y = this.r;
      this.resetTrail();
    }
  }


  this.display = function() {
    // Draw a Puff rotated in the direction of velocity
    var theta = this.velocity.heading() + PI/2;
    var erre = this.r;
    var eye = constrain(20/theta*2, 5, 20);
    y = y +3;
    console.log(this.velocity.y)

    push();

    this.trail(this.position);

    //rotate Puff
    translate(this.position.x,this.position.y);
    rotate(theta);

    // Legs moovement
    if (y <= 0-20 || y >= 0+40) {
      y = 0;
    }

    coda(x, y, erre);
    leg01(y, erre, colors);
    leg02(y, erre, colors);
    body(theta, colors);
    eyes(eye, colors);

    pop();
  }

  this.trail = function(position, erre) {
    this.trailPoints.push(position.copy());
    if(this.trailPoints.length > this.trailLength) {
      this.trailPoints.shift();
    }

    noFill();
    stroke(colors,100,100);
    beginShape();
    for(p of this.trailPoints) {
      vertex(p.x, p.y);
    }
    endShape();
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

function coda(x, y, erre){ };

function leg01(y, erre, colors){
  stroke(colors, 100, 100);
  fill(colors, 100, 100);
  var walkA = y;
  var walkB = -y;
      //DX_01
      line(0, 0, erre*15, walkB+60);
      ellipse(erre*15, walkB+60, 5, 5);
      //DX_02
      line(0, 0, erre*15, walkA-40);
      ellipse(erre*15,walkA-40, 5, 5);
      //DX_03
      line(0, 0, erre*15, walkB);
      ellipse(erre*15, walkB, 5, 5);
      //DX_04
      line(0, 0, erre*15, walkA+20);
      ellipse(erre*15, walkA+20, 5, 5);
}

function leg02(y, erre, colors){
  stroke(colors, 100, 100);
    var walkA = y;
  var walkB = -y;
  //SX_01
      line(0, 0, -erre*15, walkB+60);
      ellipse(-erre*15, walkB+60, 5, 5);

  //SX_02
      line(0, 0, -erre*15, walkA-40);
      ellipse(-erre*15,walkA-40, 5, 5);
  
  //SX_03
      line(0, 0, -erre*15, walkB);
      ellipse(-erre*15, walkB, 5, 5);
  
  //SX_04
      line(0, 0, -erre*15, walkA+20);
      ellipse(-erre*15, walkA+20, 5, 5);
}

function body(theta, colors){
    noStroke();
    
    push()
    //for(var i = 1; i <= 3; ++i){
      rotate(theta)
      image(body_01s, -body_01s.width/2, -body_01s.height/2);
      rotate(theta)
      image(body_01l, -body_01l.width/2, -body_01l.height/2);
      rotate(theta)
      image(body_01l, -body_01l.width/2, -body_01l.height/2);
      //fill(colors, 100, 100);
      //ellipse(0, 0, 90, 90);
      
    //}
    pop();
}

function eyes(eye, colors){
    fill(100, 0, 95);
    ellipse(-10, -7, eye, eye);
    ellipse(10, -7, eye, eye);
    ellipse(-5, -15, eye/1.618, eye/1.618);
    ellipse(5, -15, eye/1.618, eye/1.618);
     
    if (eye >=8){
      fill(colors, 90, 60);
      ellipse(-10, -7, eye/1.618, eye/1.618);
      ellipse(10, -7, eye/1.618, eye/1.618);
      if(eye >=20){
        fill(100, 0, 95,60);
        arc(0, 8, 30, 30, TWO_PI, PI);
      }
    }else{
      //fill(colors, 100, 90);
      ellipse(-10, 0, eye/2, eye/2);
      ellipse(10, 0, eye/2, eye/2);
    }
    fill(100, 0, 95);
    ellipse(-10, 10, eye/2, eye/2);
    ellipse(10, 10, eye/2, eye/2);

}
