/**
 * Represents a movable object in the game, extending the DrawableObject class.
 * Handles physics (gravity), collisions, movement, and animations for both the character and enemies.
 */
class MovableObject extends DrawableObject {
  /**
   * Indicates if the enemy is dead. Not used for characters.
   * @type {boolean}
   */
  enemyIsDead = false;
  currentImage = 0;
  speed = 0.15;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;

  /**
   * A timestamp of the last time the object was hit.
   * @type {number}
   */
  lastHit = 0;
  moveInterval;
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
   * @returns {boolean} True if above the ground, otherwise false.
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
   * Checks if this object is colliding with another object.
   * @param {MovableObject} obj - The other object to check collision against.
   * @returns {boolean} True if colliding, otherwise false.
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
   * Reduces the object's energy by a set amount (e.g., if hit by an enemy or damage source).
   * Sets the lastHit time if the object still has energy left.
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
   * Determines if the object is hurt by checking the time since the last hit.
   * @returns {boolean} True if the object has been hit within the last second, otherwise false.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  /**
   * Determines if the object is dead (energy == 0).
   * @returns {boolean} True if dead, otherwise false.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Moves the object to the right by its speed.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left by its speed.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Makes the object jump by setting its vertical speed (speedY) to a positive value.
   */
  jump() {
    this.speedY = 30;
  }

  /**
   * Cycles through an array of images to animate the object.
   * @param {string[]} images - An array of image paths.
   */
  playAnimation(images) {
    const i = this.currentImage % images.length;
    const path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
}
