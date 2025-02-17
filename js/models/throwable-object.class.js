class Throwableobject extends MovableObject {
  constructor(x, y, otherDirektion) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    this.trow(otherDirektion);
  }

  trow(otherDirektion) {
    this.speedY = 30;
    this.applyGravity();

    setInterval(() => {
      if (otherDirektion) {
        this.x -= 5;
      } else {
        this.x += 5;
      }
    }, 25);
  }
}
