class DrawableObject {


    x = 150;
    y = 280;
    img;
    height = 150;
    width = 100;
    imageCache = {};




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
        if (this instanceof Character || this instanceof Chicken || this instanceof Throwableobject || this instanceof Endboss) {
          ctx.beginPath();
          ctx.lineWidth = 5;
          ctx.strokeStyle = "blue";
          ctx.rect(this.x, this.y, this.width, this.height);
          ctx.stroke();
        }
      }
}