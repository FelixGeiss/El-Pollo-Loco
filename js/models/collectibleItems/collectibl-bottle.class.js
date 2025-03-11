/**
 * Represents a collectible salsa bottle in the game, extending the MovableObject class.
 * This class handles the initial loading of the bottle's image and collision offsets,
 * as well as providing a reset method for repositioning.
 */
class CollectiblBottel extends MovableObject {
  /**
   * The width of the collectible bottle.
   * @type {number}
   */
  width = 70;
  
  /**
   * The height of the collectible bottle.
   * @type {number}
   */
  height = 80;
  
  /**
   * The vertical position of the collectible bottle.
   * @type {number}
   */
  y = 340;

  /**
   * Constructs a new collectible bottle, loads its image, sets collision offsets,
   * and initializes its horizontal position randomly within a given range.
   */
  constructor() {
    super().loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    this.offset.top = 10;
    this.offset.bottom = 5;
    this.offset.left = 25;
    this.offset.right = 10;
    this.x = 500 + Math.random() * (10050 - 500);
  }

  /**
   * Resets the horizontal position of the bottle to a new random value
   * within the specified range.
   */
  reset(){
    this.x = 500 + Math.random() * (10050 - 500);
  }
}
