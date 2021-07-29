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

function setup() {
  // put setup code here
  createCanvas(600, 600);
  frameRate(60);
  initialPos = createVector(width / 2, height / 2);
  noStroke();
  //Cars.push(new addCar(random(direction), random(turnDirection)));
  TrafficLight = new junction();
  console.log("start");
  // setInterval(function () {
  //   TrafficLight.counter1();
  //   //lightDirection = "down";
  // }, 5000);
  // setInterval(function () {
  //   TrafficLight.counter2();
  //   //lightDirection = "up";
  // }, 10000);
  // setInterval(function () {
  //   TrafficLight.counter3();
  //   //lightDirection = "right";
  // }, 15000);
  // setInterval(function () {
  //   TrafficLight.counter4();
  //   //lightDirection = "left";
  // }, 20000);
}

function draw() {
  // put drawing code here
  background(225);
  TrafficLight.roadOverlay();
  setInterval(function () {
    carCount = queuCars(Cars);
  }, 50);
  TrafficLight.think(carCount);
  TrafficLight.show();
  if (Cars.length == 0) {
    Cars.push(new addCar(random(direction), random(turnDirection)));
  }

  for (var i = Cars.length - 1; i >= 0; i--) {
    Cars[i].display();
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
  //console.log(carLeave);
  if (frameCount >= 2000) {
    nextGeneration();
    frameCount = 0;
    carLeave = 0;
    Cars = [];
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
