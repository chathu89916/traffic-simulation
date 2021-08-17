function mutate(x) {
  if (random(1) < 0.1) {
    let offset = randomGaussian() * 0.5;
    let newx = x + offset;
    return newx;
  } else {
    return x;
  }
}

class junction {
  constructor(brain) {
    this.downLight = true;
    this.upLight = true;
    this.leftLight = true;
    this.rightLight = true;
    this.score = 0;
    this.fitness = 0;
    this.Cars = [];
    this.lightDirection;
    //this.brain = null;

    if (brain) {
      this.brain = brain.copy();
      this.brain.mutate(mutate);
    } else {
      this.brain = new NeuralNetwork(4, 12, 4);
    }
  }

  // dispose() {
  //   this.brain.dispose();
  // }

  runCar() {
    if (this.Cars.length == 0) {
      this.Cars.push(new addCar(random(direction), random(turnDirection)));
    }

    for (var i = this.Cars.length - 1; i >= 0; i--) {
      this.Cars[i].follow();
      this.Cars[i].lightCheck(this.lightDirection, this.Cars);
      this.Cars[i].update();

      let r = random(1);
      if (r < 0.001 && this.Cars.length < numberofCars) {
        this.Cars.push(new addCar(random(direction), random(turnDirection)));
      }

      // if (
      //   Math.abs(initialPos.dist(this.Cars[this.Cars.length - 1].pos)) <
      //     random(width / 2 - 300, width / 2 - 20) &&
      //   this.Cars.length < numberofthis.Cars
      // ) {
      //   this.Cars.push(new addCar(random(direction), random(turnDirection)));
      // }
      if (this.Cars[i].pos.dist(initialPos) > 310) {
        this.Cars.splice(i, 1);
        this.score++;
      }
    }
  }

  copy() {
    return new junction(this.brain);
  }

  think(qLength) {
    let inputs = [];
    inputs = [
      qLength[0] / numberofCars,
      qLength[1] / numberofCars,
      qLength[2] / numberofCars,
      qLength[3] / numberofCars,
    ];
    //console.log(inputs);
    let output = this.brain.predict(inputs);
    //console.log(output);
    let maxAt = 0;
    for (let i = 0; i < output.length; i++) {
      maxAt = output[i] > output[maxAt] ? i : maxAt;
    }
    // console.log(output);
    // console.log(maxAt);
    if (maxAt == 0) {
      this.counter3();
    } else if (maxAt == 1) {
      this.counter4();
    } else if (maxAt == 2) {
      this.counter1();
    } else if (maxAt == 3) {
      this.counter2();
    }
  }

  counter1() {
    this.downLight = false;
    this.upLight = true;
    this.leftLight = true;
    this.rightLight = true;
    this.lightDirection = "down";
  }

  counter2() {
    this.downLight = true;
    this.upLight = false;
    this.leftLight = true;
    this.rightLight = true;
    this.lightDirection = "up";
  }

  counter3() {
    this.downLight = true;
    this.upLight = true;
    this.leftLight = false;
    this.rightLight = true;
    this.lightDirection = "right";
  }

  counter4() {
    this.downLight = true;
    this.upLight = true;
    this.leftLight = true;
    this.rightLight = false;
    this.lightDirection = "left";
  }

  show() {
    switch (this.lightDirection) {
      case "down":
        push();
        strokeWeight(5.0);
        stroke("green");
        line(250, 250, 350, 250);
        stroke(255, 0, 0, 60);
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
        stroke(255, 0, 0, 60);
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
        stroke(255, 0, 0, 60);
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
        stroke(255, 0, 0, 60);
        line(250, 350, 350, 350);
        line(250, 250, 350, 250);
        line(350, 250, 350, 350);
        pop();
        break;
    }

    for (var i = this.Cars.length - 1; i >= 0; i--) {
      this.Cars[i].display();
    }
  }

  // roadOverlay() {
  //   push();
  //   strokeWeight(5.0);
  //   stroke(150);
  //   line(0, 250, 250, 250);
  //   line(0, 350, 250, 350);
  //   line(350, 250, width, 250);
  //   line(350, 350, width, 350);
  //   line(250, 0, 250, 250);
  //   line(350, 0, 350, 250);
  //   line(250, 350, 250, height);
  //   line(350, 350, 350, height);
  //   linedash(350, 300, width, 300, 15);
  //   linedash(250, 300, 0, 300, 15);
  //   linedash(300, 250, 300, 0, 15);
  //   linedash(300, 350, 300, height, 15);
  //   pop();
  // }
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
