class BatPlayer {
  constructor() {
    this.width = 2;
    this.height = 2;
    this.positionX = 0;
    this.positionY = 0;
    this.energy = 0;
    this.batPlayer = null;

    this.board = document.getElementById("board");
    this.boardHeight = this.board.offsetHeight / 16;
    this.boardWidth = this.board.offsetWidth / 16;

    this.createBat();
  }

  createBat() {
    this.batPlayer = document.getElementById("batPlayer");
    this.batPlayer.style.height = this.height + "rem";
    this.batPlayer.style.width = this.width + "rem";
    this.batPlayer.style.left = this.positionX + "rem";
    this.batPlayer.style.bottom = this.positionY + "rem";
  }

  moveBatUp() {
    if (this.positionY < this.boardHeight - this.height) {
      this.positionY = this.positionY + 0.5;
      this.batPlayer.style.bottom = this.positionY + "rem";
    }
  }

  moveBatDown() {
    if (this.positionY > 0) {
      this.positionY = this.positionY - 0.5;
      this.batPlayer.style.bottom = this.positionY + "rem";
    }
  }

  moveBatLeft() {
    if (this.positionX > 0) {
      this.positionX = this.positionX - 0.5;
      this.batPlayer.style.left = this.positionX + "rem";
    }
  }

  moveBatRight() {
    if (this.positionX < this.boardWidth - this.width) {
      this.positionX = this.positionX + 0.5;
      this.batPlayer.style.left = this.positionX + "rem";
    }
  }

  checkForPrey(preyArr) {
    for (let i = 0; i < preyArr.length; i++) {
      if (
        this.positionX < preyArr[i].positionX + preyArr[i].width &&
        this.positionX + this.width > preyArr[i].positionX &&
        this.positionY < preyArr[i].positionY + preyArr[i].height &&
        this.positionY + this.height > preyArr[i].positionY
      ) {
        return i;
      }
    }
    return false;
  }
}

const batPlayer = new BatPlayer();
