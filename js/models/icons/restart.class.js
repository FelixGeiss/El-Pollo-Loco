
/**
 * Represents a "Play Game" icon in the game, extending the DrawableObject class.
 * When clicked or touched (if the game is not started and the start screen is displayed),
 * it starts the game.
 */
class RestartGameIcon extends DrawableObject {
    world;
  
    /**
     * Constructs the PlayGameIcon, loads the play image, sets up its position,
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
     * Updates the position of the PlayGameIcon based on the current canvas size.
     */
    updatePosition() {
        this.x = canvas.width * 0.45;
        this.y = canvas.height * 0.75;
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
        this.world.enbossIsDead || 
        this.world.character.energy <= 0 && this.world.startGame &&
        mouseX >= this.x &&
        mouseX <= this.x + this.width &&
        mouseY >= this.y &&
        mouseY <= this.y + this.height 

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
      this.world.resetManager.resetGame()
      this.world.startAllIntervals();
      this.world.enbossIsDead = false;
    }
  }
  