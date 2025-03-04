class DrawableObject {
  x = 150;
  y = 280;
  img;
  height = 150;
  width = 100;
  imageCache = {};

  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  loadImages(arr) {
    arr.forEach((path) => {
      const img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawBorder(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Throwableobject ||
      this instanceof Endboss ||
      this instanceof ChickenSmall ||
      this instanceof CollectiblBottel ||
      this instanceof CollectiblCoin ||
      this instanceof SalsaStore 

    ) {
      ctx.beginPath();
      ctx.lineWidth = 5;
      ctx.strokeStyle = "red";

      ctx.rect(
        this.x + this.offset.left,
        this.y + this.offset.top,
        this.width - this.offset.left - this.offset.right,
        this.height - this.offset.top - this.offset.bottom
      );

      ctx.stroke();
    }
  }
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }
}
