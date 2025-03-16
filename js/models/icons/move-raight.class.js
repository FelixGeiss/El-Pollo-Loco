/**
 * Represents a "move right" button in the game, extending the DrawableObject class.
 * When touched, it triggers a move right action by setting the 'RIGHT' key in the keyboard object to true.
 */
class MoveRaight extends DrawableObject {
  /**
   * Initializes the MoveRaight button, loads the image, sets its dimensions and position,
   * and attaches touch event listeners.
   */
  constructor() {
    super();
    this.loadImage("img/movement/arrow-right.png");
    this.updatePosition();
    this.width = 70;
    this.height = 70;
    canvas.addEventListener("touchstart", this.onTouchStart.bind(this), { passive: false });
    canvas.addEventListener("touchend", this.onTouchEnd.bind(this));
    window.addEventListener("resize", this.updatePosition.bind(this));
  }

  /**
   * Updates the position of the MoveRaight button based on the canvas size.
   */
  updatePosition() {
    this.x = canvas.width * 0.90;
    this.y = canvas.height * 0.84;
  }

  /**
   * Calculates the touch coordinates relative to the canvas.
   *
   * @param {TouchEvent} event - The touch event triggered by user interaction.
   * @returns {{touchX: number, touchY: number}} An object containing the calculated x and y coordinates.
   */
  getTouchCoordinates(event) {
    event.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const touch = event.touches[0];
    const touchX = (touch.clientX - rect.left) * scaleX;
    const touchY = (touch.clientY - rect.top) * scaleY;
    return { touchX, touchY };
  }

  /**
   * Checks if the provided touch coordinates are within the bounds of the MoveRaight button.
   * If they are, it sets the 'RIGHT' key in the keyboard object to true.
   *
   * @param {number} touchX - The x coordinate relative to the canvas.
   * @param {number} touchY - The y coordinate relative to the canvas.
   */
  handleTouchStartCoordinates(touchX, touchY) {
    if (
      touchX >= this.x && touchX <= this.x + this.width &&
      touchY >= this.y && touchY <= this.y + this.height
    ) {
      this.world.keyboard.RIGHT = true;
    }
  }

  /**
   * Handler for the touchstart event.
   * Calculates the touch coordinates and triggers the move right action if the touch is within the button's bounds.
   *
   * @param {TouchEvent} event - The touch event triggered by user interaction.
   */
  onTouchStart(event) {
    const { touchX, touchY } = this.getTouchCoordinates(event);
    this.handleTouchStartCoordinates(touchX, touchY);
  }

  /**
   * Handler for the touchend event.
   * Resets the 'RIGHT' key in the keyboard object to false, stopping the move right action.
   *
   * @param {TouchEvent} event - The touch event triggered by user interaction.
   */
  onTouchEnd(event) {
    event.preventDefault();
    this.world.keyboard.RIGHT = false;
  }
}
