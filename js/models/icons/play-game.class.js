/**
 * Represents a "Play Game" icon in the game, extending the DrawableObject class.
 * When clicked or touched (if the game is not started and the start screen is displayed),
 * it starts the game.
 */
class PlayGameIcon extends DrawableObject {
  /**
   * A reference to the game world.
   * @type {World}
   */
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

    // Event listeners for clicks, touches, and window resize
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
   * Handles click or touch events. If the user interaction is within the icon's bounds,
   * and the game is not currently started and the start screen is showing, it toggles the game state.
   * @param {MouseEvent | TouchEvent} event - The user interaction event.
   */
  onClick(event) {
    event.preventDefault();

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let mouseX, mouseY;

    if (event.touches && event.touches.length > 0) {
      // Touch event
      mouseX = (event.touches[0].clientX - rect.left) * scaleX;
      mouseY = (event.touches[0].clientY - rect.top) * scaleY;
    } else {
      // Mouse click event
      mouseX = (event.clientX - rect.left) * scaleX;
      mouseY = (event.clientY - rect.top) * scaleY;
    }

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
   * Toggles the game from the start screen state to the playing state,
   * initiating all necessary intervals and hiding the start screen.
   */
  toggleGame() {
    this.world.startGame = true;
    this.world.startAllIntervals();
    this.world.showStartscreen = false;
  }
}
