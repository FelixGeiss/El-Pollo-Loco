/**
 * Represents a collectible coin in the game, extending the MovableObject class.
 * It handles the loading of coin images, setting collision offsets,
 * randomizing its position, and managing coin animation.
 */
class CollectiblCoin extends MovableObject {
  /**
   * The width of the collectible coin.
   * @type {number}
   */
  width = 150;
  
  /**
   * The height of the collectible coin.
   * @type {number}
   */
  height = 150;

  /**
   * Reference to the setInterval used for animation.
   * @type {number|undefined}
   */
  animationInterval;

  /**
   * An array of coin images for animation.
   * @type {string[]}
   */
  IMAGES = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

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
  }

  /**
   * Starts or restarts the animation interval that cycles through the coin images.
   */
  animate() {
    this.animationInterval = setInterval(() => {
      this.playAnimation(this.IMAGES);
    }, 300);
  }

  /**
   * Resets the coin's position to a random location within the specified range
   * and restarts its animation.
   */
  reset() {
    this.animate();
    this.x = 500 + Math.random() * (10050 - 500);
    this.y = 50 + Math.random() * (300 - 50);
  }
}
