let canvas;
let world;
let character;
let keyborad = new Keyborad();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyborad);
}

document.addEventListener("keydown", (event) => {
  if (event.keyCode == 68) {
    keyborad.D = true;
  }
  if (event.keyCode == 39) {
    keyborad.RIGHT = true;
  }
  if (event.keyCode == 37) {
    keyborad.LEFT = true;
  }
  if (event.keyCode == 38) {
    keyborad.UP = true;
  }
  if (event.keyCode == 32) {
    keyborad.SPACE = true;
  }

  if (event.keyCode === 40) {
    keyborad.DOWN = true;
  }
});

document.addEventListener("keyup", (event) => {
  if (event.keyCode == 68) {
    keyborad.D = false;
  }

  if (event.keyCode == 39) {
    keyborad.RIGHT = false;
  }
  if (event.keyCode == 37) {
    keyborad.LEFT = false;
  }
  if (event.keyCode == 38) {
    keyborad.UP = false;
  }
  if (event.keyCode == 32) {
    keyborad.SPACE = false;
  }

  if (event.keyCode === 40) {
    keyborad.DOWN = false;
  }
});

/* Alternative (quick and dirty), um alle Intervalle zu beenden. */
// clearAllIntervals() {
//   for (let i = 1; i < 9999; i++) window.clearInterval(i);
// }

// fullscreen

// document.getElementById("meinDiv").addEventListener("click", function() {
//   toggleFullscreen(this);
// });

// function toggleFullscreen(element) {
//   if (!document.fullscreenElement) {
//       element.requestFullscreen().catch(err => {
//           console.error(`Fehler beim Umschalten in den Vollbildmodus: ${err.message}`);
//       });
//   } else {
//       document.exitFullscreen();
//   }
// }
