let canvas;
let world;
let character;
let keyborad = new Keyborad();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyborad);
  setupButtonListeners();
}

function setupButtonListeners() {
  const arrowTop = document.getElementById("arrowTop");
  const arrowRight = document.getElementById("arrowRaight");
  const arrowBottom = document.getElementById("arrowBottom");
  const arrowLeft = document.getElementById("arrowLeft");
  const bButton = document.getElementById("bButton");
  const aButton = document.getElementById("aButton");
  const yButton = document.getElementById("yButton");
  const xButton = document.getElementById("xButton");
  const homeButton = document.getElementById("home");

  function handleButtonPress(button, key, value) {
    button.addEventListener("mousedown", () => {
      if (button == homeButton) {
        world.startGame = false;
       world.stopAllIntervals();
     world.resetGame();
      }

      keyborad[key] = value;
    });

    button.addEventListener("mouseup", () => {
      keyborad[key] = !value;
    });

    button.addEventListener("mouseleave", () => {
      if (keyborad[key] === value) {
        keyborad[key] = !value;
      }
    });
  }

  if (arrowTop) handleButtonPress(arrowTop, "UP", true);
  if (arrowRight) handleButtonPress(arrowRight, "RIGHT", true);
  if (arrowBottom) handleButtonPress(arrowBottom, "DOWN", true);
  if (arrowLeft) handleButtonPress(arrowLeft, "LEFT", true);
  if (bButton) {
    handleButtonPress(bButton, "UP", true);
  }
  if (aButton) {
    handleButtonPress(aButton, "D", true);
  }
  if (yButton) {
    handleButtonPress(yButton, "D", true);
  }
  if (xButton) {
    handleButtonPress(xButton, "DOWN", true);
  }
  if (homeButton) {
    handleButtonPress(homeButton);
  }
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
