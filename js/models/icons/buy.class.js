/**
 * Represents a "Buy" button in the game, extending the DrawableObject class.
 * It loads a specific image and handles touch events to set the DOWN key in the keyboard object.
 */
class Buy extends DrawableObject {
    /**
     * Initializes the Buy button, loads the image, sets its dimensions and position, 
     * and attaches touch event listeners.
     */
    constructor() {
      super();
  
      this.loadImage("img/movement/arrow-down.png");
      this.updatePosition();
      this.width = 50;
      this.height = 50;
  
      canvas.addEventListener("touchstart", this.onTouchStart.bind(this), { passive: false });
      canvas.addEventListener("touchend", this.onTouchEnd.bind(this));
  
      window.addEventListener("resize", this.updatePosition.bind(this));
    }
  
    /**
     * Updates the position of the Buy button based on the canvas size.
     */
    updatePosition() {
      this.x = canvas.width * 0.05;
      this.y = canvas.height * 0.85;
    }
  
    /**
     * Handler for the touchstart event. 
     * If the user touches within the button's area, it sets the 'DOWN' key in the keyboard object to true.
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
        this.world.keyboard.DOWN = true;
      }
    }
  
    /**
     * Handler for the touchend event. 
     * Sets the 'DOWN' key in the keyboard object to false.
     * @param {TouchEvent} event - The touch event triggered by user interaction.
     */
    onTouchEnd(event) {
      event.preventDefault();
      this.world.keyboard.DOWN = false;
    }
  }
  