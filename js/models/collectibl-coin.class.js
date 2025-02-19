class CollectiblCoin extends MovableObject {
  width = 150;
  height = 150;

  IMAGES = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  constructor() {
    super().loadImage(this.IMAGES[0]);
    this.loadImages(this.IMAGES);
    this.offset.top = 50;
    this.offset.bottom = 50;
    this.offset.left = 50;
    this.offset.right = 50;
    this.x = 500 + Math.random() * (10050 - 500);
    this.y = 50 + Math.random() * (300 - 50);
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES);
    }, 300);
  }
}
