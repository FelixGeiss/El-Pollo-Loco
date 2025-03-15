/**
 * Represents a background object that extends the DrawableObject.
 *
 * @class BackgroundObjekt
 * @extends DrawableObject
 */
class BackgroundObjekt extends DrawableObject {
  
  /**
   * The width of the background object.
   * @type {number}
   */
  width = 720;

  /**
   * The height of the background object.
   * @type {number}
   */
  height = 480;

  /**
   * Creates an instance of BackgroundObjekt.
   *
   * @constructor
   * @param {string} imagePath - The path to the image to load.
   * @param {number} x - The x-coordinate position for the background object.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    /**
     * The x-coordinate position of the background object.
     * @type {number}
     */
    this.x = x;
    
    /**
     * The y-coordinate position of the background object.
     * This positions the object at the bottom of the canvas.
     * @type {number}
     */
    this.y = 480 - this.height;
  }
}
