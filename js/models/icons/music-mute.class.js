class MusicsMuteIcon extends DrawableObject {
  mute = "img/Mute/3.png";
  nonMute = "img/Mute/4.png";
  isMuted = false;
  world;

  constructor() {
    super();

    this.loadImage(this.nonMute);

    this.x = 580;
    this.y = 20;
    this.width = 50;
    this.height = 50;

    // Lade gespeicherten Mute-Status
    const storedMuteStatus = localStorage.getItem("MusikMute");
    if (storedMuteStatus === "true") {
      this.isMuted = true;
      this.loadImage(this.mute);

      if (this.world && this.world.backgroundSound) {
        this.world.backgroundSound.muted = true;
        this.world.backgroundSound.pause();
      }
    }

    // Event-Listener für Maus & Touch
    canvas.addEventListener("click", this.onClick.bind(this));
    canvas.addEventListener("touchstart", this.onClick.bind(this), { passive: false });
  }

  onClick(event) {
    event.preventDefault(); 

    const rect = canvas.getBoundingClientRect();
    let mouseX, mouseY;

    if (event.touches && event.touches.length > 0) { 
      mouseX = event.touches[0].clientX - rect.left;
      mouseY = event.touches[0].clientY - rect.top;
    } else { 
      mouseX = event.clientX - rect.left;
      mouseY = event.clientY - rect.top;
    }

    if (
      mouseX >= this.x && mouseX <= this.x + this.width &&
      mouseY >= this.y && mouseY <= this.y + this.height
    ) {
      this.toggleSound();
    }
  }

  toggleSound() {
    this.isMuted = !this.isMuted;
    const newImage = this.isMuted ? this.mute : this.nonMute;
    this.loadImage(newImage);

    localStorage.setItem("MusikMute", this.isMuted.toString());

    if (this.world && this.world.backgroundSound) {
      this.world.backgroundSound.muted = this.isMuted;

      if (this.isMuted) {
        this.world.backgroundSound.pause();
      } else {
        this.world.backgroundSound.play();
      }
    }
  }
}
