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

    this.batPlayer.animateBat();

    this.start(1);
  }

  start(level) {
    this.preyArr = [];

    const levelCounter = document.getElementById("gameLevel");
    levelCounter.innerHTML = `Level ${level}`;
    this.detectPlayerMovement();

    //create Prey
    setInterval(() => {
      this.counterPrey++;
      this.preyElement = new Prey();
      this.preyElement.createPrey(this.counterPrey);
      this.preyArr.push(this.preyElement);
    }, 4000);

    //Remove Prey
    setInterval(() => {
      this.preyElement.removePrey(this.preyArr[0].prey.getAttribute("id"));
      this.preyArr.shift();
    }, this.calculatePreyInterval(level));

    //Daytime
    const timeElement = document.getElementById("time");

    setInterval(() => {
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
      timeElement.innerHTML = `${this.dateTimeHour}:${this.dateTimeMinutes} h`;
    }, 50);
  }

  calculatePreyInterval(level) {
    const basisReduction = 800;
    const levelReduction = 2 * level;

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
    document.addEventListener("keydown", (event) => {
      event.preventDefault;
      switch (event.code) {
        case "ArrowUp":
          this.batPlayer.animateBat("ArrowUp");
          this.batPlayer.moveBatUp();
          const preyDetectUp = this.batPlayer.checkForPrey(this.preyArr);
          // this.preyDetectUp = this.batPlayer.checkForPrey(this.preyArr);
          if (preyDetectUp) {
            this.preyArr.splice(preyDetectUp[1], 1);
            this.preyElement.removePrey(
              preyDetectUp[0].prey.getAttribute("id")
            );
          }

          // if (this.preyDetectUp) {
          //   this.updatePrey(this.PreyDetectUp);
          // }
          break;
        case "ArrowDown":
          this.batPlayer.animateBat("ArrowDown");
          this.batPlayer.moveBatDown();
          const preyDetectDown = this.batPlayer.checkForPrey(this.preyArr);
          if (preyDetectDown) {
            this.preyArr.splice(preyDetectDown[1], 1);
            this.preyElement.removePrey(
              preyDetectDown[0].prey.getAttribute("id")
            );
          }
          break;
        case "ArrowRight":
          this.batPlayer.animateBat("ArrowRight");
          this.batPlayer.moveBatRight();
          const preyDetectRight = this.batPlayer.checkForPrey(this.preyArr);
          if (preyDetectRight) {
            this.preyArr.splice(preyDetectRight[1], 1);
            this.preyElement.removePrey(
              preyDetectRight[0].prey.getAttribute("id")
            );
          }
          break;
        case "ArrowLeft":
          this.batPlayer.animateBat("ArrowLeft");
          this.batPlayer.moveBatLeft();
          const preyDetectLeft = this.batPlayer.checkForPrey(this.preyArr);
          if (preyDetectLeft) {
            this.preyArr.splice(preyDetectLeft[1], 1);
            this.preyElement.removePrey(
              preyDetectLeft[0].prey.getAttribute("id")
            );
          }
          break;
        default:
          break;
      }
    });
  }
  // updatePrey(preyDetect) {
  //   this.preyArr.splice(preyDetect[1], 1);
  //   this.preyElement.removePrey(preyDetect[0].prey.getAttribute("id"));
  // }

  end() {
    const preyElementList = document.querySelectorAll(".prey");
    preyElementList.forEach((prey) => {
      this.board.removeChild(prey);
    });
    if (this.batPlayer.showEnergyLevel() >= 80) {
      // window.alert("You survived the day!");
      this.level++;
      this.batPlayer.reduceEnergy();
      this.dateTimeHour = 22;
      this.dateTimeMinutes = 0;
      this.start(this.level);
    } else {
      location.href = "../gameover.html";
    }
  }
}
