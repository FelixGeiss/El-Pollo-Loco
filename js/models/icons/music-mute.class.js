class MusicsMuteIcon extends DrawableObject {
  mute = "img/Mute/3.png";
  nonMute = "img/Mute/4.png";
  isMuted = false;
  world;

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

  updatePosition() {
    this.x = canvas.width * 0.8; 
    this.y = canvas.height * 0.05; 
  }

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