/**
 * Represents a single cloud in the game's background, extending the MovableObject class.
 * The cloud moves from right to left at a constant rate.
 *
 * @class Clout
 * @extends MovableObject
 */
class Clout extends MovableObject {
  /**
   * The y-coordinate of the cloud.
   * @type {number}
   */
  y = 20;

  /**
   * The height of the cloud.
   * @type {number}
   */
  height = 250;

  /**
   * The width of the cloud.
   * @type {number}
   */
  width = 500;

  /**
   * Interval ID for the cloud's animation.
   * @type {number}
   */
  animationInterval;

  /**
   * Creates a new Clout instance.
   * Loads the cloud image, sets a random x-position, and starts the movement animation.
   */
  constructor() {
    super();
    this.loadImage("img/5_background/layers/4_clouds/1.png");
    this.x = Math.random() * 13890;
    this.animate();
  }

  /**
   * Starts or restarts the animation interval that continuously moves the cloud to the left.
   */
  animate() {
    this.animationInterval = setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }

  /**
   * Resets the cloud by assigning it a new random x-position and restarting its movement animation.
   */
  reset() {
    this.animate();
    this.x = Math.random() * 13890;
  }
}
