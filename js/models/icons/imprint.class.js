/**
 * Represents an "Imprint" text drawn on a canvas, navigates the user to "imprint.html" when clicked or touched.
 */
class Imprint extends DrawableObject  {
 

    /**
   * Initializes the InstructionIcon, loads its image, positions it, and sets up the event listeners.
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
     * Updates the position of the instruction icon based on the canvas size.
     */
    updatePosition() {
      this.x = canvas.width * 0.45;
      this.y = canvas.height * 0.83;
    }
  
    /**
     * Handler for click and touchstart events. Checks if the click/touch is within
     * the icon's bounds and if the game has not started. If so, navigates to "instruction.html".
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
        !this.world.startGame
      ) {
        window.location.href = "imprint.html";
        console.log("klick wurde ausgeführt ");
        
      }
    }
  
    /**
     * Handler for mouseup and touchend events. Prevents default behavior.
     * @param {MouseEvent | TouchEvent} event - The user interaction event.
     */
    onRelease(event) {
      event.preventDefault();
    }
  
  
}
