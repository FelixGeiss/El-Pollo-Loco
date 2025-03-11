/**
 * Represents a "move left" button in the game, extending the DrawableObject class.
 * When touched, it triggers a move left action by setting the 'LEFT' key in the keyboard object to true.
 */
class MoveLeft extends DrawableObject {
    /**
     * Initializes the MoveLeft button, loads the image, sets its dimensions and position,
     * and attaches touch event listeners.
     */
    constructor() {
      super();
  
      this.loadImage("img/movement/arrow-left.png");
      this.updatePosition();
      this.width = 50;
      this.height = 50;
  
      canvas.addEventListener("touchstart", this.onTouchStart.bind(this), { passive: false });
      canvas.addEventListener("touchend", this.onTouchEnd.bind(this));
  
      window.addEventListener("resize", this.updatePosition.bind(this));
    }
  
    /**
     * Updates the position of the MoveLeft button based on the canvas size.
     */
    updatePosition() {
      this.x = canvas.width * 0.70;
      this.y = canvas.height * 0.85;
    }
  
    /**
     * Handler for the touchstart event.
     * If the user touches within the button's area, it sets the 'LEFT' key in the keyboard object to true.
     * @param {TouchEvent} event - The touch event triggered by user interaction.
     */
    onTouchStart(event) {
      event.preventDefault();
  
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
  
      const touch = event.touches[0];
      const touchX = (touch.clientX - rect.left) * scaleX;
      const touchY = (touch.clientY - rect.top) * scaleY;
  
      if (
        touchX >= this.x && touchX <= this.x + this.width &&
        touchY >= this.y && touchY <= this.y + this.height
      ) {
        this.world.keyboard.LEFT = true;
      }
    }
  
    /**
     * Handler for the touchend event.
     * Sets the 'LEFT' key in the keyboard object to false, disabling left movement.
     * @param {TouchEvent} event - The touch event triggered by user interaction.
     */
    onTouchEnd(event) {
      event.preventDefault();
      this.world.keyboard.LEFT = false;
    }
  }
  