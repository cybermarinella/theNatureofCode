// The Nature of Code - Daniel Shiffman
// Kadenze fractals session
// http://natureofcode.com

var tree = [];
var tree2 = [];
var tree3 = [];
var leaves = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  var size = random(100, 140);
  var b = new Branch(createVector(width / 1.618, height), createVector(0, -4), 130, 2 );
  var b2 = new Branch(createVector(width / 1.618, height-160), createVector(0, -4), 90, 0.7 );
  var b3 = new Branch(createVector(width / 1.618, height-320), createVector(0, -4), 50, 0.5 );
  tree.push(b);
  tree2.push(b2);
  tree3.push(b3);
}

function draw() {
  background(233);
  for (var i = 0; i < tree.length; i++) {
    // Get the branch, update and draw it
    tree[i].update();
    tree[i].render();
    
    tree2[i].update();
    tree2[i].render();
    
    tree3[i].update();
    tree3[i].render();
    
    if (tree[i].timeToBranch() ) {
      if (tree.length < 150) {
        
        for (var ni = 0; ni < 12; ni++) {
          var natural = random(160, 180);
            tree.push(tree[i].branch(30*ni-natural));
        }

      } else {
        leaves.push(new Leaf(tree[i].end));
      }
    }
    
    if (tree2[i].timeToBranch() ) {
      if (tree.length < 150) {
        for (var ni = 0; ni < 12; ni++) {
          var natural = random(160, 180);
            tree2.push(tree2[i].branch(30*ni-natural/2));
        }

      } else {
        leaves.push(new Leaf(tree[i].end));
      }
    }
    
    if (tree3[i].timeToBranch() ) {
      if (tree.length < 150) {
        for (var ni = 0; ni < 12; ni++) {
          var natural = random(160, 180);
            tree3.push(tree3[i].branch(30*ni-natural/4));
        }

      } else {
        leaves.push(new Leaf(tree[i].end));
      }
    }
  }
  println(leaves.length);


}

// Reset and random on press
function mousePressed() {
  location.reload();
}