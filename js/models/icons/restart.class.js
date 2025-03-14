/**
 * Represents a "Restart Game" icon in the game, extending the DrawableObject class.
 * When clicked or touched (under specific conditions), it restarts the game.
 */
class RestartGameIcon extends DrawableObject {
  world;

  /**
   * Constructs the RestartGameIcon, loads the restart image, sets up its position,
   * and attaches event listeners for clicks, touches, and window resizing.
   */
  constructor() {
    super();

    this.loadImage("img/restart.png");
    this.updatePosition();
    this.width = 80;
    this.height = 80;
    
    canvas.addEventListener("click", this.onClick.bind(this));
    canvas.addEventListener("touchstart", this.onClick.bind(this), { passive: false });
    window.addEventListener("resize", this.updatePosition.bind(this));
  }

  /**
   * Updates the position of the RestartGameIcon based on the current canvas size.
   */
  updatePosition() {
    this.x = canvas.width * 0.45;
    this.y = canvas.height * 0.75;
  }

  /**
   * Calculates the mouse or touch coordinates relative to the canvas.
   *
   * @param {MouseEvent | TouchEvent} event - The user interaction event.
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
   * Checks if the provided coordinates are within the bounds of the RestartGameIcon.
   * If they are, and if either the boss is dead or the character's energy is depleted (while the game is started),
   * the game is restarted.
   *
   * @param {number} mouseX - The x coordinate relative to the canvas.
   * @param {number} mouseY - The y coordinate relative to the canvas.
   */
  handleClick(mouseX, mouseY) {
    const isWithinBounds =
      mouseX >= this.x &&
      mouseX <= this.x + this.width &&
      mouseY >= this.y &&
      mouseY <= this.y + this.height;

    // Restart if the boss is dead or if the character's energy is 0 and the game is running.
    const restartCondition =
      this.world.enbossIsDead || (this.world.character.energy <= 0 && this.world.startGame);

    if (isWithinBounds && restartCondition) {
      this.toggleGame();
    }
  }

  /**
   * Handles click or touch events.
   * Calculates the coordinates and processes the restart action if conditions are met.
   *
   * @param {MouseEvent | TouchEvent} event - The user interaction event.
   */
  onClick(event) {
    const { mouseX, mouseY } = this.getMouseCoordinates(event);
    this.handleClick(mouseX, mouseY);
  }

  /**
   * Toggles the game by restarting it, initiating all necessary intervals,
   * and resetting the boss status.
   */
  toggleGame() {
    this.world.startGame = true;
    this.world.resetManager.resetGame();
    this.world.startAllIntervals();
    this.world.enbossIsDead = false;
  }
}
