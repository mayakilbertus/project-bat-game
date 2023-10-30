// let counterPrey = 0;
// const preyArr = [];

// setInterval(() => {
//   counterPrey++;
//   const prey = new Prey();
//   prey.createPrey(counterPrey);
//   preyArr.push(prey);
// }, 3000);

// setInterval(() => {
//   preyElement.removePrey(preyArr[0].prey.getAttribute("id"));
//   preyArr.shift();
// }, 7000);

// let counterGameTime = 22;
// const timeElement = document.getElementById("time");

// const timer = setInterval(() => {
//   if (counterGameTime == 24) {
//     counterGameTime = 0;
//     timeElement.innerHTML = `${counterGameTime}:00 h`;
//   } else {
//     counterGameTime++;
//     timeElement.innerHTML = `${counterGameTime}:00 h`;
//   }
// }, 8000);

const game = new Game();

game.start();

setTimeout(() => {
  game.end();
}, 70000);
