/**
 * Represents a status bar showing the number of bottles the player has,
 * extending the DrawableObject class.
 */
class StatusBarBottle extends DrawableObject {
  /**
   * An array of image paths representing different bottle levels.
   * @type {string[]}
   */
  IMAGES = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png", 
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png", 
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png", 
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png", 
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png", 
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png", 
  ];

  /**
   * The current bottle percentage (from 0 to 5).
   * @type {number}
   */
  percentage = 0;

  /**
   * Constructs the StatusBarBottle, loads its images, sets its initial position and size,
   * and initializes the bottle percentage to 0.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 40;
    this.y = 50;
    this.width = 200;
    this.height = 60;
    this.setPercentage(0);
  }

  /**
   * Sets the bottle level and updates the status bar image accordingly.
   * The percentage is constrained between 0 and 5.
   * @param {number} percentage - The new bottle percentage.
   */
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
