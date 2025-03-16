/**
 * Represents a home icon button in the game, extending the DrawableObject class.
 * When clicked or touched, it stops the current game and resets it to the start screen.
 */
class HomeIcon extends DrawableObject {
  /**
   * Initializes the HomeIcon, loads its image, sets event listeners for click and touch,
   * and binds a resize event to update its position.
   */
  constructor() {
    super();

    this.loadImage("img/home.png");
    this.updatePosition();
    this.width = 70;
    this.height = 70;
    canvas.addEventListener("click", this.onClick.bind(this));
    canvas.addEventListener("touchstart", this.onClick.bind(this), {
      passive: false,
    });
    window.addEventListener("resize", this.updatePosition.bind(this));
  }

  /**
   * Updates the position of the home icon based on the current canvas size.
   */
  updatePosition() {
    this.x = canvas.width * 0.68;
    this.y = canvas.height * 0.05;
  }

  /**
   * Calculates the mouse or touch coordinates relative to the canvas.
   *
   * @param {MouseEvent | TouchEvent} event - The event triggered by user interaction.
   * @returns {{mouseX: number, mouseY: number}} An object containing the calculated x and y coordinates.
   */
  getMouseCoordinates(event) {
    event.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    let mouseX, mouseY;
    if (event.touches && event.touches.length > 0) {
      mouseX = (event.touches[0].clientX - rect.left) * scaleX;
      mouseY = (event.touches[0].clientY - rect.top) * scaleY;
    } else {
      mouseX = (event.clientX - rect.left) * scaleX;
      mouseY = (event.clientY - rect.top) * scaleY;
    }
    return { mouseX, mouseY };
  }

  /**
   * Checks if the provided coordinates are within the bounds of the home icon button.
   * If the click/touch is within bounds and the start screen is not currently shown,
   * it stops and resets the game.
   *
   * @param {number} mouseX - The x coordinate relative to the canvas.
   * @param {number} mouseY - The y coordinate relative to the canvas.
   */
  handleClick(mouseX, mouseY) {
    if (
      mouseX >= this.x &&
      mouseX <= this.x + this.width &&
      mouseY >= this.y &&
      mouseY <= this.y + this.height &&
      !this.world.showStartscreen
    ) {
      this.world.startGame = false;
      this.world.enbossIsDead = false;
      this.world.stopAllIntervals();
      this.world.resetManager.resetGame();
    }
  }

  /**
   * Handles both click and touch events to determine if the home icon was pressed.
   * It calculates the mouse or touch coordinates and then checks if the click occurred
   * within the button's bounds.
   *
   * @param {MouseEvent | TouchEvent} event - The event triggered by user interaction.
   */
  onClick(event) {
    const { mouseX, mouseY } = this.getMouseCoordinates(event);
    this.handleClick(mouseX, mouseY);
  }
}
