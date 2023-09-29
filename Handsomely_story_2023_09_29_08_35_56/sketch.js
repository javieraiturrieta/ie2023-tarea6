function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}
let flock = [];
let bg, fg;

function setup() {
  createCanvas(800, 400);
  bg = createInput("#070707", "color");
  fg = createInput("#c71dd3", "color");
  for (let i = 0; i < 400; i++) {
    flock.push(new Boid());
  }
}

function draw() {
  background(bg.value());

  for (let boid of flock) {
    boid.update();
    boid.show();
  }
}

function mousePressed() {
  push();
  let a = new Boid();
  flock.push(a);
  let b = new Boid();
  flock.push(b);
  let c = new Boid();
  flock.push(c);
  let d = new Boid();
  flock.push(d);
  pop();
}

function keyTyped() {
  if (key === " ") {
    redraw();
  }
}

class Boid {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = p5.Vector.random2D();
    this.acceleration = createVector();
    this.maxSpeed = 2;
    this.maxForce = 0.05;
    this.t = random(100);
    this.radius = 5; // Tamaño del círculo (boid)
  }

  update() {
    let angle = noise(this.t) * TWO_PI;
    let noiseVector = p5.Vector.fromAngle(angle);
    noiseVector.mult(0.5);
    this.velocity.add(noiseVector);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.t += 0.01;
  }

  show() {
    stroke(fg.value());
    noFill();
    ellipse(this.position.x, this.position.y, this.radius * 2);
  }
}
