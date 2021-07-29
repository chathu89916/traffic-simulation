class junction {
  constructor(brain) {
    this.downLight = true;
    this.upLight = true;
    this.leftLight = true;
    this.rightLight = true;
    this.score = 0;
    this.fitness = 0;
    //this.brain = null;

    if (brain) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetwork(4, 8, 4);
    }
  }

  dispose() {
    this.brain.dispose();
  }

  mutate(a) {
    this.brain.mutate(a);
  }

  think(qLength) {
    let inputs = [];
    inputs = [
      qLength[0] / 20,
      qLength[1] / 20,
      qLength[2] / 20,
      qLength[3] / 20,
    ];
    //console.log(inputs);
    let output = this.brain.predict(inputs);
    //console.log(output);
    let maxAt = 0;
    for (let i = 0; i < output.length; i++) {
      maxAt = output[i] > output[maxAt] ? i : maxAt;
    }
    if (maxAt == 0) {
      this.counter1();
    } else if (maxAt == 1) {
      this.counter2();
    } else if (maxAt == 2) {
      this.counter3();
    } else if (maxAt == 3) {
      this.counter4();
    }
  }

  counter1() {
    this.downLight = false;
    this.upLight = true;
    this.leftLight = true;
    this.rightLight = true;
    lightDirection = "down";
  }

  counter2() {
    this.downLight = true;
    this.upLight = false;
    this.leftLight = true;
    this.rightLight = true;
    lightDirection = "up";
  }

  counter3() {
    this.downLight = true;
    this.upLight = true;
    this.leftLight = false;
    this.rightLight = true;
    lightDirection = "right";
  }

  counter4() {
    this.downLight = true;
    this.upLight = true;
    this.leftLight = true;
    this.rightLight = false;
    lightDirection = "left";
  }

  show() {
    switch (lightDirection) {
      case "down":
        push();
        strokeWeight(5.0);
        stroke("green");
        line(250, 250, 350, 250);
        stroke("red");
        line(250, 350, 350, 350);
        line(250, 250, 250, 350);
        line(350, 250, 350, 350);
        pop();
        break;
      case "up":
        push();
        strokeWeight(5.0);
        stroke("green");
        line(250, 350, 350, 350);
        stroke("red");
        line(250, 250, 350, 250);
        line(250, 250, 250, 350);
        line(350, 250, 350, 350);
        pop();
        break;
      case "left":
        push();
        strokeWeight(5.0);
        stroke("green");
        line(350, 250, 350, 350);
        stroke("red");
        line(250, 350, 350, 350);
        line(250, 250, 250, 350);
        line(250, 250, 350, 250);
        pop();
        break;
      case "right":
        push();
        strokeWeight(5.0);
        stroke("green");
        line(250, 250, 250, 350);
        stroke("red");
        line(250, 350, 350, 350);
        line(250, 250, 350, 250);
        line(350, 250, 350, 350);
        pop();
        break;
    }
  }

  // lightDown() {
  //   push();
  //   var red = this.downLight;
  //   strokeWeight(5.0);
  //   if (red == true) {
  //     stroke("red");
  //   }
  //   if (red == false) {
  //     stroke("green");
  //   }
  //   line(250, 250, 350, 250);
  //   pop();
  // }
  // lightUp() {
  //   push();
  //   strokeWeight(5.0);
  //   var red = this.upLight;
  //   strokeWeight(5.0);
  //   if (red == true) {
  //     stroke("red");
  //   }
  //   if (red == false) {
  //     stroke("green");
  //   }
  //   line(250, 350, 350, 350);
  //   pop();
  // }
  // lightLeft() {
  //   push();
  //   strokeWeight(5.0);
  //   var red = this.leftLight;
  //   strokeWeight(5.0);
  //   if (red == true) {
  //     stroke("red");
  //   }
  //   if (red == false) {
  //     stroke("green");
  //   }

  //   pop();
  // }
  // lightRight() {
  //   push();
  //   strokeWeight(5.0);
  //   var red = this.rightLight;
  //   strokeWeight(5.0);
  //   if (red == true) {
  //     stroke("red");
  //   }
  //   if (red == false) {
  //     stroke("green");
  //   }
  //   line(350, 250, 350, 350);
  //   pop();
  // }
  roadOverlay() {
    push();
    strokeWeight(5.0);
    stroke(150);
    line(0, 250, 250, 250);
    line(0, 350, 250, 350);
    line(350, 250, width, 250);
    line(350, 350, width, 350);
    line(250, 0, 250, 250);
    line(350, 0, 350, 250);
    line(250, 350, 250, height);
    line(350, 350, 350, height);
    linedash(350, 300, width, 300, 15);
    linedash(250, 300, 0, 300, 15);
    linedash(300, 250, 300, 0, 15);
    linedash(300, 350, 300, height, 15);
    pop();
  }
}

function linedash(x1, y1, x2, y2, delta, style = "-") {
  // delta is both the length of a dash, the distance between 2 dots/dashes, and the diameter of a round
  let distance = dist(x1, y1, x2, y2);
  let dashNumber = distance / delta;
  let xDelta = (x2 - x1) / dashNumber;
  let yDelta = (y2 - y1) / dashNumber;

  for (let i = 0; i < dashNumber; i += 2) {
    let xi1 = i * xDelta + x1;
    let yi1 = i * yDelta + y1;
    let xi2 = (i + 1) * xDelta + x1;
    let yi2 = (i + 1) * yDelta + y1;

    if (style == "-") {
      line(xi1, yi1, xi2, yi2);
    } else if (style == ".") {
      point(xi1, yi1);
    } else if (style == "o") {
      ellipse(xi1, yi1, delta / 2);
    }
  }
}
