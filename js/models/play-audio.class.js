class PlayAudio {
    constructor(audioSrc) {
      this.audio = new Audio(audioSrc);
    }
  
    play() {
      this.audio.play()
    }
  
    pause() {
      this.audio.pause();
    }
  
    stop() {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  }
