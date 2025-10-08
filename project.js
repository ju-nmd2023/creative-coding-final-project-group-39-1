let particleSystem;
let flow;

function setup() {
    createCanvas(800, 500);
    noStroke();
    background(10, 15, 35);

    flow = new FlowField();
    particleSystem = new ParticleSystem();
}

function draw() {
    fill(10, 15, 35, 20);
    rect(0, 0, width, height); // chatGPT helped me here because I could not see the background, https://chatgpt.com/c/68e6249a-2114-8332-a5a1-32b0c14cffdd
}

class FlowField {
    constructar (scale) {
        this.scale = scale;
        this.cols = ceil(width / this.scale);
        this.rows = ceil(height / this.scale);

    }
}

class Particle {
    constructor(x, y, hue) {

    }
}

class ParticleSystem {
    constructor(num) {
this.particles = [];
for (let i = 0; i < num; i++) {
    this.particles.push(new Particle(random(width), random(height), random(160, 220)));
}
    }
}
