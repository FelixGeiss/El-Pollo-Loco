/**
 * Represents a single cloud in the game's background, extending the MovableObject class.
 * The cloud moves from right to left at a constant rate.
 */
class Clout extends MovableObject {
  y = 20;
  height = 250;
  width = 500;
  animationInterval;
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
