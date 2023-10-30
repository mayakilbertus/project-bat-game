let counter = 0;
const preyArr = [];

setInterval(() => {
  if (counter < 3) {
    counter++;
    const prey = new Prey();
    prey.createPrey(counter);
    preyArr.push(prey);
  }
}, 3000);

document.addEventListener("keydown", (event) => {
  event.preventDefault;
  const biteSound = new Audio("./src/bite-sound.mp3");
  if (event.code === "ArrowUp") {
    batPlayer.moveBatUp();
    const preyDetect = batPlayer.checkForPrey(preyArr);
    if (preyDetect) {
      preyArr.splice(preyDetect[1], 1);
      preyElement.removePrey(preyDetect[0].prey.getAttribute("id"));
      biteSound.play();
    }
    // console.log(preyArr);
  } else if (event.code === "ArrowDown") {
    batPlayer.moveBatDown();
    const preyDetect = batPlayer.checkForPrey(preyArr);
    console.log(preyDetect);

    if (preyDetect) {
      preyArr.splice(preyDetect[1], 1);
      preyElement.removePrey(preyDetect[0].prey.getAttribute("id"));
      biteSound.play();
    }
  } else if (event.code === "ArrowRight") {
    batPlayer.moveBatRight();
    const preyDetect = batPlayer.checkForPrey(preyArr);
    console.log(preyDetect);

    if (preyDetect) {
      preyArr.splice(preyDetect[1], 1);
      preyElement.removePrey(preyDetect[0].prey.getAttribute("id"));
      biteSound.play();
    }
  } else if (event.code === "ArrowLeft") {
    batPlayer.moveBatLeft();
    const preyDetect = batPlayer.checkForPrey(preyArr);
    console.log(preyDetect);

    if (preyDetect) {
      preyArr.splice(preyDetect[1], 1);
      preyElement.removePrey(preyDetect[0].prey.getAttribute("id"));
      biteSound.play();
    }
  }
});
