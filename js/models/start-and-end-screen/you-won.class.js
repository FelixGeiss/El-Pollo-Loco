/**
 * Represents the victory screen displayed when the player wins.
 * Extends the DrawableObject class.
 *
 * @class YouWon
 * @extends DrawableObject
 */
class YouWon extends DrawableObject {
  /**
   * The width of the victory screen.
   * @type {number}
   */
  width = 720;

  /**
   * The height of the victory screen.
   * @type {number}
   */
  height = 480;

  /**
   * Creates a new YouWon instance.
   * Loads the victory screen image and positions it at the top-left corner.
   */
  constructor() {
    super().loadImage("img/You won/You won A.png");
    /**
     * The x-coordinate of the victory screen.
     * @type {number}
     */
    this.x = 0;
    /**
     * The y-coordinate of the victory screen.
     * @type {number}
     */
    this.y = 0;
  }
}
