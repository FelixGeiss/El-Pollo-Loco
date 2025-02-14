class Endboss extends MovableObject {
  height = 400;
  width = 250;
  speed = 1;
  isAttack = false;
  y = 55;
  energy = 1000;

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

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];
  

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  constructor() {
    super().loadImage(this.IMGES_ALERT[0]);
    this.loadImages(this.IMGES_ALERT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);

    this.x = 10150;
    this.animate();
  
    
  }


  animate() {
    /*****************************************
     * 1) BEWEGUNGS-INTERVAL: 60 FPS
     *****************************************/
    let movementInterval = setInterval(() => {
        if (this.isDead()) {
            // Wenn Figur stirbt, Bewegung beenden
            clearInterval(movementInterval);
            this.applyGravity();
            this.speedY = 30;
            return;
        }

        // Nicht bewegen, wenn Attack
        if (!this.isAttack) {
            if (this.energy < 1000) {
                this.moveLeft();
            }
        }
    }, 1000 / 60); // 60 FPS

    /*****************************************
     * 2) ANIMATIONS-INTERVAL
     *****************************************/
    let frameIndexDead = 0;
    let animationInterval = setInterval(() => {
        // -- Prüfe zuerst, ob Charakter tot ist --
        if (this.isDead()) {
            this.playAnimation([this.IMAGES_DEAD[frameIndexDead]]);
            frameIndexDead++;
            if (frameIndexDead >= this.IMAGES_DEAD.length) {
                clearInterval(animationInterval);
            }
        }
        // -- Sonst, wenn verletzt --
        else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            this.x = this.x + 20;
        }
        // -- Sonst, wenn Angriff --
        else if (this.isAttack) {
            this.playAnimation(this.IMAGES_ATTACK);
        }
        // -- Wenn nichts davon, gehe zu Walking/Alert --
        else {
            if (this.energy < 1000) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.playAnimation(this.IMGES_ALERT);
            }
        }
    }, 150);
}



}