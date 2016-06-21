// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

var tree = [];
var leaves = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  var size = random(130, 150);
  var b = new Branch(createVector(width / 2, height), createVector(0, -4), size );
  tree.push(b);
}

function draw() {
  background(233);
  for (var i = 0; i < tree.length; i++) {
    // Get the branch, update and draw it
    tree[i].update();
    tree[i].render();
    
    if (tree[i].timeToBranch()) {
      if (tree.length < 150) {
        tree.push(tree[i].branch(-30));
        tree.push(tree[i].branch(30));
        tree.push(tree[i].branch(-60));
        tree.push(tree[i].branch(60));
        tree.push(tree[i].branch(-80));
        tree.push(tree[i].branch(80));
        tree.push(tree[i].branch(-10));
        tree.push(tree[i].branch(10));
        tree.push(tree[i].branch(-100));
        tree.push(tree[i].branch(100));
        tree.push(tree[i].branch(-130));
        tree.push(tree[i].branch(130));

      } else {
        leaves.push(new Leaf(tree[i].end));
      }
    }
  }
  //println(leaves.length);

  /*for (var i = 0; i < leaves.length; i++) {
    leaves[i].display();
    leaves[i].update();
  }*/

}

// Reset and random on press
function mousePressed() {
  location.reload();
}