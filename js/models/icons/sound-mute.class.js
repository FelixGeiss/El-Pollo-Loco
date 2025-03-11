class SoundsMuteIcon extends DrawableObject {
  mute = "img/Mute/2.png";
  nonMute = "img/Mute/1.png";
  isMuted = false;
  world;

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

  updatePosition() {
    this.x = canvas.width * 0.90; 
    this.y = canvas.height * 0.05; 
  }

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
      mouseX >= this.x &&
      mouseX <= this.x + this.width &&
      mouseY >= this.y &&
      mouseY <= this.y + this.height
    ) {
      this.toggleSound();
    }
  }

  toggleSound() {
    this.isMuted = !this.isMuted;
    const newImage = this.isMuted ? this.mute : this.nonMute;
    this.loadImage(newImage);

    localStorage.setItem("soundMuted", this.isMuted.toString());

    this.muteSound(); 
  }
}