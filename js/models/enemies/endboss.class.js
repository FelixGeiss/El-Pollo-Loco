/**
 * Represents the Endboss in the game, which extends from MovableObject.
 * This class controls the different states of the Endboss (walking, alerted,
 * attacking, hurt, and dead) as well as its movement and animation intervals.
 */
class Endboss extends MovableObject {

  // Dimensions and movement properties
  height = 400;
  width = 250;
  speed = 1;
  itsMove = false;
  speedResetTimeout = null;

  /**
   * Indicates whether the Endboss is currently attacking.
   * @type {boolean}
   */
  isAttack = false;

  // Position and energy properties
  y = 55;
  energy = 300;
  movementInterval = null;

  /**
   * Reference to the setInterval used for animations.
   * @type {number|null}
   */
  animationInterval = null;

  /**
   * Reference to the setInterval used for movement while attacking.
   * @type {number|null}
   */
  moveInterval = null;

  // Image arrays for different states
  /**
   * Array of image paths for the alert state.
   * @type {string[]}
   */
  IMAGES_ALERT = [
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
   * Array of image paths for the attack state.
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
   * Array of image paths for the walking state.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  /**
   * Array of image paths for the hurt state.
   * @type {string[]}
   */
  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  /**
   * Array of image paths for the dead state.
   * @type {string[]}
   */
  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  /**
   * Creates an instance of Endboss.
   * Loads images, sets the initial position and offsets, and starts the animation.
   */
  constructor() {
    super();
    this.loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_ALERT);
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
    this.hurtSpeedIncreased = false;
  }

  /**
   * Starts the movement and animation intervals.
   */
  animate() {
    this.clearIntervals();
    this.startMovementInterval();
    this.startAnimationInterval();
  }

  /**
   * Clears any existing movement and animation intervals.
   */
  clearIntervals() {
    if (this.movementInterval) clearInterval(this.movementInterval);
    if (this.animationInterval) clearInterval(this.animationInterval);
  }

  /**
   * Starts the interval that controls the movement logic.
   */
  startMovementInterval() {
    this.movementInterval = setInterval(() => this.handleMovement(), 1000 / 60);
  }

  /**
   * Controls the movement logic:
   * - Moves the Endboss to the left if it is attacking.
   * - Stops the interval if the Endboss is dead.
   * - Moves left if not attacking and the itsMove flag is true.
   */
  handleMovement() {
    if (this.isAttack) {
      this.moveEnemie();
    }

    if (this.isDead()) {
      clearInterval(this.movementInterval);
      return;
    }

    if (!this.isAttack && this.itsMove) {
      this.moveLeft();
    }
  }

  /**
   * Starts the interval that controls the animation logic.
   */
  startAnimationInterval() {
    this.animationInterval = setInterval(() => this.handleAnimation(), 150);
  }

  /**
   * Determines the current state and plays the corresponding animation:
   * - Dead, Hurt, Attack, Walking, or Alert.
   */
  handleAnimation() {
    if (this.isDead()) {
      this.handleDeadAnimation();
    } else if (this.isHurt()) {
      this.handleHurtAnimation();
    } else {
      this.hurtSpeedIncreased = false; // Reset when not hurt
      if (this.isAttack) {
        this.handleAttackAnimation();
      } else if (this.itsMove) {
        this.handleWalkingAnimation();
      } else {
        this.handleAlertAnimation();
      }
    }
  }

  /**
   * Plays the death animation and increments the frame index until the animation completes.
   */
  handleDeadAnimation() {
    this.playAnimation([this.IMAGES_DEAD[this.frameIndexDead]]);
    this.frameIndexDead++;
    if (this.frameIndexDead >= this.IMAGES_DEAD.length) {
      clearInterval(this.animationInterval);
    }
  }

  /**
   * Plays the hurt animation and slightly moves the Endboss to the right.
   * Increases the speed only once during the hurt state.
   */
  handleHurtAnimation() {
    if (!this.hurtSpeedIncreased) {
      this.speed += 2; // Increase speed only once
      this.speedResetTimeout = setTimeout(() => {
        this.resetSpeed();
      }, 5000);
      this.hurtSpeedIncreased = true; // Set flag
    }
    this.playAnimation(this.IMAGES_HURT);
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
    this.playAnimation(this.IMAGES_ALERT);
  }

  /**
   * Resets the Endboss's speed to its default value.
   */
  resetSpeed() {
    this.speed = 1;
  }

  /**
   * Resets the Endboss to its initial state and restarts movement and animation intervals.
   */
  resetEnemy() {
    if (this.movementInterval) clearInterval(this.movementInterval);
    if (this.animationInterval) clearInterval(this.animationInterval);
    if (this.moveInterval) clearInterval(this.moveInterval);
    this.itsMove = false;
    this.isAttack = false;
    this.y = 55;
    this.x = 10150;
    this.energy = 100;
    this.frameIndexDead = 0;
    this.hurtSpeedIncreased = false;
    this.animate();
  }

  /**
   * Moves the Endboss to the left during an attack.
   * Starts a movement interval if one is not already active.
   */
  moveEnemie() {
    if (!this.isDead() && this.isAttack && !this.moveInterval) {
      this.moveInterval = setInterval(() => {
        this.moveLeft();
      }, 1000 / 60);
    }
  }
}
