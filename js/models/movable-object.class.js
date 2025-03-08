class MovableObject extends DrawableObject {
  enemyIsDead = false;
  currentImage = 0;
  speed = 0.15;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;
  moveInterval;

 

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof Throwableobject) {
      return this.y < 370;
    } else if (this instanceof ChickenSmall) {
      return this.y < 350;
    } else {
      return this.y < 150;
    }
  }



  isColliding(obj) {
    return (
      this.x + this.width - this.offset.right    > obj.x + obj.offset.left    &&
      this.y + this.height - this.offset.bottom  > obj.y + obj.offset.top     &&
      this.x + this.offset.left                  < obj.x + obj.width - obj.offset.right &&
      this.y + this.offset.top                   < obj.y + obj.height - obj.offset.bottom
    );
  }
  

  hit() {
    this.energy -= 20;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    
    }
  }





  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  isDead() {
    return this.energy == 0;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 30;
  }
  playAnimation(images) {
    const i = this.currentImage % images.length;
    const path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
 
}
