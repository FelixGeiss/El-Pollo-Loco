class SalsaStore extends DrawableObject {
  width = 250;
  height = 250;
  y = 200;
  x = 200;

  constructor() {
    super().loadImage("img/6_salsa_bottle/salsa_store.png");
    this.offset.top = 25;
    this.offset.bottom = 35;
    this.x = 500 + Math.random() * (10000 - 500);
  }


  reset(){

    this.x = 500 + Math.random() * (10000 - 500);

  }
}

