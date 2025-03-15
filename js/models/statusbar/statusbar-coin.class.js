/**
 * Represents a status bar for coins, extending the DrawableObject class.
 */
class StatusBarCoin extends DrawableObject {
  /**
   * An array of image paths representing different coin collection levels.
   * @type {string[]}
   */
  IMAGES = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png",
  ];

  /**
   * The current coin collection percentage (from 0 to 5).
   * @type {number}
   */
  percentage = 0;

  /**
   * Constructs the StatusBarCoin, loads its images, sets its initial position and size,
   * and initializes the coin percentage to 0.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 40;
    this.y = 100;
    this.width = 200;
    this.height = 60;
    this.setPercentage(0);
  }

  /**
   * Sets the coin collection level and updates the status bar image accordingly.
   * The percentage is constrained between 0 and 5.
   * @param {number} percentage - The new coin collection percentage.
   */
  setPercentage(percentage) {
    if (percentage < 0) {
      percentage = 0;
    } else if (percentage > 5) {
      percentage = 5;
    }
    this.percentage = percentage;
    const path = this.IMAGES[this.percentage];
    this.img = this.imageCache[path];
  }
}
