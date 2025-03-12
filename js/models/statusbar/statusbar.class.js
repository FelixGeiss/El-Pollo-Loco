/**
 * Represents a status bar showing the health of a character or entity,
 * extending the DrawableObject class.
 */
class StatusBar extends DrawableObject {
  /**
   * An array of image paths representing different health levels.
   * @type {string[]}
   */
  IMAGES = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png",
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
    this.x = 40;
    this.y = 0;
    this.width = 200;
    this.height = 60;

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
