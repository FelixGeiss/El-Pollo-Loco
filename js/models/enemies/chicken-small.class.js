/**
 * Represents a small chicken enemy in the game, extending the MovableObject class.
 * The chicken can walk, jump, and die, and is subject to gravity.
 */
class ChickenSmall extends MovableObject {
  y = 360;
  height = 60;
  width = 80;
  energy = 20;

  /**
   * An array of image paths for the chicken's walking animation.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  /**
   * An array of image paths for the chicken's death animation.
   * @type {string[]}
   */
  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  /**
   * Constructs a new ChickenSmall, loads images, initializes position,
   * sets its speed, applies gravity, and starts animation.
   */
  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 1000 + Math.random() * (10150 - 1000);
    this.speed = 0.3 + Math.random() * 0.5;
    this.applyGravity();
    this.animate();
    this.offset.top = 15;
    this.offset.bottom = 15;
    this.offset.left = 15;
    this.offset.right = 15;
  }

  /**
   * Manages the chicken's movement and animation intervals.
   * The chicken will walk, play walking animation, jump if on the ground,
   * and switch to the death animation when it dies.
   */
  animate() {
    this.moveEnemie();

    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
      if (!this.isAboveGround() && !this.enemyIsDead) {
        this.jump();
      }
    }, 200);

    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
        this.enemyIsDead = true;
        setTimeout(() => {
          clearInterval(this.moveInterval);
        });
      }
    }, 50);
  }

  /**
   * Sets an interval for the chicken to move left, as long as it is not dead.
   */
  moveEnemie() {
    if (!this.enemyIsDead) {
      this.moveInterval = setInterval(() => {
        this.moveLeft();
      }, 1000 / 60);
    }
  }

  /**
   * Resets the chicken to a new position, restores energy, revives it, and
   * assigns a random speed within the specified range.
   */
  resetEnemy() {
    this.x = 1000 + Math.random() * (10150 - 1000);
    this.energy = 20;
    this.enemyIsDead = false;
    this.speed = 0.3 + Math.random() * 0.5;
  }
}
