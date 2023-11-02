class Gadget {
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

  createGadget(counter) {
    this.gadget = document.createElement("img");
    this.gadget.style.height = this.height + "rem";
    this.gadget.style.width = this.width + "rem";
    this.gadget.style.position = "absolute";
    this.gadget.style.bottom = this.positionY + "rem";
    this.gadget.style.left = this.positionX + "rem";
    this.gadget.setAttribute("id", `gadget${counter}`);
    this.gadget.setAttribute("class", `gadget`);
    this.gadget.setAttribute("src", "./src/candle.png");
    this.board = document.getElementById("board");
    this.board.appendChild(this.gadget);
  }

  removeGadgetElement(id) {
    const eatenPreyElement = document.getElementById(id);
    this.board.removeChild(eatenPreyElement);
  }

  gadgetCollision() {}
}
