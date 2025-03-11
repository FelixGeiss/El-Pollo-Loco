let canvas;
let world;
let character;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  setupButtonListeners();
  checkOrientation();
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
    bButton: document.getElementById("bButton,"),
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
  // Mouse events
  button.addEventListener("mousedown", () => {
    keyboard[key] = value;
  });

  button.addEventListener("mouseup", () => {
    keyboard[key] = !value;
  });

  button.addEventListener("mouseleave", () => {
    if (keyboard[key] === value) {
      keyboard[key] = !value;
    }
  });

  // Touch events
  button.addEventListener("touchstart", (event) => {
    event.preventDefault(); // Prevent scrolling on touch devices
    keyboard[key] = value;
  });

  button.addEventListener("touchend", (event) => {
    event.preventDefault(); // Prevent scrolling on touch devices
    keyboard[key] = !value;
  });
}

function handleHomeButtonPress(homeButton) {
  // Mouse event
  homeButton.addEventListener("mousedown", () => {
    if (world.startGame) {
      world.startGame = false;
      world.stopAllIntervals();
      world.resetManager.resetGame()
    }
  });

  // Touch event
  homeButton.addEventListener("touchstart", (event) => {
    event.preventDefault();
    if (world.startGame) {
      world.startGame = false;
      world.stopAllIntervals();
      world.resetManager.resetGame()
    }
  });
}

// Keyboard event listeners
document.addEventListener("keydown", (event) => {
  if (event.keyCode == 68) keyboard.D = true; // D key
  if (event.keyCode == 39) keyboard.RIGHT = true; // Right arrow
  if (event.keyCode == 37) keyboard.LEFT = true; // Left arrow
  if (event.keyCode == 38) keyboard.UP = true; // Up arrow
  if (event.keyCode == 32) keyboard.SPACE = true; // Space bar
  if (event.keyCode === 40) keyboard.DOWN = true; // Down arrow
});

document.addEventListener("keyup", (event) => {
  if (event.keyCode == 68) keyboard.D = false;
  if (event.keyCode == 39) keyboard.RIGHT = false;
  if (event.keyCode == 37) keyboard.LEFT = false;
  if (event.keyCode == 38) keyboard.UP = false;
  if (event.keyCode == 32) keyboard.SPACE = false;
  if (event.keyCode === 40) keyboard.DOWN = false;
});



function checkOrientation() {
  const popup = document.getElementById('popup');
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;


  
  

 
  if (screenWidth < screenHeight && screenWidth < 768) { 
      popup.style.display = 'flex';
  } else {
      popup.style.display = 'none';
  }
}


window.addEventListener('resize', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);


