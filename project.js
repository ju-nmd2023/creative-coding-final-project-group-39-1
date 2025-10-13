let particleSystem;
let flow;
let hueShift = 0;

function setup() {
    createCanvas(800, 500);
    colorMode(HSB, 360, 100, 100, 100);
    noStroke();
    background(230, 60, 15);

    flow = new FlowField(20);
    particleSystem = new ParticleSystem(300);
}

function draw() {
    fill(230, 60, 15, 20);
    rect(0, 0, width, height); // chatGPT helped me here because I could not see the background, https://chatgpt.com/c/68e6249a-2114-8332-a5a1-32b0c14cffdd

    hueShift = (hueShift + 0.3) % 360;

    flow.update(); // got some help here by ChatGPT, https://chatgpt.com/c/68ecbc49-aba8-8327-9aa0-d597893e670b
    particleSystem.run(flow, hueShift); 
}


class FlowField {
    constructor(scale) {
        this.scale = scale;
        this.cols = ceil(width / this.scale);
        this.rows = ceil(height / this.scale);
        this.zoff = random(1000);
        this.inc = 0.1;
        this.field = [];
        this.update();

    }
update() {
    let yoff = 0;
    for (let y = 0; y < this.rows; y++) {
        let xoff = 0;
        for (let x = 0; x < this.cols; x++) {
            let index = x + y * this.cols;
            let angle = noise(xoff, yoff, this.zoff) * TWO_PI * 2;
            let v = p5.Vector.fromAngle(angle);
            v.setMag(1);
            this.field[index] = v;
            xoff += this.inc;
        }
        yoff += this.inc;
    }
    this.zoff += 0.002;
}

lookup(pos) {
    let col = floor(constrain(pos.x / this.scale, 0, this.cols - 1)); // here I got some help by chatgpt, https://chatgpt.com/c/68ecb7db-0a4c-8331-b512-1b0a754098e9
    let row = floor(constrain(pos.y / this.scale, 0, this.rows - 1));
    return this.field[col + row * this.cols].copy();
}
    
}

class Particle {
    constructor(x, y, hue) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.hue = hue;
        this.alpha = random(60, 100);
        this.size = random(1, 3);
    }

    follow(flow) { // here chatgpt helped me fix the error, https://chatgpt.com/c/68ecbc49-aba8-8327-9aa0-d597893e670b
        let desired = flow.lookup(this.pos);
        this.applyForce(desired);
    }

    applyForce(force) {
        this.acc.add(force);

    }

    update() {
        this.vel.add(this.acc);
        this.vel.limit(2);
        this.pos.add(this.vel);
        this.acc.mult(0);
        this.edges();
    }

    edges() {
        if (this.pos.x > width) this.pos.x = 0; // in this part I gor help by chatGPT, https://chatgpt.com/c/68ecb623-0598-8325-9cf4-453c6c32c5e9
        if (this.pos.x < 0) this.pos.x = width;
        if (this.pos. y > height) this.pos.y = 0;
        if (this.pos.y < 0) this.pos.y = height;
    }

    show() {
        push();
        blendMode(ADD);
        let currentHue = (this.baseHue + hueShift) % 360;
        fill(currentHue, 80, 100, this.alpha);
        ellipse(this.pos.x, this.pos.y, this.size);
        pop();
    }
}

class ParticleSystem {
    constructor(num) {
this.particles = [];
for (let i = 0; i < num; i++) {
    this.particles.push(new Particle(random(width), random(height), random(160, 220)));
}
    }

   run(flow, hueShift) {
    for (let p of this.particles) {
        p.follow(flow);
        p.update();
        p.show();
    }
   }

}
