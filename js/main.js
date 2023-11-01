const game = new Game();

const backgroundMusic = document.getElementById("backgroundMusic");
document.addEventListener("keydown", () => {
  backgroundMusic.play();
});

/*-------------Test Animation Bat -----------------------
const testBat = document.getElementById("test-bat");

// const animateBat = () => {
//   let position = 48;
//   setInterval(() => {
//     testBat.style.backgroundPosition = `-${position}px 0px`;
//     if (position < 256) {
//       position += 48;
//     } else {
//       position = 48;
//     }
//   }, 150);
// };

// testBat.addEventListener("click", () => {
//   animateBat();
//   console.log("clicked");
// }); */
