class PlayAudio {
  muted  = false;
  constructor(audioSrc, shouldLoop = false, volume = 1) {
    this.audio = new Audio(audioSrc);
    this.audio.loop = shouldLoop;
    this.audio.volume = volume;
  
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
}

