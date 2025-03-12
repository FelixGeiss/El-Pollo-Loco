/**
 * Represents an Imprint link/button in the game, extending the DrawableObject class.
 * This class creates an <h2> element, positions it, and navigates to the imprint page when clicked or touched.
 */
class Imprint extends DrawableObject {
  world;

  /**
   * Initializes the Imprint object, creating an <p> element in the DOM and binding event listeners.
   * @param {World} world - The game world instance this imprint belongs to.
   */
  constructor(world) {
    super();
    this.world = world;

    this.element = document.createElement("p");
    this.element.textContent = "Imprint";
    this.element.style.position = "absolute";

    if (this.world.startGame) {
      this.element.style.display = "none";
      console.log("wurde auf non gesetzt ");
    }

    document.body.appendChild(this.element);

    this.updatePosition();

    this.element.addEventListener("click", this.onClick.bind(this));
    this.element.addEventListener("touchstart", this.onClick.bind(this), {
      passive: false,
    });

    this.element.addEventListener("mouseup", this.onRelease.bind(this));
    this.element.addEventListener("touchend", this.onRelease.bind(this));

    window.addEventListener("resize", this.updatePosition.bind(this));
  }

  /**
   * Updates the absolute position of the <h2> element according to the canvas size.
   */
  updatePosition() {
    this.element.style.left = `${canvas.width * 0.05}px`;
    this.element.style.top = `${canvas.height * 0.05}px`;
  }

  /**
   * Handles click and touchstart events. If the game hasn't started yet,
   * it navigates to the imprint.html page.
   * @param {MouseEvent | TouchEvent} event - The user interaction event.
   */
  onClick(event) {
    event.preventDefault();

    if (!this.world.startGame) {
      window.location.href = "imprint.html";
    }
  }

  /**
   * Handles mouseup and touchend events, preventing any default behavior.
   * @param {MouseEvent | TouchEvent} event - The user interaction event.
   */
  onRelease(event) {
    event.preventDefault();
  }
}
