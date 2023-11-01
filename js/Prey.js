class Prey {
  constructor() {
    this.board = document.getElementById("board");
    this.boardHeight = this.board.offsetHeight / 16;
    this.boardWidth = this.board.offsetWidth / 16;

    this.width = 1.5;
    this.height = 1.5;
    this.positionX = Math.floor(Math.random() * (this.boardWidth - this.width));
    this.positionY = Math.floor(
      Math.random() * (this.boardHeight - this.height)
    );
  }

  createPrey(counter) {
    this.prey = document.createElement("img");
    this.prey.style.height = this.height + "rem";
    this.prey.style.width = this.width + "rem";
    this.prey.style.position = "absolute";
    this.prey.style.bottom = this.positionY + "rem";
    this.prey.style.left = this.positionX + "rem";
    this.prey.setAttribute("id", `prey${counter}`);
    this.prey.setAttribute("class", `prey`);
    this.prey.setAttribute("src", "./src/moth.png");
    this.board = document.getElementById("board");
    this.board.appendChild(this.prey);
  }

  removePrey(id) {
    const eatenPreyElement = document.getElementById(id);
    this.board.removeChild(eatenPreyElement);
  }
}
const preyElement = new Prey();
