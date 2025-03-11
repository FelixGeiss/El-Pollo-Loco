/**
 * Represents the Endboss enemy in the game, extending the MovableObject class.
 * This class handles different states of the Endboss such as walking, alert,
 * attacking, hurt, and dead, as well as its movement and animation intervals.
 */
class Endboss extends MovableObject {
  /**
   * The height of the Endboss.
   * @type {number}
   */
  height = 400;

  /**
   * The width of the Endboss.
   * @type {number}
   */
  width = 250;

  /**
   * The movement speed of the Endboss.
   * @type {number}
   */
  speed = 1;

  /**
   * Indicates whether the Endboss is currently attacking.
   * @type {boolean}
   */
  isAttack = false;

  /**
   * The vertical position of the Endboss.
   * @type {number}
   */
  y = 55;

  /**
   * The energy level of the Endboss.
   * @type {number}
   */
  energy = 100;

  /**
   * Reference to the setInterval used for movement.
   * @type {number|null}
   */
  movementInterval = null;

  /**
   * Reference to the setInterval used for animation.
   * @type {number|null}
   */
  animationInterval = null;

  /**
   * Reference to the setInterval used for moving the Endboss when attacking.
   * @type {number|null}
   */
  moveInterval = null;

  /**
   * An array of image paths for the alert state.
   * @type {string[]}
   */
  IMGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  /**
   * An array of image paths for the attack state.
   * @type {string[]}
   */
  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  /**
   * An array of image paths for the walking state.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  /**
   * An array of image paths for the hurt state.
   * @type {string[]}
   */
  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  /**
   * An array of image paths for the dead state.
   * @type {string[]}
   */
  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  /**
   * Constructs the Endboss, loads its images, sets up position and offsets,
   * and starts its initial animation.
   */
  constructor() {
    super();
    this.loadImage(this.IMGES_ALERT[0]);
    this.loadImages(this.IMGES_ALERT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.offset.top = 60;
    this.offset.bottom = 10;
    this.x = 10150;
    this.movementInterval = null;
    this.animationInterval = null;
    this.moveInterval = null;
    this.frameIndexDead = 0;
    this.animate();
  }

  /**
   * Begins the movement and animation intervals.
   */
  animate() {
    this.clearIntervals();
    this.startMovementInterval();
    this.startAnimationInterval();
  }

  /**
   * Clears existing movement and animation intervals.
   */
  clearIntervals() {
    if (this.movementInterval) clearInterval(this.movementInterval);
    if (this.animationInterval) clearInterval(this.animationInterval);
  }

  /**
   * Starts the interval that handles movement logic.
   */
  startMovementInterval() {
    this.movementInterval = setInterval(() => this.handleMovement(), 1000 / 60);
  }

  /**
   * Handles movement logic, moving the Endboss left if not attacking
   * and removing the interval if the Endboss is dead.
   */
  handleMovement() {
    if (this.isAttack) {
      this.moveEnemie();
    }

    if (this.isDead()) {
      clearInterval(this.movementInterval);
      return;
    }

    if (!this.isAttack && this.energy < 100) {
      this.moveLeft();
    }
  }

  /**
   * Starts the interval that handles animation logic.
   */
  startAnimationInterval() {
    this.animationInterval = setInterval(() => this.handleAnimation(), 150);
  }

  /**
   * Manages the animation state based on whether the Endboss is dead, hurt, attacking, etc.
   */
  handleAnimation() {
    if (this.isDead()) {
      this.handleDeadAnimation();
    } else if (this.isHurt()) {
      this.handleHurtAnimation();
    } else if (this.isAttack) {
      this.handleAttackAnimation();
    } else if (this.energy < 100) {
      this.handleWalkingAnimation();
    } else {
      this.handleAlertAnimation();
    }
  }

  /**
   * Plays the death animation and increments the frame index until the animation is finished.
   */
  handleDeadAnimation() {
    this.playAnimation([this.IMAGES_DEAD[this.frameIndexDead]]);
    this.frameIndexDead++;
    if (this.frameIndexDead >= this.IMAGES_DEAD.length) {
      clearInterval(this.animationInterval);
    }
  }

  /**
   * Plays the hurt animation and moves the Endboss slightly to the right.
   */
  handleHurtAnimation() {
    this.playAnimation(this.IMAGES_HURT);
    this.x = this.x + 20;
  }

  /**
   * Plays the attack animation.
   */
  handleAttackAnimation() {
    this.playAnimation(this.IMAGES_ATTACK);
  }

  /**
   * Plays the walking animation.
   */
  handleWalkingAnimation() {
    this.playAnimation(this.IMAGES_WALKING);
  }

  /**
   * Plays the alert animation.
   */
  handleAlertAnimation() {
    this.playAnimation(this.IMGES_ALERT);
  }

  /**
   * Resets the Endboss to its default state and restarts movement and animation intervals.
   */
  resetEnemy() {
    if (this.movementInterval) clearInterval(this.movementInterval);
    if (this.animationInterval) clearInterval(this.animationInterval);
    if (this.moveInterval) clearInterval(this.moveInterval);

    this.isAttack = false;
    this.y = 55;
    this.x = 10150;
    this.energy = 100;
    this.frameIndexDead = 0;

    this.animate();
  }

  /**
   * Moves the Endboss left if it is attacking and not already in a move interval.
   */
  moveEnemie() {
    if (!this.enemyIsDead && this.isAttack && !this.moveInterval) {
      this.moveInterval = setInterval(() => {
        this.moveLeft();
      }, 1000 / 60);
    }
  }
}
