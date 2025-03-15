/**
 * Represents a "Play Game" icon in the game, extending the DrawableObject class.
 * When clicked or touched (if the game is not started and the start screen is displayed),
 * it starts the game.
 */
class PlayGameIcon extends DrawableObject {
  world;

  /**
   * Constructs the PlayGameIcon, loads the play image, sets up its position,
   * and attaches event listeners for clicks, touches, and window resizing.
   */
  constructor() {
    super();

    this.loadImage("img/play.png");
    this.updatePosition();
    this.width = 50;
    this.height = 50;

    canvas.addEventListener("click", this.onClick.bind(this));
    canvas.addEventListener("touchstart", this.onClick.bind(this), { passive: false });
    window.addEventListener("resize", this.updatePosition.bind(this));
  }

  /**
   * Updates the position of the PlayGameIcon based on the current canvas size.
   */
  updatePosition() {
    this.x = canvas.width * 0.7;
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
   * Checks if the provided coordinates are within the bounds of the PlayGameIcon.
   * If they are, and if the game is not started and the start screen is showing,
   * toggles the game state.
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
      !this.world.startGame && this.world.showStartscreen
    ) {
      this.toggleGame();
    }
  }

  /**
   * Handles click or touch events.
   * Calculates the coordinates and processes the game toggle action if conditions are met.
   *
   * @param {MouseEvent | TouchEvent} event - The user interaction event.
   */
  onClick(event) {
    const { mouseX, mouseY } = this.getMouseCoordinates(event);
    this.handleClick(mouseX, mouseY);
  }

  /**
   * Toggles the game from the start screen state to the playing state,
   * initiating all necessary intervals and hiding the start screen.
   */
  toggleGame() {
    this.world.startGame = true;
    this.world.startAllIntervals();
    this.world.showStartscreen = false;
    this.world.level.resetCollectibles();
  }
}
