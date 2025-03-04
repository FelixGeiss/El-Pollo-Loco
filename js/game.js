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
  const buttons = getButtons();
  setupListenersForButtons(buttons);
}

function getButtons() {
  return {
    arrowTop: document.getElementById("arrowTop"),
    arrowRight: document.getElementById("arrowRaight"),
    arrowBottom: document.getElementById("arrowBottom"),
    arrowLeft: document.getElementById("arrowLeft"),
    bButton: document.getElementById("bButton"),
    aButton: document.getElementById("aButton"),
    yButton: document.getElementById("yButton"),
    xButton: document.getElementById("xButton"),
    homeButton: document.getElementById("home"),
  };
}

function setupListenersForButtons(buttons) {
  if (buttons.arrowTop) handleButtonPress(buttons.arrowTop, "UP", true);
  if (buttons.arrowRight) handleButtonPress(buttons.arrowRight, "RIGHT", true);
  if (buttons.arrowBottom) handleButtonPress(buttons.arrowBottom, "DOWN", true);
  if (buttons.arrowLeft) handleButtonPress(buttons.arrowLeft, "LEFT", true);
  if (buttons.bButton) handleButtonPress(buttons.bButton, "UP", true);
  if (buttons.aButton) handleButtonPress(buttons.aButton, "D", true);
  if (buttons.yButton) handleButtonPress(buttons.yButton, "D", true);
  if (buttons.xButton) handleButtonPress(buttons.xButton, "DOWN", true);
  if (buttons.homeButton) handleHomeButtonPress(buttons.homeButton);
}

function handleButtonPress(button, key, value) {
  button.addEventListener("mousedown", () => {
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

function handleHomeButtonPress(homeButton) {
  homeButton.addEventListener("mousedown", () => {
    if (world.startGame) {
      world.startGame = false;
      world.stopAllIntervals();
      world.resetGame();
    }
  });
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
