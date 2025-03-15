/**
 * Represents the game over screen displayed when the player loses.
 * Extends the DrawableObject class.
 *
 * @class GameOver
 * @extends DrawableObject
 */
class GameOver extends DrawableObject {
  /**
   * The width of the game over screen.
   * @type {number}
   */
  width = 720;

  /**
   * The height of the game over screen.
   * @type {number}
   */
  height = 480;

  /**
   * Creates a new GameOver instance.
   * Loads the game over image and sets its position to the top-left corner.
   */
  constructor() {
    super().loadImage("img/9_intro_outro_screens/game_over/game over.png");
    /**
     * The x-coordinate of the game over screen.
     * @type {number}
     */
    this.x = 0;
    /**
     * The y-coordinate of the game over screen.
     * @type {number}
     */
    this.y = 0;
  }
}
