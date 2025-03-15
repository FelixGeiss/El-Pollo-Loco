/**
 * Global canvas and game world variables.
 */
let canvas;
let world;
let character;
let keyboard = new Keyboard();

/**
 * Initializes the game by setting up the canvas, world, button listeners, and orientation checks.
 */
function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  setupButtonListeners();
  checkOrientation();
}

/**
 * Retrieves HTML button references and sets up event listeners for them.
 */
function setupButtonListeners() {
  const buttons = getButtons();
  setupListenersForButtons(buttons);
}

/**
 * Gathers HTML button elements by their IDs.
 * @returns {Object} An object containing button references.
 */
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

/**
 * Sets up mouse and touch event listeners for each button, linking them to the keyboard object.
 * @param {Object} buttons - An object containing button references.
 */
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

/**
 * Binds mouse and touch events to a button to update the corresponding key in the keyboard object.
 * @param {HTMLElement} button - The button element.
 * @param {string} key - The key in the keyboard object to update.
 * @param {boolean} value - The value to assign to the key when pressed.
 */
function handleButtonPress(button, key, value) {
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
  button.addEventListener("touchstart", (event) => {
    event.preventDefault();
    keyboard[key] = value;
  });
  button.addEventListener("touchend", (event) => {
    event.preventDefault();
    keyboard[key] = !value;
  });
}

/**
 * Handles the home button press event by stopping and resetting the game if it is active.
 * @param {HTMLElement} homeButton - The home button element.
 */
function handleHomeButtonPress(homeButton) {
  homeButton.addEventListener("mousedown", () => {
    if (world.startGame) {
      world.startGame = false;
      world.enbossIsDead = false;
      world.stopAllIntervals();
      world.resetManager.resetGame();
    }
  });
  homeButton.addEventListener("touchstart", (event) => {
    event.preventDefault();
    if (world.startGame) {
      world.startGame = false;
      world.stopAllIntervals();
      world.resetManager.resetGame();
    }
  });
}

/**
 * Updates the keyboard state on keydown events.
 */
document.addEventListener("keydown", (event) => {
  if (event.keyCode === 68) keyboard.D = true;
  if (event.keyCode === 39) keyboard.RIGHT = true;
  if (event.keyCode === 37) keyboard.LEFT = true;
  if (event.keyCode === 38) keyboard.UP = true;
  if (event.keyCode === 32) keyboard.SPACE = true;
  if (event.keyCode === 40) keyboard.DOWN = true;
});

/**
 * Updates the keyboard state on keyup events.
 */
document.addEventListener("keyup", (event) => {
  if (event.keyCode === 68) keyboard.D = false;
  if (event.keyCode === 39) keyboard.RIGHT = false;
  if (event.keyCode === 37) keyboard.LEFT = false;
  if (event.keyCode === 38) keyboard.UP = false;
  if (event.keyCode === 32) keyboard.SPACE = false;
  if (event.keyCode === 40) keyboard.DOWN = false;
});

/**
 * Checks if the device is in portrait mode on mobile with a narrow screen,
 * displaying a popup if necessary.
 */
function checkOrientation() {
  const popup = document.getElementById("popup");
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  if (screenWidth < screenHeight && screenWidth < 600) {
    popup.style.display = "flex";
  } else if (popup.style.display === "flex") {
    popup.style.display = "none";
  }
}

window.addEventListener("resize", checkOrientation);
window.addEventListener("orientationchange", checkOrientation);
