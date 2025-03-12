/**
 * Represents a normal-sized chicken enemy in the game, extending the MovableObject class.
 * The chicken can walk, die, and move left at a specified speed.
 */
class Chicken extends MovableObject {
  y = 360;
  height = 60;
  width = 80;
  energy = 20;

  /**
   * An array of image paths for the chicken's walking animation.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  /**
   * An array of image paths for the chicken's death animation.
   * @type {string[]}
   */
  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  /**
   * Constructs a new chicken, loads its images, sets its initial position,
   * speed, and starts the animation.
   */
  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 500 + Math.random() * (10000 - 500);
    this.speed = 0.3 + Math.random() * 0.5;
    this.animate();
  }

  /**
   * Handles the chicken's movement and animation intervals for walking and death.
   */
  animate() {
    this.moveEnemie();

    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
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
   * Moves the chicken to the left at a set interval, provided it is not dead.
   */
  moveEnemie() {
    if (!this.enemyIsDead) {
      this.moveInterval = setInterval(() => {
        this.moveLeft();
      }, 1000 / 60);
    }
  }

  /**
   * Resets the chicken's position, energy, and speed, and revives it if dead.
   */
  resetEnemy() {
    this.x = 500 + Math.random() * (10000 - 500);
    this.energy = 20;
    this.enemyIsDead = false;
    this.speed = 0.3 + Math.random() * 0.5;
  }
}
