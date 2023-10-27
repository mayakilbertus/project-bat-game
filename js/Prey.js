class Prey {
  constructor() {
    this.board = document.getElementById("board");
    this.boardHeight = this.board.offsetHeight / 16;
    this.boardWidth = this.board.offsetWidth / 16;

    this.width = 1;
    this.height = 1;
    this.positionX = Math.floor(
      Math.random() * (this.boardWidth - this.width + 1)
    );
    this.positionY = Math.floor(
      Math.random() * (this.boardHeight - this.height + 1)
    );
  }

  createPrey() {
    this.prey = document.createElement("div");
    this.prey.style.height = this.height + "rem";
    this.prey.style.width = this.width + "rem";
    this.prey.style.backgroundColor = "black";
    this.prey.style.position = "absolute";
    this.prey.style.bottom = this.positionY + "rem";
    this.prey.style.left = this.positionX + "rem";

    const board = document.getElementById("board");
    board.appendChild(this.prey);
    console.log("prey created");
  }
}

const prey = new Prey();
prey.createPrey();
