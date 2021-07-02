Cars = [];
var numberofCars = 30;
//var carCount = 0;
let direction = ['down','up','left','right']
let turnDirection = ['left','right']

function setup() {
  // put setup code here
  createCanvas(600, 600);
  frameRate(60);
  initialPos = createVector(width/2, height/2);
  noStroke();
  //Cars = new Array<addCar>(addCar);
  //console.log(initialPos);
  Cars.push(new addCar(random(direction),random(turnDirection)));
  TrafficLights = new junction();
  setInterval(TrafficLights.counter1,5000);
  setInterval(TrafficLights.counter2,10000);
  setInterval(TrafficLights.counter3,15000);
  setInterval(TrafficLights.counter4,20000);
}

function draw() {
  // put drawing code here
  background(225);
 
  TrafficLights.roadOverlay();
  TrafficLights.lightDown();
  TrafficLights.lightUp();
  TrafficLights.lightLeft();
  TrafficLights.lightRight();
  //TrafficLights.redLightDown();
  //console.log(TrafficLights.redLight());
  //console.log(Cars.length);

  for (var i = Cars.length - 1; i >= 0; i--) {
    Cars[i].display();
    
    Cars[i].update();
    //Cars[i].queue(Cars);
    Cars[i].turning(Cars[Cars.length-1].pos);
    
    if (abs(initialPos.dist(Cars[Cars.length - 1].pos)) < random(width/2 - 300, width/2-25) && Cars.length < numberofCars) {
      //console.log(i, initialPos.dist(Cars[i].pos), 'car added');
      Cars.push(new addCar(random(direction),random(turnDirection)));
    }
    if (Cars[i].pos.dist(initialPos) > 600) {
      Cars.splice(i, 1);
    }
  }
}