function nextGeneration() {
  console.log("Next Generation");
  calculateFitness();
  if (typeof saveTrafficLight == "undefined") {
    console.log("no save junction");
    saveTrafficLight = TrafficLight.copy();
  } else if (saveTrafficLight.fitness < TrafficLight.fitness) {
    console.log("high fitness");
    saveTrafficLight = TrafficLight.copy();
    saveTrafficLight.fitness = TrafficLight.fitness;
  } else if (saveTrafficLight.fitness >= TrafficLight.fitness) {
    TrafficLight = null;
    TrafficLight = saveTrafficLight.copy();
  }
}

function calculateFitness() {
  let remain = 0;
  for (let i = 0; i < carCount.length; i++) {
    remain += carCount[i];
  }
  //console.log(remain);
  TrafficLight.fitness = pow(carLeave, 2) / frameCount;
  console.log(TrafficLight.fitness);
}
