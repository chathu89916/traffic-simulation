var Cars = [];
var numberofCars = 10;
var carCount = 0;
let direction = 'left'

function setup() {
  // put setup code here
  createCanvas(600, 600);
  initialPos = createVector(width/2, height/2);
  noStroke();
  console.log(initialPos);
  Cars.push(new addCar(direction, 'right'));
}

function draw() {
  // put drawing code here
  background(225);
  for (var i = Cars.length - 1; i >= 0; i--) {
    Cars[i].display();
    Cars[i].update();
    if (abs(initialPos.dist(Cars[Cars.length - 1].pos)) < random(width/2 - 300, width/2-25) && carCount < numberofCars) {
      console.log(i, initialPos.dist(Cars[i].pos), 'car added');
      Cars.push(new addCar(direction,'left'));
      carCount++;
    }
    if (Cars[i].pos.dist(initialPos) > 600) {
      Cars.splice(i, 1);
    }
  }
}