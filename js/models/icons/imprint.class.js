/**
 * Represents an "Imprint" text drawn on the canvas. When clicked or touched,
 * it navigates the user to "imprint.html".
 */
class Imprint extends DrawableObject {
  /**
   * Initializes the Imprint icon, loads its image, sets its position, and
   * attaches the necessary event listeners.
   */
  constructor() {
    super();
    this.loadImage("img/imprint.png");
    this.updatePosition();
    this.width = 100;
    this.height = 100;
    canvas.addEventListener("click", this.onClick.bind(this));
    canvas.addEventListener("touchstart", this.onClick.bind(this), {
      passive: false,
    });
    canvas.addEventListener("mouseup", this.onRelease.bind(this));
    canvas.addEventListener("touchend", this.onRelease.bind(this));
    window.addEventListener("resize", this.updatePosition.bind(this));
  }

  /**
   * Updates the position of the imprint icon based on the current canvas size.
   */
  updatePosition() {
    this.x = canvas.width * 0.45;
    this.y = canvas.height * 0.83;
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
   * Checks if the provided coordinates are within the bounds of the imprint icon.
   * If they are and the game has not started, navigates to "imprint.html".
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
      !this.world.startGame
    ) {
      window.location.href = "imprint.html";
    }
  }

  /**
   * Handles click and touchstart events.
   * Calculates the coordinates and processes the navigation if conditions are met.
   *
   * @param {MouseEvent | TouchEvent} event - The user interaction event.
   */
  onClick(event) {
    const { mouseX, mouseY } = this.getMouseCoordinates(event);
    this.handleClick(mouseX, mouseY);
  }

  /**
   * Handles mouseup and touchend events, preventing default behavior.
   *
   * @param {MouseEvent | TouchEvent} event - The user interaction event.
   */
  onRelease(event) {
    event.preventDefault();
  }
}
