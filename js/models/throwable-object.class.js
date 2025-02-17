class Throwableobject extends MovableObject {
 bottleIsBroken = false; 
 
 
 
    constructor(x, y, otherDirektion) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.IMAGES_ROTATION);
    this.loadImages(this.IMAGES_SPLASH);
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    this.trow(otherDirektion);
    this.animate();
  }

  IMAGES_ROTATION = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  trow(otherDirektion) {
    this.speedY = 30;
    this.applyGravity();


    this.throwInterval = setInterval(() => {
      
      if (this.y < 370) {
        if (otherDirektion) {
          this.x -= 5;
        } else {
          this.x += 5;
        }
      } else {
 
        clearInterval(this.throwInterval);


        this.animate();
      }
    }, 25);
  }

  animate() {

    if (this.animateInterval) {
      return; 
    }

    this.animateInterval = setInterval(() => {
    
      if (this.y >= 370) {
        clearInterval(this.animateInterval);
        this.animateInterval = null; 
        this.animateSplash();
      } else {
      
        this.playAnimation(this.IMAGES_ROTATION);
      }
    }, 50);
  }

  animateSplash() {
    let frameIndex = 0;

  
    let splashInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_SPLASH);
      frameIndex++;

      if (frameIndex >= this.IMAGES_SPLASH.length) {
        clearInterval(splashInterval);
        this.bottleIsBroken = true;
        
      }
    }, 50);
  }

  remove() {
    const index = this.world.throwableObjects.indexOf(this);
    if (index !== -1) {
      this.world.throwableObjects.splice(index, 1);
    }
  }
}

