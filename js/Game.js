class Game {
  constructor() {
    this.batPlayer = new BatPlayer();
    this.preyArr = [];
    this.counterPrey = 0;
    this.dateTime = 22;
    this.level = 1;

    this.preyElement = null;
    this.board = document.getElementById("board");
  }

  start(level) {
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

    setInterval(() => {
      this.preyElement.removePrey(this.preyArr[0].prey.getAttribute("id"));
      this.preyArr.shift();
    }, 7000);
    //Daytime
    const timeElement = document.getElementById("time");
    const timer = setInterval(() => {
      if (this.dateTime == 24) {
        this.dateTime = 0;
        timeElement.innerHTML = `${this.dateTime}:00 h`;
      } else {
        this.dateTime++;
        timeElement.innerHTML = `${this.dateTime}:00 h`;
      }
    }, 8000);

    setTimeout(() => {
      this.end();
    }, 15000);
  }

  detectPlayerMovement() {
    document.addEventListener("keydown", (event) => {
      event.preventDefault;
      switch (event.code) {
        case "ArrowUp":
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
      window.alert("You survived the day!");
      this.preyArr = [];

      this.level++;
      this.start(this.level);
    } else {
      location.href = "../gameover.html";
    }
  }
}
