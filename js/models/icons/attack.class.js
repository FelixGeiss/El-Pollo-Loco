/**
 * Represents an attack button in the game, extending the DrawableObject class.
 * It loads a specific attack image and handles touch events to trigger or release an attack action.
 */
class Attack extends DrawableObject {
  /**
   * Creates an instance of Attack.
   * Loads the attack image, sets its dimensions and position, and adds touch event listeners.
   */
  constructor() {
    super();

    this.loadImage("img/movement/attack.png");
    this.updatePosition();
    this.width = 50;
    this.height = 50;
    canvas.addEventListener("touchstart", this.onClick.bind(this), { passive: false });
    canvas.addEventListener("touchend", this.onRelease.bind(this));
    window.addEventListener("resize", this.updatePosition.bind(this));
  }

  /**
   * Updates the position of the attack button based on the canvas size.
   */
  updatePosition() {
    this.x = canvas.width * 0.80;
    this.y = canvas.height * 0.85;
  }

  /**
   * Calculates the mouse or touch coordinates relative to the canvas.
   *
   * @param {Event} event - The mouse or touch event.
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
   * Checks if the provided coordinates are within the bounds of the attack button.
   *
   * @param {number} mouseX - The x coordinate relative to the canvas.
   * @param {number} mouseY - The y coordinate relative to the canvas.
   */
  handleClick(mouseX, mouseY) {
    if (
      mouseX >= this.x && mouseX <= this.x + this.width &&
      mouseY >= this.y && mouseY <= this.y + this.height
    ) {
      this.world.keyboard.D = true;
    }
  }

  /**
   * Handler for the touchstart event.
   * If the user touches within the button's area, it triggers the attack action.
   *
   * @param {TouchEvent} event - The touch event.
   */
  onClick(event) {
    const { mouseX, mouseY } = this.getMouseCoordinates(event);
    this.handleClick(mouseX, mouseY);
  }

  /**
   * Handler for the touchend event.
   * It ends the attack action by setting the 'D' key in the keyboard object to false.
   *
   * @param {TouchEvent} event - The touch event.
   */
  onRelease(event) {
    event.preventDefault();
    this.world.keyboard.D = false;
  }
}
