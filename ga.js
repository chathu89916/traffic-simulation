function nextGeneration() {
  console.log("Next Generation");
  calculateFitness();
  if (typeof saveTrafficLight == "undefined") {
    console.log("no brain");
    saveTrafficLight = new junction(TrafficLight.brain);
  } else if (saveTrafficLight.fitness < TrafficLight.fitness) {
    console.log("high fitness");
    saveTrafficLight.dispose();
    saveTrafficLight = new junction(TrafficLight.brain);
    saveTrafficLight.fitness = TrafficLight.fitness;
    TrafficLight.mutate(0.1);
  } else if (saveTrafficLight.fitness >= TrafficLight.fitness) {
    TrafficLight.dispose();
    //saveTrafficLight.mutate(0.05);
    TrafficLight = new junction(saveTrafficLight.brain);
    TrafficLight.mutate(0.1);
  }
}

function calculateFitness() {
  let remain = 0;
  for (let i = 0; i < carCount.length; i++) {
    remain += carCount[i];
  }
  //console.log(remain);
  TrafficLight.fitness = (carLeave - remain) / frameCount;
  console.log(TrafficLight.fitness);
}
