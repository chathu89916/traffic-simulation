Cars = [];
var numberofCars = 20;
let direction = ["down", "up", "left", "right"];
let turnDirection = ["left", "right"];
let lightDirection;
let carLeave = 0;
let frameCount = 0;
let TrafficLight;
let saveTrafficLight;
let carCount = [];
let savedJson;

function keyPressed() {
  if (key === "S") {
    let best = saveTrafficLight;
    saveJSON(best.brain, "best.json");
  }
}

function preload() {
  savedJson = loadJSON("best.json");
}

function setup() {
  // put setup code here
  createCanvas(600, 600);
  frameRate(60);
  initialPos = createVector(width / 2, height / 2);
  noStroke();
  //Cars.push(new addCar(random(direction), random(turnDirection)));
  //tf.setBackend("cpu");
  let savedBrain = NeuralNetwork.deserialize(savedJson);
  TrafficLight = new junction(savedBrain);
  slider = createSlider(1, 20, 1);
  console.log("start");
  Direction = "left";
}

function draw() {
  // put drawing code here

  for (let n = 0; n < slider.value(); n++) {
    carCount = queuCars(Cars);
    TrafficLight.think(carCount);
    if (Cars.length == 0) {
      Cars.push(new addCar(random(direction), random(turnDirection)));
    }

    for (var i = Cars.length - 1; i >= 0; i--) {
      Cars[i].follow();
      Cars[i].lightCheck(lightDirection, Cars);
      Cars[i].update();

      if (
        Math.abs(initialPos.dist(Cars[Cars.length - 1].pos)) <
          random(width / 2 - 300, width / 2 - 50) &&
        Cars.length < numberofCars
      ) {
        Cars.push(new addCar(random(direction), random(turnDirection)));
      }
      if (Cars[i].pos.dist(initialPos) > 310) {
        Cars.splice(i, 1);
        carLeave++;
      }
    }
    frameCount++;
    if (frameCount >= 5000) {
      nextGeneration();
      frameCount = 0;
      carLeave = 0;
      Cars = [];
    }
  }

  background(225);
  TrafficLight.roadOverlay();
  TrafficLight.show();
  for (var i = Cars.length - 1; i >= 0; i--) {
    Cars[i].display();
  }
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
