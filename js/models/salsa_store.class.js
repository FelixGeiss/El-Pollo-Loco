class SalsaStore extends MovableObject {
  width = 250;
  height = 250;
  y = 200;
  x = 200;

  constructor() {
    super().loadImage("img/6_salsa_bottle/salsa_store.png");
    this.offset.top = 25;
    this.offset.bottom = 35;
  }
}
