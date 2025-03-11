/**
 * Represents a single cloud in the game's background, extending the MovableObject class.
 * The cloud moves from right to left at a constant rate.
 */
class Clout extends MovableObject {
  /**
   * The vertical position of the cloud.
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
   * Reference to the setInterval used for animating the cloud.
   * @type {number|undefined}
   */
  animationInterval;

  /**
   * Constructs a new cloud, loads its image, sets a random initial x-position,
   * and starts the animation that moves it left.
   */
  constructor() {
    super();
    this.loadImage("img/5_background/layers/4_clouds/1.png");
    this.x = Math.random() * 13890;

    this.animate();
  }

  /**
   * Starts or restarts the animation interval that continuously moves the cloud left.
   */
  animate() {
    this.animationInterval = setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }

  /**
   * Resets the cloud to a new random x-position and restarts its movement animation.
   */
  reset() {
    this.animate();
    this.x = Math.random() * 13890;
  }
}
