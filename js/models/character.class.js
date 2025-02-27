class Character extends MovableObject {
  height = 280;
  y = 150;
  x = 100;
  currentImage = 0;
  speed = 10;
  longIdle = false;
  timeoutLongIdle = null;
  otherDirektion = false;
  characterInterval;

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
  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

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

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];
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

  world;

  constructor() {
    super().loadImage(this.IMAGES_IDLE[0]);
    this.offset.top = 115;
    this.offset.bottom = 10;
    this.offset.left = 19;
    this.offset.right = 20;

    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.applyGravity();
    this.animate();
  }

  startTimer() {
    if (this.timeoutLongIdle) return;

    this.longIdle = false;

    this.timeoutLongIdle = setTimeout(() => {
      this.longIdle = true;
    }, 15000);
  }

  stopTimer() {
    if (this.timeoutLongIdle) {
      clearTimeout(this.timeoutLongIdle);
      this.timeoutLongIdle = null;
      this.longIdle = false;
    }
  }

  animate() {
    setInterval(() => {
      let oldX = this.x;

      if (this.world.startGame) {
        if (
          this.world.keyborad.RIGHT &&
          this.x < this.world.level.level_end_x
        ) {
          this.moveRight();
          this.otherDirektion = false;
        }
        if (this.world.keyborad.LEFT && this.x > 0) {
          this.moveLeft();
          this.otherDirektion = true;
        }

        if (
          (this.world.keyborad.UP && !this.isAboveGround()) ||
          (this.world.keyborad.SPACE && !this.isAboveGround())
        ) {
          this.jump();
          this.world.jumpSound.play();
        }

        this.world.level.enemies.forEach((enemy) => {
          if (!enemy.enemyIsDead && this.isColliding(enemy)) {
            this.x = oldX;
          }
        });

        // Kamera updaten
      }
      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);

    let frameIndex = 0;
     this.characterInterval = setInterval(() => {
      if (this.isDead()) {
        this.playAnimation([this.IMAGES_DEAD[frameIndex]]);
        frameIndex++;
        if (frameIndex >= this.IMAGES_DEAD.length) {
          clearInterval(this.characterInterval);
          this.stopTimer();
          this.world.snoreSound.stop();
        }
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
        this.stopTimer();
        this.world.snoreSound.stop();
      } else if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
        this.stopTimer();
        this.world.snoreSound.stop();
      } else {
        if (this.world.keyborad.RIGHT || this.world.keyborad.LEFT) {
          this.playAnimation(this.IMAGES_WALKING);
          this.stopTimer();
          this.world.snoreSound.stop();
        } else if (this.longIdle) {
          this.playAnimation(this.IMAGES_LONG_IDLE);
          this.world.snoreSound.play();
        } else {
          this.playAnimation(this.IMAGES_IDLE);
          this.startTimer();
          this.world.snoreSound.stop();
        }
      }
    }, 150);
  }
  resetCharacter() {
    this.x = 100; 
    this.energy = 100; 
    this.enemyIsDead = false; 
    this.otherDirektion = false; 
    this.animate()
  }
}
