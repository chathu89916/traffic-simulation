function nextGeneration() {
  console.log("Next Generation");
  calculateFitness();
  if (
    saveTrafficLight == null ||
    saveTrafficLight.fitness < TrafficLight.fitness
  ) {
    console.log("high fitness");
    saveTrafficLight = new junction(TrafficLight.brain);
    saveTrafficLight.fitness = TrafficLight.fitness;
    TrafficLight.mutate(0.05);
  } else if (saveTrafficLight.fitness >= TrafficLight.fitness) {
    TrafficLight.dispose();
    saveTrafficLight.mutate(0.05);
    TrafficLight = new junction(saveTrafficLight.brain);
  }
}

function calculateFitness() {
  TrafficLight.fitness = carLeave / frameCount;
  console.log(TrafficLight.fitness);
}
