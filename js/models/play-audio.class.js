/**
 * Represents a wrapper around the HTML Audio element, providing methods to play, pause, stop,
 * and mute sounds or background music. It also stores and retrieves mute state from localStorage.
 */
class PlayAudio {
  /**
   * Indicates whether the audio is currently muted.
   * @type {boolean}
   */
  muted = false;

  /**
   * Constructs a new PlayAudio instance, creates an HTMLAudioElement from the given source,
   * configures its looping and volume, and checks for stored mute state.
   * @param {string} audioSrc - The path or URL of the audio file.
   * @param {boolean} [shouldLoop=false] - Determines if the audio should loop.
   * @param {number} [volume=1] - The initial volume of the audio.
   * @param {boolean} [backroundSound=false] - Indicates whether this audio is background music.
   */
  constructor(audioSrc, shouldLoop = false, volume = 1, backroundSound = false) {
    this.audio = new Audio(audioSrc);
    this.audio.loop = shouldLoop;
    this.audio.volume = volume;
    this.backroundSound = backroundSound;
    this.mutedSound();
  }

  /**
   * Checks stored mute state in localStorage and applies it to the audio,
   * depending on whether this instance is for background music or sound effects.
   */
  mutedSound() {
    if (this.backroundSound) {
      const storedMusicMute = localStorage.getItem("musicMuted");
      if (storedMusicMute === "true") {
        this.muted = true;
        this.audio.muted = true;
      }
    } else {
      const storedSoundMute = localStorage.getItem("soundMuted");
      if (storedSoundMute === "true") {
        this.muted = true;
        this.audio.muted = true;
      }
    }
  }

  /**
   * Plays the audio if it is not muted. Can optionally set a new volume before playing.
   * @param {number} [newVolume] - The new volume level to set before playing, if provided.
   */
  play(newVolume) {
    if (this.muted) {
      return;
    }
    if (typeof newVolume === "number") {
      this.audio.volume = newVolume;
    }
    this.audio.play();
  }

  /**
   * Pauses the audio without resetting its playback position.
   */
  pause() {
    this.audio.pause();
  }

  /**
   * Stops the audio by pausing it and resetting its playback position to the beginning.
   */
  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }

  /**
   * Sets the mute state of this audio instance, updates the HTMLAudioElement's muted property,
   * and stores the mute preference in localStorage.
   * @param {boolean} isMuted - Whether the audio should be muted.
   */
  setMute(isMuted) {
    this.muted = isMuted;
    this.audio.muted = isMuted;
    if (this.backroundSound) {
      localStorage.setItem("musicMuted", isMuted.toString());
    } else {
      localStorage.setItem("soundMuted", isMuted.toString());
    }
  }
}
