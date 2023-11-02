const biteSound = new Audio("./src/bite-sound.mp3");
const fireSound = new Audio("./src/fire-sound.mp3");

class BatPlayer {
  constructor() {
    this.width = 2.5;
    this.height = 2;
    this.positionX = 0;
    this.positionY = 0;
    this.energy = 1;
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
    if (this.positionY < this.boardHeight - this.height * 1.5) {
      this.positionY = this.positionY + 1;
      this.batPlayer.style.bottom = this.positionY + "rem";
    }
  }

  moveBatDown() {
    if (this.positionY > 0) {
      this.positionY = this.positionY - 1;
      this.batPlayer.style.bottom = this.positionY + "rem";
    }
    console.log(this.positionY);
  }

  moveBatLeft() {
    if (this.positionX > 0) {
      this.positionX = this.positionX - 1;
      this.batPlayer.style.left = this.positionX + "rem";
    }
  }

  moveBatRight() {
    if (this.positionX < this.boardWidth - this.width) {
      this.positionX = this.positionX + 1;
      this.batPlayer.style.left = this.positionX + "rem";
    }
  }

  checkForPrey(preyArr) {
    const energyLevel = document.getElementById("energyLevel");
    for (let i = 0; i < preyArr.length; i++) {
      if (
        this.positionX < preyArr[i].positionX + preyArr[i].width &&
        this.positionX + this.width > preyArr[i].positionX &&
        this.positionY < preyArr[i].positionY + preyArr[i].height &&
        this.positionY + this.height > preyArr[i].positionY
      ) {
        biteSound.play();
        if (this.energy <= 90) {
          this.energy += 10;
        } else {
          this.energy = 100;
        }
        return [preyArr[i], i];
      }
    }
    energyLevel.innerHTML = `Your energy level: ${this.energy}%`;
  }

  checkForGadget(gadgetArr) {
    for (let i = 0; i < gadgetArr.length; i++) {
      if (
        this.positionX < gadgetArr[i].positionX + gadgetArr[i].width &&
        this.positionX + this.width > gadgetArr[i].positionX &&
        this.positionY < gadgetArr[i].positionY + gadgetArr[i].height &&
        this.positionY + this.height > gadgetArr[i].positionY
      ) {
        fireSound.play();
        return [gadgetArr[i], i];
      }
    }
    return false;
  }

  showEnergyLevel() {
    return this.energy;
  }

  reduceEnergy() {
    this.energy *= 0.2;
    this.energy = Math.round(this.energy);
    return this.energy;
  }

  animateBat(arrowKey) {
    let position = 73;
    let startOfSpriteRow = -23;
    if (arrowKey === "ArrowDown") {
      startOfSpriteRow = -23;
    } else if (arrowKey === "ArrowUp") {
      startOfSpriteRow = 52;
    } else if (arrowKey === "ArrowRight") {
      startOfSpriteRow = 140;
    } else if (arrowKey === "ArrowLeft") {
      startOfSpriteRow = 230;
    } else {
      startOfSpriteRow = -23;
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
