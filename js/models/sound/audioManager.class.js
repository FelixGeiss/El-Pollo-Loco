/**
 * Manages audio functionalities within the game.
 */
class AudioManager {
  /**
   * Creates an instance of AudioManager.
   * Initializes all sound effects and background music.
   *
   * @param {Object} world - The game world instance.
   */
  constructor(world) {
    this.world = world;
    this.jumpSound = new PlayAudio("audio/jumppp11.ogg", false, 1);
    this.coinSound = new PlayAudio("audio/coin.mp3", false, 1);
    this.snoreSound = new PlayAudio("audio/big-snore.mp3", true, 1);
    this.bottleBrokenSound = new PlayAudio("audio/bottle-broken.mp3", false, 1, false);
    this.bottleCollectSound = new PlayAudio("audio/glass-clinking.mp3", false, 1, false);
    this.chickenHitSound = new PlayAudio("audio/chicken-hit.mp3", false, 1, false);
    this.characterHitSound = new PlayAudio("audio/hit.mp3", false, 1, false);
    this.buySound = new PlayAudio("audio/buy.mp3", false, 1, false);
    this.throwSound = new PlayAudio("audio/throw.mp3", false, 1, false);
    this.backgroundSound = new PlayAudio("audio/level-ix-211054.mp3", true, 0.8, true);
  }
  
  /**
   * Starts the background sound if the music is not muted.
   * Checks the mute status stored in localStorage under "MusikMute" and plays the background sound
   * if the stored status is "false". If no mute status is found, it initializes it to "false".
   */
  startBackroundsound() {
    let storedMuteStatus = localStorage.getItem("MusikMute");
    if (storedMuteStatus === null) {
      localStorage.setItem("MusikMute", "false");
      storedMuteStatus = "false";
    }
    if (storedMuteStatus === "false") {
      this.world.audioManager.backgroundSound.play();
    }
  }
}
