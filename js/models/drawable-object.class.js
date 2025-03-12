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


  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }




  
}
