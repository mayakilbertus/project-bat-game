class BatPlayer {
  constructor() {
    this.width = 2;
    this.height = 1.5;
    this.positionX = 0;
    this.positionY = 0;
    this.energy = 80;
    this.batPlayer = null;

    this.board = document.getElementById("board");
    this.boardHeight = this.board.offsetHeight / 16;
    this.boardWidth = this.board.offsetWidth / 16;
    this.batPlayer = document.getElementById("batPlayer");

    this.createBat();
  }

  createBat() {
    this.batPlayer.style.height = this.height + "rem";
    this.batPlayer.style.width = this.width + "rem";
    this.batPlayer.style.left = this.positionX + "rem";
    this.batPlayer.style.bottom = this.positionY + "rem";
  }

  moveBatUp() {
    if (this.positionY < this.boardHeight - this.height) {
      this.positionY = this.positionY + 0.6;
      this.batPlayer.style.bottom = this.positionY + "rem";
    }
  }

  moveBatDown() {
    if (this.positionY > 0) {
      this.positionY = this.positionY - 0.6;
      this.batPlayer.style.bottom = this.positionY + "rem";
    }
  }

  moveBatLeft() {
    if (this.positionX > 0) {
      this.positionX = this.positionX - 0.6;
      this.batPlayer.style.left = this.positionX + "rem";
    }
  }

  moveBatRight() {
    if (this.positionX < this.boardWidth - this.width) {
      this.positionX = this.positionX + 0.6;
      this.batPlayer.style.left = this.positionX + "rem";
    }
  }

  checkForPrey(preyArr) {
    const biteSound = new Audio("./src/bite-sound.mp3");
    const energyLevel = document.getElementById("energyLevel");
    for (let i = 0; i < preyArr.length; i++) {
      if (
        this.positionX < preyArr[i].positionX + preyArr[i].width &&
        this.positionX + this.width > preyArr[i].positionX &&
        this.positionY < preyArr[i].positionY + preyArr[i].height &&
        this.positionY + this.height > preyArr[i].positionY
      ) {
        // const preyID =
        biteSound.play();
        if (this.energy <= 100) {
          this.energy += 5;
        }
        return [preyArr[i], i];
      }
    }
    energyLevel.innerHTML = `Your energy level: ${this.energy}%`;
    return false;
  }

  showEnergyLevel() {
    return this.energy;
  }

  reduceEnergy() {
    this.energy -= this.energy * 0.8;
  }

  animateBat(arrowKey) {
    let position = 58;
    let startOfSpriteRow = -20;
    if (arrowKey === "ArrowDown") {
      startOfSpriteRow = -20;
    } else if (arrowKey === "ArrowUp") {
      startOfSpriteRow = 44;
    } else if (arrowKey === "ArrowRight") {
      startOfSpriteRow = 108;
    } else if (arrowKey === "ArrowLeft") {
      startOfSpriteRow = 172;
    } else {
      startOfSpriteRow = -20;
    }

    // setInterval(() => {
    this.batPlayer.style.backgroundPosition = `-${position}px ${startOfSpriteRow}px`;
    //   if (position < 256) {
    //     position += 48;
    //   } else {
    //     position = 48;
    //   }
    // }, 1000);
  }
}

const batPlayer = new BatPlayer();
