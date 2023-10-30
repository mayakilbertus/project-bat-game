let counterPrey = 0;
const preyArr = [];

setInterval(() => {
  counterPrey++;
  const prey = new Prey();
  prey.createPrey(counterPrey);
  preyArr.push(prey);
}, 3000);

setInterval(() => {
  preyElement.removePrey(preyArr[0].prey.getAttribute("id"));
  preyArr.shift();
}, 7000);

let counterGameTime = 22;
const timeElement = document.getElementById("time");

const timer = setInterval(() => {
  if (counterGameTime == 24) {
    counterGameTime = 0;
    timeElement.innerHTML = `${counterGameTime}:00 h`;
  } else {
    counterGameTime++;
    timeElement.innerHTML = `${counterGameTime}:00 h`;
  }
}, 8000);

setTimeout(() => {
  clearInterval(timer);
  if (batPlayer.showEnergyLevel() >= 80) {
    window.alert("You survived the day!");
  } else {
    window.alert("You died!");
  }
}, 70000);

document.addEventListener("keydown", (event) => {
  event.preventDefault;
  if (event.code === "ArrowUp") {
    batPlayer.moveBatUp();
    const preyDetect = batPlayer.checkForPrey(preyArr);
    if (preyDetect) {
      preyArr.splice(preyDetect[1], 1);
      preyElement.removePrey(preyDetect[0].prey.getAttribute("id"));
    }
  } else if (event.code === "ArrowDown") {
    batPlayer.moveBatDown();
    const preyDetect = batPlayer.checkForPrey(preyArr);

    if (preyDetect) {
      preyArr.splice(preyDetect[1], 1);
      preyElement.removePrey(preyDetect[0].prey.getAttribute("id"));
    }
  } else if (event.code === "ArrowRight") {
    batPlayer.moveBatRight();
    const preyDetect = batPlayer.checkForPrey(preyArr);

    if (preyDetect) {
      preyArr.splice(preyDetect[1], 1);
      preyElement.removePrey(preyDetect[0].prey.getAttribute("id"));
    }
  } else if (event.code === "ArrowLeft") {
    batPlayer.moveBatLeft();
    const preyDetect = batPlayer.checkForPrey(preyArr);

    if (preyDetect) {
      preyArr.splice(preyDetect[1], 1);
      preyElement.removePrey(preyDetect[0].prey.getAttribute("id"));
    }
  }
});
