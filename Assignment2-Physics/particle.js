// Daniel Shiffman
// https://www.kadenze.com/courses/the-nature-of-code
// http://natureofcode.com/
// Session 2: Drag Force

function Particle(m,x,y) {
  this.mass = m;
  this.position = createVector(x,y-8*5);
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
  
  var porzioni = int(random(3, 21));
    
  this.display = function() {
    ellipse(this.position.x,this.position.y,this.mass*13,this.mass*13);
    for (var i = 1; i <= porzioni; ++i) {
      var angle = i * TWO_PI / porzioni;
      var x = this.position.x + cos(angle) * 50;
      var y = this.position.y + sin(angle) * 50;
      ellipse(x, y, this.mass*8, this.mass*8);
    }
  };
  
  // stop audio (do not disturb)
    var id = 1;
    var ip = 1;
    var it = 1;
    
  this.checkEdges = function() {
    // screen margins
    if (this.position.y > height) {
      this.velocity.y *= -0.9;  // A little dampening when hitting the bottom
      this.position.y = height;
      if(m==m1){
        Poff.stop();
        if(ip <= 11){
          Poff.play();
          ++ip;
        }else{
          console.log ("Poff");
        }
      }else{
        Tac.stop();
        if(it <= 22){
          Tac.play();
          ++it;
        }else{
          console.log ("Tac");
        }
      }
    }
    if (this.position.y < 0) {
      this.velocity.y *= -0.1;  // no dampening when hitting the top
      this.position.y = 0;
      if(m==m1){
        Poff.stop();
        if(ip <= 11){
          Poff.play();
          ++ip;
        }else{
          console.log ("Poff");
        }
      }else{
        Tac.stop();
        if(it <= 22){
          Tac.play();
          ++it;
        }else{
          console.log ("Tac");
        }
      }
    }
    if (this.position.x > width) {
      this.velocity.x *= -0.9;  // A little dampening when hitting the right
      this.position.x = width;
      if(m==m1){
        Poff.stop();
        if(ip <= 11){
          Poff.play();
          ++ip;
        }else{
          console.log ("Poff");
        }
      }else{
        Tac.stop();
        if(it <= 22){
          Tac.play();
          ++it;
        }else{
          console.log ("Tac");
        }
      }
    }
    if (this.position.x < 0) {
      this.velocity.x *= -0.1;  // no dampening when hitting the left
      this.position.x = 0;
      if(m==m1){
        Poff.stop();
        if(ip <= 11){
          Poff.play();
          ++ip;
        }else{
          console.log ("Poff");
        }

      }else{
        Tac.stop();
        if(it <= 22){
          Tac.play();
          ++it;
        }else{
          console.log ("Tac");
        }
      }
    }
    if (this.position.x > width/2-liquidSize/2-80) {
      if (this.position.x < width/2-liquidSize/2+20) {
        
        Tac.stop();
        Din.stop();

        if(id <= 25){
          Din.play();
          ++id;
        }else{
         console.log ("Din");
        }
      }
    }
    
    /*if (distance < liquidSize/2) {
        Tac.stop();
        Din.stop();
        if(m==m2){
          if(id <= 25){
            Din.play();
            //console.log (distance);
            ++id;
          }else{
            //console.log (distance);
          }
        }
    }*/
    
  };

}
