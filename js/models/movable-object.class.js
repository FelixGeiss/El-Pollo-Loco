/**
 * Represents a movable object in the game, extending the DrawableObject class.
 * Handles physics (gravity), collisions, movement, and animations for both the character and enemies.
 *
 * @class MovableObject
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
  /**
   * Indicates if the enemy is dead. Not used for characters.
   * @type {boolean}
   */
  enemyIsDead = false;

  /**
   * Index of the current image in the animation cycle.
   * @type {number}
   */
  currentImage = 0;

  /**
   * Horizontal speed of the object.
   * @type {number}
   */
  speed = 0.15;

  /**
   * Vertical speed of the object.
   * @type {number}
   */
  speedY = 0;

  /**
   * Acceleration used for gravity effects.
   * @type {number}
   */
  acceleration = 2.5;

  /**
   * The energy level of the object.
   * @type {number}
   */
  energy = 100;

  /**
   * Timestamp of the last time the object was hit.
   * @type {number}
   */
  lastHit = 0;

  /**
   * Interval ID for movement-related loops.
   * @type {number | undefined}
   */
  moveInterval;

  /**
   * Applies gravity to the object by updating its vertical position.
   * The object's vertical speed is decreased by its acceleration at regular intervals.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * Determines if the object is currently above the ground.
   * Ground detection differs based on the type of object.
   *
   * @returns {boolean} True if the object is above the ground, otherwise false.
   */
  isAboveGround() {
    if (this instanceof Throwableobject) {
      return this.y < 370;
    } else if (this instanceof ChickenSmall) {
      return this.y < 350;
    } else {
      return this.y < 150;
    }
  }

  /**
   * Checks if this object is colliding with another movable object.
   * Collision detection accounts for offset values for more accurate boundaries.
   *
   * @param {MovableObject} obj - The other object to check collision against.
   * @returns {boolean} True if a collision is detected, otherwise false.
   */
  isColliding(obj) {
    return (
      this.x + this.width - this.offset.right > obj.x + obj.offset.left &&
      this.y + this.height - this.offset.bottom > obj.y + obj.offset.top &&
      this.x + this.offset.left < obj.x + obj.width - obj.offset.right &&
      this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom
    );
  }

  /**
   * Reduces the object's energy when hit.
   * If the energy drops below zero, it is set to zero.
   * Otherwise, the last hit timestamp is updated.
   */
  hit() {
    this.energy -= 20;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Checks if the object is currently in a hurt state.
   * An object is considered hurt if it was hit within the last second.
   *
   * @returns {boolean} True if the object is hurt, otherwise false.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  /**
   * Determines if the object is dead based on its energy level.
   *
   * @returns {boolean} True if the object's energy is zero, otherwise false.
   */
  isDead() {
    return this.energy === 0;
  }

  /**
   * Moves the object to the right by its horizontal speed.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left by its horizontal speed.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Initiates a jump by setting the vertical speed to a positive value.
   */
  jump() {
    this.speedY = 30;
  }

  /**
   * Animates the object by cycling through a set of images.
   * The displayed image is updated based on the current animation frame.
   *
   * @param {string[]} images - An array of image paths used for the animation.
   */
  playAnimation(images) {
    const i = this.currentImage % images.length;
    const path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
}
