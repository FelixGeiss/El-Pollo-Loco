/**
 * Represents the start screen of the game, displayed at the beginning.
 * Extends the DrawableObject class.
 *
 * @class Startscreen
 * @extends DrawableObject
 */
class Startscreen extends DrawableObject {
  /**
   * The width of the start screen.
   * @type {number}
   */
  width = 720;

  /**
   * The height of the start screen.
   * @type {number}
   */
  height = 480;

  /**
   * Creates a new Startscreen instance.
   * Loads the start screen image and positions it at the top-left corner.
   */
  constructor() {
    super().loadImage("img/9_intro_outro_screens/start/startscreen_1.png");
    /**
     * The x-coordinate of the start screen.
     * @type {number}
     */
    this.x = 0;
    /**
     * The y-coordinate of the start screen.
     * @type {number}
     */
    this.y = 0;
  }
}
