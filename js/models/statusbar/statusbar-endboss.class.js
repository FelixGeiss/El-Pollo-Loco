/**
 * Represents a status bar showing the health of a character or entity,
 * extending the DrawableObject class.
 */
class StatusBarEndboss extends DrawableObject {
    /**
     * An array of image paths representing different health levels.
     * @type {string[]}
     */
    IMAGES = [
      "img/2_statusbar_endboss/statusbar_0.png",
      "img/2_statusbar_endboss/statusbar_20.png",
      "img/2_statusbar_endboss/statusbar_40.png",
      "img/2_statusbar_endboss/statusbar_60.png",
      "img/2_statusbar_endboss/statusbar_80.png",
      "img/2_statusbar_endboss/statusbar_100.png",
    ];
  
    /**
     * The current health percentage displayed by the status bar.
     * @type {number}
     */
    percentage = 100;
  
    /**
     * Constructs the StatusBar, loads its images, sets its initial position, size,
     * and initializes the health percentage to 100.
     */
    constructor() {
      super();
      this.loadImages(this.IMAGES);
      this.x = 250;
      this.y = -76;
      this.width = 210;
      this.height = 220;
  
      this.setPercentage(100);
    }
  
    /**
     * Sets the health percentage and updates the status bar image accordingly.
     * @param {number} percentage - The new health percentage to display.
     */
    setPercentage(percentage) {
      this.percentage = percentage;
      const path = this.IMAGES[this.resolveImageIndex()];
      this.img = this.imageCache[path];
    }
  
    /**
     * Determines the index of the correct image in the IMAGES array based on the current health percentage.
     * @returns {number} - The index corresponding to the current health level.
     */
    resolveImageIndex() {
      if (this.percentage == 100) {
        return 5;
      } else if (this.percentage == 80) {
        return 4;
      } else if (this.percentage == 60) {
        return 3;
      } else if (this.percentage == 40) {
        return 2;
      } else if (this.percentage == 20) {
        return 1;
      } else {
        return 0;
      }
    }
  }
  