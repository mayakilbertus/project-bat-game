document.addEventListener("keydown", (event) => {
  if (event.code === "ArrowUp") {
    batPlayer.moveBatUp();
  } else if (event.code === "ArrowDown") {
    batPlayer.moveBatDown();
  } else if (event.code === "ArrowRight") {
    batPlayer.moveBatRight();
  } else if (event.code === "ArrowLeft") {
    batPlayer.moveBatLeft();
  }
});

let counter = 0;

setInterval(() => {
  if (counter < 3) {
    counter++;
    const prey = new Prey();
    prey.createPrey();
  }
}, 3000);
