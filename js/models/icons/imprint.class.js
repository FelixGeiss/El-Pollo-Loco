/**
 * Represents an "Imprint" text drawn on a canvas, navigates the user to "imprint.html" when clicked or touched.
 */
class Imprint {
  /**
   * Constructs an Imprint object with a canvas, sets up event listeners, and configures default text properties.
   * @param {HTMLCanvasElement} canvas - The canvas element on which the imprint is drawn.
   */
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.text = "Imprint";
    this.fontSize = 20;
    this.fontFamily = "Arial";
    this.color = "#ffde59";
    this.setupEvents();

  }

  /**
   * Draws the imprint text on the canvas, calculating its position and bounding box for click detection.
   */
  draw() {
    this.ctx.font = `${this.fontSize}px ${this.fontFamily}`;
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "bottom";
    this.ctx.fillStyle = this.color;

    const x = this.canvas.width / 2;
    const y = this.canvas.height - 10;
    this.ctx.fillText(this.text, x, y);

    this.textArea = {
      x: x - this.ctx.measureText(this.text).width / 2,
      y: y - this.fontSize,
      width: this.ctx.measureText(this.text).width,
      height: this.fontSize,
    };
  }

  /**
   * Sets up event listeners for click and touch events on the canvas.
   */
  setupEvents() {
    this.canvas.addEventListener("click", (event) => this.handleClick(event));
    this.canvas.addEventListener("touchend", (event) =>
      this.handleTouch(event)
    );
  }

  /**
   * Handles mouse click events, checking if the click falls within the imprint text area.
   * @param {MouseEvent} event - The mouse click event.
   */
  handleClick(event) {
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;
    const clickX = (event.clientX - rect.left) * scaleX;
    const clickY = (event.clientY - rect.top) * scaleY;

    if (this.isClickInsideText(clickX, clickY)) {
      window.location.href = "../imprint.html";
    }
  }

  /**
   * Handles touch events, checking if the touch falls within the imprint text area.
   * @param {TouchEvent} event - The touch event.
   */
  handleTouch(event) {
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;

    const touch = event.changedTouches[0];
    const touchX = (touch.clientX - rect.left) * scaleX;
    const touchY = (touch.clientY - rect.top) * scaleY;

    if (this.isClickInsideText(touchX, touchY)) {
      window.location.href = "../imprint.html";
    }
  }

  /**
   * Checks if a given x and y coordinate are within the bounds of the imprint text.
   * @param {number} clickX - The x coordinate to check.
   * @param {number} clickY - The y coordinate to check.
   * @returns {boolean} True if the coordinates are within the text area, otherwise false.
   */
  isClickInsideText(clickX, clickY) {
    return (
      clickX >= this.textArea.x &&
      clickX <= this.textArea.x + this.textArea.width &&
      clickY >= this.textArea.y &&
      clickY <= this.textArea.y + this.textArea.height
    );
  }
}
