/**
 * Represents a throwable salsa bottle in the game, extending the MovableObject class.
 * It can be thrown in a chosen direction, rotates while in the air, and splashes upon hitting the ground.
 */
class Throwableobject extends MovableObject {
  bottleIsBroken = false;
  world;

  /**
   * An array of image paths for the bottle's rotation animation.
   * @type {string[]}
   */
  IMAGES_ROTATION = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  /**
   * An array of image paths for the bottle's splash animation upon impact.
   * @type {string[]}
   */
  IMAGES_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  /**
   * Constructs a new Throwableobject, loads rotation and splash images, and initiates its throwing and animation behavior.
   * @param {number} x - The initial x position of the bottle.
   * @param {number} y - The initial y position of the bottle.
   * @param {boolean} otherDirektion - If true, the bottle is thrown to the left; otherwise, to the right.
   */
  constructor(x, y, otherDirektion) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.IMAGES_ROTATION);
    this.loadImages(this.IMAGES_SPLASH);
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    this.trow(otherDirektion);
    this.animate();
  }

  /**
   * Initiates the throwing behavior by setting vertical speed and moving the bottle horizontally until it hits the ground.
   * @param {boolean} otherDirektion - Determines the horizontal direction of the throw.
   */
  trow(otherDirektion) {
    this.speedY = 30;
    this.applyGravity();
    this.throwInterval = setInterval(() => {
      this.updateThrowMovement(otherDirektion);
    }, 25);
  }
  
  updateThrowMovement(otherDirektion) {
    if (this.y < 370) {
      if (otherDirektion) {
        this.x -= 5;
      } else {
        this.x += 5;
      }
    } else {
      clearInterval(this.throwInterval);
      this.animate();
    }
  }
  

  /**
   * Handles the rotation animation while the bottle is in the air, and stops when it lands.
   * Once it lands, triggers the splash animation.
   */
  animate() {
    if (this.animateInterval) {
      return;
    }

    this.animateInterval = setInterval(() => {
      if (this.y >= 370) {
        clearInterval(this.animateInterval);
        this.animateInterval = null;
        this.animateSplash();
      } else {
        this.playAnimation(this.IMAGES_ROTATION);
      }
    }, 50);
  }

  /**
   * Plays the splash animation after the bottle hits the ground.
   * Once the final frame of the splash animation is reached, marks the bottle as broken.
   */
  animateSplash() {
    let frameIndex = 0;

    let splashInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_SPLASH);
      frameIndex++;

      if (frameIndex >= this.IMAGES_SPLASH.length) {
        clearInterval(splashInterval);
        this.bottleIsBroken = true;
      }
    }, 50);
  }

  /**
   * Removes this throwable object from the world's array of throwable objects (if present).
   */
  remove() {
    const index = this.world.throwableObjects.indexOf(this);
    if (index !== -1) {
      this.world.throwableObjects.splice(index, 1);
    }
  }
}
