let system;
let stars = [
  'particles/star0.png',
  'particles/star1.png',
  'particles/star2.png',
  'particles/star3.png',
  'particles/star4.png'
];
let star_png = [];

function preload() {
  for (let i = 0; i < stars.length; i++) {
    star_png[i] = loadImage(stars[i]);
  }
}

let canvas;

function setup() {
  const div_width = document.getElementById('draw').offsetWidth;
  const div_height = displayHeight;
  canvas = createCanvas(div_width, div_height);
  canvas.parent('draw');
  canvas.id('stars');
  system = new System();
}

function draw() {
  let y = window.scrollY;
  canvas.position(0, y);
  translate(0, -y);
  clear();
  system.update();
  system.show();
}

function mouseWheel(event) {
  let y = window.scrollY;
  let v = createVector(0, event.delta);
  if (random(1) < 0.6) system.add(mouseX, mouseY + y, v);
}

function mouseMoved() {
  let y = window.scrollY;
  let v = createVector(mouseX - pmouseX, mouseY - pmouseY);
  if (random(1) < 0.6) system.add(mouseX, mouseY + y, v);
}

class System {
  constructor() {
    this.particles = [];
  }

  add(x, y, v) {
    this.particles.push(new Particle(x, y, v));
  }

  update() {
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].update();
    }
  }

  show() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      if (this.particles[i].lifespan <= 0) {
        this.particles.splice(i, 1);
      } else {
        this.particles[i].show();
      }
    }
  }
}

class Particle {
  constructor(x, y, v) {
    this.position = createVector(x, y);
    this.velocity = v;
    this.velocity.setMag(3);
    this.velocity.mult(-1);
    this.velocity.rotate(random(-1, 1));
    this.drag = 0.95;
    this.lifespan = 800;
    if (random(1) < 0.25) {
      this.lifespan = random(800, 2550);
    }
    this.fade = 100;
    this.img = random(star_png);
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.mult(this.drag);
    this.lifespan -= this.fade;
  }

  show() {
    tint(255, this.lifespan);
    image(this.img, this.position.x, this.position.y, 24, 24);
  }
}