var Cars = [];
var numberofCars = 10;
var carCount = 0;
let direction = ['down','up','left','right']
let turnDirection = ['left','right']

function setup() {
  // put setup code here
  createCanvas(600, 600);
  frameRate(60);
  initialPos = createVector(width/2, height/2);
  noStroke();
  //console.log(initialPos);
  Cars.push(new addCar(random(direction), random(turnDirection)));
  TrafficLights = new junction();
}

function draw() {
  // put drawing code here
  background(225);
  TrafficLights.roadOverlay();
  TrafficLights.lightDown();
  TrafficLights.lightUp();
  TrafficLights.lightLeft();
  TrafficLights.lightRight();
  TrafficLights.redLightDown();
  //console.log(TrafficLights.redLight());

  for (var i = Cars.length - 1; i >= 0; i--) {
    Cars[i].display();
    Cars[i].update(TrafficLights.redLightDown(), Cars[Cars.length-1].pos);
    if (abs(initialPos.dist(Cars[Cars.length - 1].pos)) < random(width/2 - 300, width/2-25) && carCount < numberofCars) {
      //console.log(i, initialPos.dist(Cars[i].pos), 'car added');
      Cars.push(new addCar(random(direction),random(turnDirection)));
      carCount++;
    }
    if (Cars[i].pos.dist(initialPos) > 600) {
      Cars.splice(i, 1);
    }
  }
}