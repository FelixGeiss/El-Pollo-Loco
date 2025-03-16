/**
 * Represents the main character in the game, extending the MovableObject class.
 * Manages animations, movement, collisions, and idle states (including a long idle with snoring).
 *
 * @class Character
 * @extends MovableObject
 */
class Character extends MovableObject {
  /**
   * The height of the character.
   * @type {number}
   */
  height = 280;

  /**
   * The y-coordinate of the character.
   * @type {number}
   */
  y = 150;

  /**
   * The x-coordinate of the character.
   * @type {number}
   */
  x = 100;

  /**
   * The current image index for animations.
   * @type {number}
   */
  currentImage = 0;

  /**
   * The movement speed of the character.
   * @type {number}
   */
  speed = 10;

  /**
   * Indicates whether the character is in a long idle state.
   * @type {boolean}
   */
  longIdle = false;

  /**
   * Timeout reference for triggering the long idle state.
   * @type {number|null}
   */
  timeoutLongIdle = null;

  /**
   * Indicates if the character is facing the opposite direction (left).
   * @type {boolean}
   */
  otherDirektion = false;

  /**
   * Reference to the interval handling character animations.
   * @type {number}
   */
  characterInterval;

  /**
   * Reference to the interval handling character movement.
   * @type {number}
   */
  moveIntervall;

  /**
   * An array of image paths for the default idle animation.
   * @type {string[]}
   */
  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  /**
   * An array of image paths for the walking animation.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  /**
   * An array of image paths for the jumping animation.
   * @type {string[]}
   */
  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  /**
   * An array of image paths for the dead (game over) animation.
   * @type {string[]}
   */
  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  /**
   * An array of image paths for the hurt animation.
   * @type {string[]}
   */
  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  /**
   * An array of image paths for the long idle animation (snoring).
   * @type {string[]}
   */
  IMAGES_LONG_IDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  /**
   * Reference to the game world object.
   * @type {object}
   */
  world;

  /**
   * Constructs the Character, loads images, applies gravity, and starts the animation loops.
   */
  constructor() {
    super().loadImage(this.IMAGES_IDLE[0]);
    this.offset.top = 130;
    this.offset.bottom = 10;
    this.offset.left = 30;
    this.offset.right = 30;

    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.applyGravity();
    this.animate();
  }

  /**
   * Starts the timer that triggers the long idle animation if there is no interaction for 15 seconds.
   */
  startTimer() {
    if (this.timeoutLongIdle) return;
    this.longIdle = false;
    this.timeoutLongIdle = setTimeout(() => {
      this.longIdle = true;
    }, 15000);
  }

  /**
   * Stops the long idle timer and resets its state.
   */
  stopTimer() {
    if (this.timeoutLongIdle) {
      clearTimeout(this.timeoutLongIdle);
      this.timeoutLongIdle = null;
      this.longIdle = false;
    }
  }

  /**
   * Starts the movement and animation intervals, updating the character's position and state.
   */
  animate() {
    this.moveIntervall = setInterval(() => this.handleMovement(), 1000 / 60);
    this.characterInterval = setInterval(() => this.handleAnimation(), 150);
  }

  /**
   * Handles the character's movement on each frame, detecting directional input and collisions.
   */
  handleMovement() {
    const oldX = this.x;
    if (this.world.startGame && this.energy > 0) {
      this.handleDirection();
      this.handleJump();
      this.handleCollision(oldX);
    }
    this.world.camera_x = -this.x + 100;
  }

  /**
   * Handles horizontal movement based on keyboard input.
   */
  handleDirection() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.moveRight();
      this.otherDirektion = false;
    }
    if (this.world.keyboard.LEFT && this.x > 0) {
      this.moveLeft();
      this.otherDirektion = true;
    }
  }

  /**
   * Allows the character to jump if the UP or SPACE key is pressed and the character is on the ground.
   */
  handleJump() {
    if (
      (this.world.keyboard.UP && !this.isAboveGround()) ||
      (this.world.keyboard.SPACE && !this.isAboveGround())
    ) {
      this.jump();
      this.world.audioManager.jumpSound.play();
    }
  }

  /**
   * Checks for collisions with enemies and reverts the character's x-position if a collision is detected.
   *
   * @param {number} oldX - The character's x-position before movement.
   */
  handleCollision(oldX) {
    this.world.level.enemies.forEach((enemy) => {
      if (!enemy.enemyIsDead && this.isColliding(enemy)) {
        this.x = oldX;
      }
    });
  }

  /**
   * Controls the character's animation state on each frame based on conditions like death, hurt, jumping, or idle.
   */
  handleAnimation() {
    let frameIndex = 0;
    if (this.isDead()) {
      this.handleDeadAnimation(frameIndex);
    } else if (this.isHurt()) {
      this.handleHurtAnimation();
    } else if (this.isAboveGround()) {
      this.handleJumpingAnimation();
    } else {
      this.handleIdleAnimation();
    }
  }

  /**
   * Plays the dead animation frame-by-frame, then stops character updates once the sequence is complete.
   *
   * @param {number} frameIndex - The current frame index in the dead animation sequence.
   */
  handleDeadAnimation(frameIndex) {
    this.playAnimation([this.IMAGES_DEAD[frameIndex]]);
    frameIndex++;
    if (frameIndex >= this.IMAGES_DEAD.length) {
      clearInterval(this.characterInterval);
      this.stopTimer();
      this.world.snoreSound.stop();
    }
  }

  /**
   * Plays the hurt animation frames, stops the long idle timer, and stops the snoring sound.
   */
  handleHurtAnimation() {
    this.playAnimation(this.IMAGES_HURT);
    this.stopTimer();
    this.world.audioManager.snoreSound.stop();
  }

  /**
   * Plays the jumping animation frames, stops the long idle timer, and stops the snoring sound.
   */
  handleJumpingAnimation() {
    this.playAnimation(this.IMAGES_JUMPING);
    this.stopTimer();
    this.world.audioManager.snoreSound.stop();
  }

  /**
   * Determines whether to play the walking animation, long idle (snoring) animation, or default idle animation
   * based on keyboard input and the long idle timer.
   */
  handleIdleAnimation() {
    if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.playAnimation(this.IMAGES_WALKING);
      this.stopTimer();
      this.world.audioManager.snoreSound.stop();
    } else if (this.longIdle && this.world.startGame) {
      this.playAnimation(this.IMAGES_LONG_IDLE);
      this.world.audioManager.snoreSound.play();
    } else {
      this.playAnimation(this.IMAGES_IDLE);
      this.startTimer();
      this.world.audioManager.snoreSound.stop();
    }
  }

  /**
   * Resets the character to its default state for a new game or after certain conditions,
   * restoring position, energy, and other state values.
   */
  resetCharacter() {
    this.x = 100;
    this.energy = 100;
    this.enemyIsDead = false;
    this.otherDirektion = false;
    this.timeoutLongIdle = null;
    this.longIdle = false;
    this.animate();
  }
}
