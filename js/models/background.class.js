class BackgroundObjekt extends MovableObject {
  
  
  width = 720;
  height = 480;
  
  
    constructor(imagPath, x) {
    super().loadImage(imagPath);
    this.x = x;
    this.y = 480 - this.height;
  }
}
