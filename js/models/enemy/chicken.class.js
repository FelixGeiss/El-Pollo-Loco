class Chicken extends MovableObject {
  y = 360;
  height = 60;
  width = 80;
  energy = 20;


  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 500 + Math.random() * (10000 - 500);
    this.speed = 0.3 + Math.random() * 0.5;
    this.animate();
  }

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
  moveEnemie(){
    if (!this.enemyIsDead) {
      this.moveInterval = setInterval(() => {
        this.moveLeft();
      }, 1000 / 60);
    }

  }
  resetEnemy() {
    this.x = 500 + Math.random() * (10000 - 500);
  
    this.energy = 20; 
    this.enemyIsDead = false; 
    this.speed = 0.3 + Math.random() * 0.5;
  }


}
