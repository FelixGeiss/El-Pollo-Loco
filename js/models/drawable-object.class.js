/**
 * Represents a drawable object that can be rendered on a canvas.
 *
 * @class DrawableObject
 */
class DrawableObject {
  /**
   * The x-coordinate position of the drawable object.
   * @type {number}
   */
  x = 150;

  /**
   * The y-coordinate position of the drawable object.
   * @type {number}
   */
  y = 280;

  /**
   * The image used for the drawable object.
   * @type {HTMLImageElement}
   */
  img;

  /**
   * The height of the drawable object.
   * @type {number}
   */
  height = 150;

  /**
   * The width of the drawable object.
   * @type {number}
   */
  width = 100;

  /**
   * A cache for storing images, with the image path as the key.
   * @type {Object<string, HTMLImageElement>}
   */
  imageCache = {};

  /**
   * Offset values for adjusting collision detection or rendering.
   * @type {{top: number, bottom: number, left: number, right: number}}
   */
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  /**
   * Loads multiple images and stores them in the image cache.
   *
   * @param {string[]} arr - An array of image paths.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      const img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Draws the current image on the provided canvas context.
   *
   * @param {CanvasRenderingContext2D} ctx - The drawing context of a canvas.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Loads a single image from the specified path.
   *
   * @param {string} path - The path of the image to load.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }


  
}
