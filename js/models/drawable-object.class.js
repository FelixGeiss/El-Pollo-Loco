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
        if (
          this instanceof Character ||
          this instanceof Chicken ||
          this instanceof Throwableobject ||
          this instanceof Endboss ||
          this instanceof ChickenSmall ||
          this instanceof CollectiblBottel
        ) {
          // 1) Blaue Umrandung (gesamte Bounding Box)
          ctx.beginPath();
          ctx.lineWidth = 5;
          ctx.strokeStyle = "blue";
          ctx.rect(this.x, this.y, this.width, this.height);
          ctx.stroke();
      
          // 2) Rote Umrandung (um das Objekt herum, verkleinert oder vergrößert)
          ctx.beginPath();
          ctx.lineWidth = 5;
          ctx.strokeStyle = "red";
      
          // Wichtig: x/ y um offset verschieben
          // und width/ height um die addierten offsets verkleinern
          ctx.rect(
            this.x + this.offset.left,                   // links weiter rein
            this.y + this.offset.top,                    // oben weiter rein
            this.width - this.offset.left - this.offset.right,  // insgesamt schmaler
            this.height - this.offset.top - this.offset.bottom   // insgesamt niedriger
          );
      
          ctx.stroke();
        }
      }
      
}