class StatusBarCoin extends DrawableObject {
    IMAGES = [
      "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png",
      "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png",
      "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png",
      "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png", 
      "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png",
      "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png",
    ];
  
    percentage = 0;
  
    constructor() {
      super();
      this.loadImages(this.IMAGES);
      this.x = 40;
      this.y = 100;
      this.width = 200;
      this.height = 60;
      this.setPercentage(0);
    }
  
    setPercentage(percentage) {
      if (percentage < 0) {
        percentage = 0;
      } else if (percentage > 5) {
        percentage = 5;
      }
  
      this.percentage = percentage;
  
      let path = this.IMAGES[this.percentage];
      this.img = this.imageCache[path];
    }
  }
  