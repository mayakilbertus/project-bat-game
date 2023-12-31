const bellSound = new Audio("./src/church-bell.mp3");

class Game {
  constructor() {
    this.batPlayer = new BatPlayer();
    this.preyArr = [];
    this.counterPrey = 0;
    this.dateTimeHour = 22;
    this.dateTimeMinutes = 0;
    this.level = 1;

    this.preyElement = null;
    this.board = document.getElementById("board");
    this.preyInterval = 7500;

    this.gadgetArr = [];
    this.counterGadget = 0;

    this.createPreyIntervalID = null;
    this.removePreyIntervalID = null;
    this.dateTimeIntervalID = null;
    this.gadgetIntervalId = null;

    this.batPlayer.animateBat();
    this.detectPlayerMovement();
  }

  start(level) {
    this.preyArr = [];
    const levelCounter = document.getElementById("gameLevel");

    levelCounter.innerHTML = `Level ${level}`;

    //create Prey
    this.createPreyIntervalId = setInterval(() => {
      this.addPrey();
    }, 2000);

    //Remove Prey
    this.removePreyIntervalID = setInterval(() => {
      this.preyElement.removePreyElement(
        this.preyArr[0].prey.getAttribute("id")
      );
      this.preyArr.shift();

      if (this.gadgetArr.length > 0) {
        this.gadgetElement.removeGadgetElement(
          this.gadgetArr[0].gadget.getAttribute("id")
        );
        this.gadgetArr.shift();
      }
    }, this.calculatePreyInterval(level));

    //Daytime
    const timeElement = document.getElementById("time");

    this.dateTimeIntervalID = setInterval(() => {
      this.dateTimeMinutes++;
      if (this.dateTimeMinutes === 60) {
        this.dateTimeHour++;
        this.dateTimeMinutes = 0;
      } else if (this.dateTimeHour === 24) {
        this.dateTimeHour = 0;
      } else if (this.dateTimeMinutes < 10) {
        this.dateTimeMinutes = `0${this.dateTimeMinutes}`;
      } else if (this.dateTimeHour === 6) {
        this.end();
      }
      timeElement.innerHTML = `${this.dateTimeHour}:${Math.round(
        this.dateTimeMinutes
      )} h`;
    }, 70);

    if (level >= 2) {
      this.gadgetIntervalId = setInterval(() => {
        this.counterGadget++;
        this.gadgetElement = new Gadget();
        this.gadgetElement.createGadget(this.counterGadget);
        this.gadgetArr.push(this.gadgetElement);
      }, 9000);
    }
  }

  addPrey() {
    this.counterPrey++;
    this.preyElement = new Prey();
    this.preyElement.createPrey(this.counterPrey);
    this.preyArr.push(this.preyElement);
  }

  calculatePreyInterval(level) {
    const basisReduction = 200;
    const levelReduction = 600 * level;

    const totalReduction = basisReduction * (1 / levelReduction);
    if (totalReduction < 2000) {
      this.preyInterval -= totalReduction;
      console.log(this.preyInterval);
    } else {
      this.preyInterval -= 2000;
    }
    return this.preyInterval;
  }

  detectPlayerMovement() {
    this.pressedKeys = {};

    document.addEventListener("keydown", (event) => {
      event.preventDefault;

      this.pressedKeys[event.code] = true;
      this.updatePlayerPosition();
    });

    document.addEventListener("keyup", (event) => {
      this.pressedKeys[event.code] = false;
      this.updatePlayerPosition();
    });
  }

  updatePlayerPosition() {
    const randomIterations = Math.floor(Math.random() * 2) + 1;

    if (this.pressedKeys.ArrowLeft === true) {
      this.batPlayer.moveBatLeft();
      this.batPlayer.animateBat("ArrowLeft");
      const detectedPreyLeft = this.batPlayer.checkForPrey(this.preyArr);
      if (detectedPreyLeft) {
        this.removePrey(detectedPreyLeft);
      } else if (this.batPlayer.checkForGadget(this.gadgetArr)) {
        this.removeGadget(this.batPlayer.checkForGadget(this.gadgetArr));
        for (let i = 0; i < randomIterations; i++) {
          this.addPrey();
        }
      }
    }

    if (this.pressedKeys.ArrowRight === true) {
      this.batPlayer.moveBatRight();
      this.batPlayer.animateBat("ArrowRight");
      const detectedPreyRight = this.batPlayer.checkForPrey(this.preyArr);
      if (detectedPreyRight) {
        this.removePrey(detectedPreyRight);
      } else if (this.batPlayer.checkForGadget(this.gadgetArr)) {
        this.removeGadget(this.batPlayer.checkForGadget(this.gadgetArr));
        for (let i = 0; i < randomIterations; i++) {
          this.addPrey();
        }
      }
    }

    if (this.pressedKeys.ArrowUp === true) {
      this.batPlayer.moveBatUp();
      this.batPlayer.animateBat("ArrowUp");
      const detectedPreyUp = this.batPlayer.checkForPrey(this.preyArr);
      if (detectedPreyUp) {
        this.removePrey(detectedPreyUp);
      } else if (this.batPlayer.checkForGadget(this.gadgetArr)) {
        this.removeGadget(this.batPlayer.checkForGadget(this.gadgetArr));
        for (let i = 0; i < randomIterations; i++) {
          this.addPrey();
        }
      }
    }

    if (this.pressedKeys.ArrowDown === true) {
      this.batPlayer.moveBatDown();
      this.batPlayer.animateBat("ArrowDown");
      const detectedPreyDown = this.batPlayer.checkForPrey(this.preyArr);
      if (detectedPreyDown) {
        this.removePrey(detectedPreyDown);
      } else if (this.batPlayer.checkForGadget(this.gadgetArr)) {
        this.removeGadget(this.batPlayer.checkForGadget(this.gadgetArr));
        for (let i = 0; i < randomIterations; i++) {
          this.addPrey();
        }
      }
    }
  }

  removePrey(detectedPreyArr) {
    this.preyArr.splice(detectedPreyArr[1], 1);
    this.preyElement.removePreyElement(
      detectedPreyArr[0].prey.getAttribute("id")
    );
  }

  removeGadget(detectedGadgetArr) {
    this.gadgetArr.splice(detectedGadgetArr[1], 1);
    console.log(detectedGadgetArr);
    this.gadgetElement.removeGadgetElement(
      detectedGadgetArr[0].gadget.getAttribute("id")
    );
  }

  end() {
    const preyElementList = document.querySelectorAll(".prey");
    preyElementList.forEach((prey) => {
      this.board.removeChild(prey);
    });
    if (this.batPlayer.showEnergyLevel() >= 80) {
      this.level++;
      this.newEnergy = this.batPlayer.reduceEnergy();
      const energyLevel = document.getElementById("energyLevel");
      energyLevel.innerHTML = `Your energy level: ${this.newEnergy}%`;

      this.dateTimeHour = 22;
      this.dateTimeMinutes = 0;
      clearInterval(this.createPreyIntervalId);
      clearInterval(this.removePreyIntervalID);
      clearInterval(this.dateTimeIntervalID);
      clearInterval(this.gadgetIntervalId);
      bellSound.play();
      this.start(this.level);
    } else {
      location.href = "./gameover.html";
    }
  }
}
