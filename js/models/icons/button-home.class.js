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
    this.width = 50;
    this.height = 50;

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
    this.x = canvas.width * 0.7;
    this.y = canvas.height * 0.05;
  }

  /**
   * Handles both click and touch events to determine if the home icon was pressed.
   * If pressed and the start screen is not currently shown, it stops and resets the game.
   * @param {MouseEvent | TouchEvent} event - The event triggered by user interaction.
   */
  onClick(event) {
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

    if (
      mouseX >= this.x &&
      mouseX <= this.x + this.width &&
      mouseY >= this.y &&
      mouseY <= this.y + this.height &&
      !this.world.showStartscreen
    ) {
      this.world.startGame = false;
      this.world.stopAllIntervals();
      this.world.resetManager.resetGame();
    }
  }
}
