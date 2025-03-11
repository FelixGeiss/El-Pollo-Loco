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
   * The image path for the unmuted icon.
   * @type {string}
   */
  nonMute = "img/Mute/4.png";

  /**
   * Indicates whether the music is currently muted.
   * @type {boolean}
   */
  isMuted = false;

  /**
   * A reference to the game world, if available.
   * @type {object}
   */
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
   * Handles the click or touch event. Checks if the click/touch is within the icon's bounds.
   * If it is, toggles the sound.
   * @param {MouseEvent | TouchEvent} event - The event triggered by user interaction.
   */
  onClick(event) {
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

    if (
      mouseX >= this.x && mouseX <= this.x + this.width &&
      mouseY >= this.y && mouseY <= this.y + this.height
    ) {
      this.toggleSound();
    }
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
