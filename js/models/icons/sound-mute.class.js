/**
 * Represents an icon for muting and unmuting game sound effects, extending the DrawableObject class.
 */
class SoundsMuteIcon extends DrawableObject {
  /**
   * The image path for the muted icon.
   * @type {string}
   */
  mute = "img/Mute/2.png";
  /**
   * The image path for the non-muted icon.
   * @type {string}
   */
  nonMute = "img/Mute/1.png";

  /**
   * Indicates whether the sound effects are currently muted.
   * @type {boolean}
   */
  isMuted = false;
  world;

  /**
   * Constructs a new SoundsMuteIcon, loads the correct icon based on the stored mute status in localStorage,
   * sets up its position and dimensions, and attaches the necessary event listeners.
   */
  constructor() {
    super();

    this.loadImage(this.nonMute);
    this.updatePosition();
    this.width = 50;
    this.height = 50;

    const storedSoundStatus = localStorage.getItem("soundMuted");
    if (storedSoundStatus === "true") {
      this.isMuted = true;
      this.loadImage(this.mute);
    }

    this.muteSound();

    canvas.addEventListener("click", this.onClick.bind(this));
    canvas.addEventListener("touchstart", this.onClick.bind(this), { passive: false });
    window.addEventListener("resize", this.updatePosition.bind(this));
  }

  /**
   * Updates the position of the sound mute icon based on the current canvas size.
   */
  updatePosition() {
    this.x = canvas.width * 0.90;
    this.y = canvas.height * 0.05;
  }

  /**
   * Applies the mute setting to all game sound effects managed by the world's audio manager.
   */
  muteSound() {
    if (this.world) {
      this.world.audioManager.jumpSound.setMute(this.isMuted);
      this.world.audioManager.coinSound.setMute(this.isMuted);
      this.world.audioManager.snoreSound.setMute(this.isMuted);
      this.world.audioManager.bottleBrokenSound.setMute(this.isMuted);
      this.world.audioManager.bottleCollectSound.setMute(this.isMuted);
      this.world.audioManager.chickenHitSound.setMute(this.isMuted);
      this.world.audioManager.characterHitSound.setMute(this.isMuted);
      this.world.audioManager.buySound.setMute(this.isMuted);
      this.world.audioManager.throwSound.setMute(this.isMuted);
    }
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
   * Checks if the provided coordinates are within the bounds of the sound mute icon.
   * If they are, toggles the sound mute state.
   *
   * @param {number} mouseX - The x coordinate relative to the canvas.
   * @param {number} mouseY - The y coordinate relative to the canvas.
   */
  handleClick(mouseX, mouseY) {
    if (
      mouseX >= this.x &&
      mouseX <= this.x + this.width &&
      mouseY >= this.y &&
      mouseY <= this.y + this.height
    ) {
      this.toggleSound();
    }
  }

  /**
   * Handles click and touch events on the icon.
   * Calculates the coordinates and processes the toggle sound action if conditions are met.
   *
   * @param {MouseEvent | TouchEvent} event - The user interaction event.
   */
  onClick(event) {
    const { mouseX, mouseY } = this.getMouseCoordinates(event);
    this.handleClick(mouseX, mouseY);
  }

  /**
   * Toggles the sound mute state, updates the icon image, stores the new status in localStorage,
   * and applies the setting to all game sound effects.
   */
  toggleSound() {
    this.isMuted = !this.isMuted;
    const newImage = this.isMuted ? this.mute : this.nonMute;
    this.loadImage(newImage);

    localStorage.setItem("soundMuted", this.isMuted.toString());
    this.muteSound();
  }
}
