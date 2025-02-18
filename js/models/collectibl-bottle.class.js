class CollectiblBottel extends MovableObject {
  width = 70;
  height = 80;
  y = 340;

  constructor() {
    super().loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    this.x = 500 + Math.random() * 13890;
  }
}
