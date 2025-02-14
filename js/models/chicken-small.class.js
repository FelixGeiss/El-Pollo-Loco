class ChickenSmall extends MovableObject {
  y = 360;
  height = 60;
  width = 80;
  energy = 20;

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];
  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];
  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 2040 + Math.random() * 4080;
    this.speed = 0.3 + Math.random() * 0.5;
    this.applyGravity();
    this.animate();
  }

  animate() {
    let moveInterval = setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

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
          clearInterval(moveInterval);
        });
      }
    }, 50);
  }
}
