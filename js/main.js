const game = new Game();

game.start(1);

const testBat = document.getElementById("test-bat");

const animateBat = () => {
  let position = 48;
  setInterval(() => {
    testBat.style.backgroundPosition = `-${position}px 128px`;
    if (position < 256) {
      position += 48;
    } else {
      position = 48;
    }
  }, 150);
};

testBat.addEventListener("click", () => {
  animateBat();
  console.log("clicked");
});
