function pelino(){
  push()
  for(var x = separator/2; x <= width; x+=separator){
    for(var y = separator/2; y <= height; y+=separator){
      
      //p[x] = new Particle(0.1, this.position, this.position);
      //p[y] = new Particle(0.1, 0, 0);
      
      stroke(h, 300, 300);
      strokeWeight(0.5);
			line(x, y, x+10, y+10);
    }
  }
  pop()
}