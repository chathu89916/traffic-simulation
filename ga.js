function resetJunction() {}

function nextGeneration() {
  if (bestLight) {
    bestLight.score = 0;
  }
  normalizeFitness(TrafficLight);
  //console.log(TrafficLight);
  activeLights = generate(TrafficLight);
  //console.log(activeLights);
  TrafficLight = activeLights.slice();
}

function normalizeFitness(junc) {
  for (let i = 0; i < junc.length; i++) {
    junc[i].score = pow(junc[i].score, 2);
  }
  let sum = 0;
  for (let i = 0; i < junc.length; i++) {
    sum += junc[i].score;
  }
  for (let i = 0; i < junc.length; i++) {
    junc[i].fitness = junc[i].score / sum;
  }
}

function generate(oldJunction) {
  let newJunction = [];
  for (let i = 0; i < oldJunction.length; i++) {
    let junc = poolSelection(oldJunction);
    newJunction[i] = junc;
  }
  return newJunction;
}

function poolSelection(junc) {
  let index = 0;
  let r = random(1);
  while (r > 0) {
    r -= junc[index].fitness;
    index += 1;
  }
  index -= 1;
  return junc[index].copy();
}
