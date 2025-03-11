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
   * The image path for the unmuted icon.
   * @type {string}
   */
  nonMute = "img/Mute/1.png";

  /**
   * Indicates whether the sound effects are currently muted.
   * @type {boolean}
   */
  isMuted = false;

  /**
   * Reference to the game world, if available.
   * @type {object}
   */
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
    canvas.addEventListener("resize", this.updatePosition.bind(this));
  }

  /**
   * Updates the position of the sound mute icon based on the current canvas size.
   */
  updatePosition() {
    this.x = canvas.width * 0.90;
    this.y = canvas.height * 0.05;
  }

  /**
   * Mutes or unmutes all game sound effects managed by the world's audio manager.
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
   * Handles click and touch events on the icon. Checks if the user interaction is within the icon's bounds.
   * If so, toggles the sound mute state.
   * @param {MouseEvent | TouchEvent} event - The user interaction event.
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
