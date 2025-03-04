class PlayAudio {
  muted = false;

  constructor(
    audioSrc,
    shouldLoop = false,
    volume = 1,
    backroundSound = false
  ) {
    this.audio = new Audio(audioSrc);
    this.audio.loop = shouldLoop;
    this.audio.volume = volume;
    this.backroundSound = backroundSound;
    this.mutedSound();
  }

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

  play(newVolume) {
    if (this.muted) {
      return;
    }
    if (typeof newVolume === "number") {
      this.audio.volume = newVolume;
    }
    this.audio.play();
  }

  pause() {
    this.audio.pause();
  }

  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }

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
