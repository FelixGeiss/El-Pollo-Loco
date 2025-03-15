/**
 * Represents the salsa store in the game, which is a drawable object.
 * The store is displayed using an image and its x-position is randomized.
 *
 * @class SalsaStore
 * @extends DrawableObject
 */
class SalsaStore extends DrawableObject {
  /**
   * The width of the salsa store.
   * @type {number}
   */
  width = 250;

  /**
   * The height of the salsa store.
   * @type {number}
   */
  height = 250;

  /**
   * The y-coordinate of the salsa store.
   * @type {number}
   */
  y = 200;

  /**
   * The x-coordinate of the salsa store.
   * @type {number}
   */
  x = 200;

  /**
   * Creates a new SalsaStore instance.
   * Loads the salsa store image, sets collision offsets, and randomizes the x-position.
   */
  constructor() {
    super().loadImage("img/salsa_store.png");
    this.offset.top = 25;
    this.offset.bottom = 35;
    this.x = 500 + Math.random() * (10000 - 500);
  }

  /**
   * Resets the salsa store's x-position by randomizing it within a specified range.
   */
  reset() {
    this.x = 500 + Math.random() * (10000 - 500);
  }
}
