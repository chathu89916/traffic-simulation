//Cars = [];
var numberofCars = 20;
var numberofSims = 20;
let direction = ["down", "up", "left", "right"];
let turnDirection = ["left", "right"];
let lightDirection;
let carLeave = 0;
let frameCount = 0;
let TrafficLight = [];
let activeLights = [];
let saveTrafficLight;
let carCount = [];
let savedJson;
let target;
let bestLight;
let highScore = 0;

function keyPressed() {
  if (key === "S") {
    let best = bestLight;
    saveJSON(best.brain, "best.json");
  }
}

// if (keyCode === LEFT_ARROW) {
//   TrafficLight.counter3();
//   let tar = [1, 0, 0, 0];
//   TrafficLight.brain.train(carCount, tar);
// }
// if (keyCode === RIGHT_ARROW) {
//   TrafficLight.counter4();
//   let tar = [0, 1, 0, 0];
//   TrafficLight.brain.train(carCount, tar);
// }
// if (keyCode === UP_ARROW) {
//   TrafficLight.counter1();
//   let tar = [0, 0, 1, 0];
//   TrafficLight.brain.train(carCount, tar);
// }
// if (keyCode === DOWN_ARROW) {
//   TrafficLight.counter2();
//   let tar = [0, 0, 0, 1];
//   TrafficLight.brain.train(carCount, tar);
// }
//}

// function preload() {
//   savedJson = loadJSON("best5.json");
// }

function setup() {
  // put setup code here
  createCanvas(600, 600);
  frameRate(60);
  initialPos = createVector(width / 2, height / 2);
  noStroke();
  //Cars.push(new addCar(random(direction), random(turnDirection)));
  //tf.setBackend("cpu");
  // let savedBrain = NeuralNetwork.deserialize(savedJson);
  // TrafficLight = new junction(savedBrain);
  for (let i = 0; i < numberofSims; i++) {
    let light = new junction();
    TrafficLight[i] = light;
  }
  slider = createSlider(1, 10, 1);
  console.log("start");
  Direction = "left";
}

function draw() {
  // put drawing code here

  for (let n = 0; n < slider.value(); n++) {
    for (let i = numberofSims - 1; i >= 0; i--) {
      TrafficLight[i].runCar();
      carCount = queuCars(TrafficLight[i].Cars);
      TrafficLight[i].think(carCount);
    }

    //TrafficLight.think(carCount);
    // if (Cars.length == 0) {
    //   Cars.push(new addCar(random(direction), random(turnDirection)));
    // }

    // for (var i = Cars.length - 1; i >= 0; i--) {
    //   Cars[i].follow();
    //   Cars[i].lightCheck(lightDirection, Cars);
    //   Cars[i].update();

    //   let r = random(1);
    //   if (r < 0.001 && Cars.length < numberofCars) {
    //     Cars.push(new addCar(random(direction), random(turnDirection)));
    //   }

    //   // if (
    //   //   Math.abs(initialPos.dist(Cars[Cars.length - 1].pos)) <
    //   //     random(width / 2 - 300, width / 2 - 20) &&
    //   //   Cars.length < numberofCars
    //   // ) {
    //   //   Cars.push(new addCar(random(direction), random(turnDirection)));
    //   // }
    //   if (Cars[i].pos.dist(initialPos) > 310) {
    //     Cars.splice(i, 1);
    //     carLeave++;
    //   }
    // }
    frameCount++;
    if (frameCount >= 10000) {
      calHigh();
      console.log(highScore);
      nextGeneration();

      frameCount = 0;
      for (let i = 0; i < TrafficLight.length; i++) {
        TrafficLight[i].Cars = [];
        TrafficLight[i].score = 0;
      }
      carCount = 0;
    }
  }

  background(225);
  roadOverlay();
  TrafficLight[1].show();
  // for (let i = 0; i < numberofSims; i++) {
  //   TrafficLight[i].show();
  // }
}

function queuCars(Cars) {
  let Lcount = 0;
  let Rcount = 0;
  let Ucount = 0;
  let Dcount = 0;

  for (var i = Cars.length - 1; i >= 0; i--) {
    if (Math.abs(Cars[i].pos.y - 275) < 20 && 225 - Cars[i].pos.x < 200) {
      Lcount++;
    }
    if (Math.abs(Cars[i].pos.y - 325) < 20 && Cars[i].pos.x - 375 < 200) {
      Rcount++;
    }
    if (Math.abs(Cars[i].pos.x - 275) < 20 && Cars[i].pos.y - 375 < 200) {
      Dcount++;
    }
    if (Math.abs(Cars[i].pos.x - 325) < 20 && 225 - Cars[i].pos.y < 200) {
      Ucount++;
    }
  }
  let qCount = [Lcount, Rcount, Ucount, Dcount];
  return qCount;
}

function roadOverlay() {
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

function calHigh() {
  let tempJunction = null;
  let tempHighScore = 0;
  for (let i = 0; i < TrafficLight.length; i++) {
    let s = TrafficLight[i].score;

    if (s > tempHighScore) {
      tempHighScore = s;
      tempJunction = TrafficLight[i];
    }
  }

  if (tempHighScore > highScore) {
    highScore = tempHighScore;
    bestLight = tempJunction;
  } else {
    //console.log(bestLight);
    tempHighScore = bestLight.score;
    if (tempHighScore > highScore) {
      highScore = tempHighScore;
    }
  }
}
