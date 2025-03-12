/**
 * Represents a collectible coin in the game, extending the MovableObject class.
 * It handles loading coin images, setting collision offsets, randomizing its
 * position, and managing the coin's animation.
 */
class CollectiblCoin extends MovableObject {
  width = 150;
  height = 150;
  animationInterval;

  /**
   * An array of coin images for animation.
   * @type {string[]}
   */
  IMAGES = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];
  active;

  /**
   * Constructs a new collectible coin, loads its images, sets collision offsets,
   * positions it randomly within specified ranges, and starts its animation.
   */
  constructor() {
    super().loadImage(this.IMAGES[0]);
    this.loadImages(this.IMAGES);
    this.offset.top = 50;
    this.offset.bottom = 50;
    this.offset.left = 50;
    this.offset.right = 50;
    this.x = 500 + Math.random() * (10050 - 500);
    this.y = 50 + Math.random() * (300 - 50);
    this.animate();
    this.active = true;
  }

  /**
   * Starts or restarts the animation interval that cycles through the coin images.
   * Uses the playAnimation method to move through the IMAGES array.
   */
  animate() {
    this.animationInterval = setInterval(() => {
      this.playAnimation(this.IMAGES);
    }, 300);
  }

  /**
   * Resets the coin's position to a random location within a specified range
   * and restarts its animation. Clears any existing animation interval before restarting.
   */
  reset() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
      this.animationInterval = undefined;
    }
    this.animate();
    this.x = 500 + Math.random() * (10050 - 500);
    this.y = 50 + Math.random() * (300 - 50);
    this.active = true;
  }
}
