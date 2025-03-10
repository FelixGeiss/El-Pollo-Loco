class Clout extends MovableObject {
  y = 20;
  height = 250;
  width = 500;
  animationInterval;

  constructor() {
    super();
    this.loadImage("img/5_background/layers/4_clouds/1.png");
    this.x = Math.random() * 13890;

    this.animate();
  }

  animate() {
    this.animationInterval =  setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }

  reset(){
    this.animate()
    this.x = Math.random() * 13890;

  }
}
