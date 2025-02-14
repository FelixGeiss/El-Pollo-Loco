class Character extends MovableObject {
  height = 280;
  y = 150;
  x = 100 ; 
  currentImage = 0;
  speed = 10;

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

  world;

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.applyGravity();
    this.animate();
  }

  animate() {
    /*****************************************
     * 1) Bewegung + Kollisionsabfrage (60 FPS)
     *****************************************/
    setInterval(() => {
      // Alte Position merken
      let oldX = this.x;

      // Bewegen (falls Tasten gedrückt)
      if (this.world.keyborad.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
        this.otherDirektion = false;
      }
      if (this.world.keyborad.LEFT && this.x > 0) {
        this.moveLeft();
        this.otherDirektion = true;
      }

      // Springen
      if (
        (this.world.keyborad.UP && !this.isAboveGround()) ||
        (this.world.keyborad.SPACE && !this.isAboveGround())
      ) {
        this.jump();
      }

      this.world.level.enemies.forEach((enemy) => {
        // 1) Enemy muss noch leben UND
        // 2) Charakter kollidiert mit enemy
        if (!enemy.enemyIsDead && this.isColliding(enemy)) {
          this.x = oldX;
        }
      });

      // Kamera updaten
      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);

    /*****************************************
     * 2) Animations-Interval
     *****************************************/
    let frameIndex = 0;
    let deadInterval = setInterval(() => {
      if (this.isDead()) {
        this.playAnimation([this.IMAGES_DEAD[frameIndex]]);
        frameIndex++;
        if (frameIndex >= this.IMAGES_DEAD.length) {
          clearInterval(deadInterval);
        }
      } else if (this.isHurt()) {
        // HURT hat hohe Priorität, sonst wird es von Jumping/Walking überschrieben
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      } else {
        // Boden-Animationen
        if (this.world.keyborad.RIGHT || this.world.keyborad.LEFT) {
          this.playAnimation(this.IMAGES_WALKING);
        }
        // Sonst kein else: wenn keine Taste gedrückt wird, bleib beim letzten Frame
      }
    }, 50);
  }
}
