/**
 * Represents an icon that toggles the background music between mute and unmute.
 * Extends the DrawableObject class.
 */
class MusicsMuteIcon extends DrawableObject {
  /**
   * The image path for the muted icon.
   * @type {string}
   */
  mute = "img/Mute/3.png";
  /**
   * The image path for the non-muted icon.
   * @type {string}
   */
  nonMute = "img/Mute/4.png";

  /**
   * Indicates whether the music is currently muted.
   * @type {boolean}
   */
  isMuted = false;
  world;

  /**
   * Constructs a new MusicsMuteIcon, loading the correct icon based on the
   * stored mute status in localStorage. Also attaches click and touch event listeners.
   */
  constructor() {
    super();

    this.loadImage(this.nonMute);
    this.updatePosition();
    this.width = 50;
    this.height = 50;

    const storedMuteStatus = localStorage.getItem("MusikMute");
    if (storedMuteStatus === "true") {
      this.isMuted = true;
      this.loadImage(this.mute);

      if (this.world && this.world.audioManager.backgroundSound) {
        this.world.audioManager.backgroundSound.muted = true;
        this.world.audioManager.backgroundSound.pause();
      }
    }

    canvas.addEventListener("click", this.onClick.bind(this));
    canvas.addEventListener("touchstart", this.onClick.bind(this), { passive: false });
    window.addEventListener("resize", this.updatePosition.bind(this));
  }

  /**
   * Updates the position of the mute icon based on the current canvas size.
   */
  updatePosition() {
    this.x = canvas.width * 0.8;
    this.y = canvas.height * 0.05;
  }

  /**
   * Calculates the mouse or touch coordinates relative to the canvas.
   *
   * @param {MouseEvent | TouchEvent} event - The event triggered by user interaction.
   * @returns {{mouseX: number, mouseY: number}} An object containing the calculated x and y coordinates.
   */
  getMouseCoordinates(event) {
    event.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    let mouseX, mouseY;

    if (event.touches && event.touches.length > 0) {
      mouseX = (event.touches[0].clientX - rect.left) * scaleX;
      mouseY = (event.touches[0].clientY - rect.top) * scaleY;
    } else {
      mouseX = (event.clientX - rect.left) * scaleX;
      mouseY = (event.clientY - rect.top) * scaleY;
    }

    return { mouseX, mouseY };
  }

  /**
   * Checks if the provided coordinates are within the bounds of the mute icon.
   * If they are, toggles the background sound.
   *
   * @param {number} mouseX - The x coordinate relative to the canvas.
   * @param {number} mouseY - The y coordinate relative to the canvas.
   */
  handleClick(mouseX, mouseY) {
    if (
      mouseX >= this.x && mouseX <= this.x + this.width &&
      mouseY >= this.y && mouseY <= this.y + this.height
    ) {
      this.toggleSound();
    }
  }

  /**
   * Handles the click or touch event.
   * Calculates the coordinates and processes the toggle sound action if conditions are met.
   *
   * @param {MouseEvent | TouchEvent} event - The event triggered by user interaction.
   */
  onClick(event) {
    const { mouseX, mouseY } = this.getMouseCoordinates(event);
    this.handleClick(mouseX, mouseY);
  }

  /**
   * Toggles the background sound between mute and unmute.
   * Updates the icon image, stores the new mute status in localStorage,
   * and pauses/plays the background sound accordingly.
   */
  toggleSound() {
    this.isMuted = !this.isMuted;
    const newImage = this.isMuted ? this.mute : this.nonMute;
    this.loadImage(newImage);
    localStorage.setItem("MusikMute", this.isMuted.toString());
    if (this.world && this.world.audioManager.backgroundSound) {
      this.world.audioManager.backgroundSound.muted = this.isMuted;
      if (this.isMuted) {
        this.world.audioManager.backgroundSound.pause();
      } else {
        this.world.audioManager.backgroundSound.play();
      }
    }
  }
}
