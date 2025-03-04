class SoundsMuteIcon extends DrawableObject {
  mute = "img/Mute/2.png";
  nonMute = "img/Mute/1.png";
  isMuted = false;
  world;

  constructor() {
    super();

    this.loadImage(this.nonMute);
    this.x = 650;
    this.y = 20;
    this.width = 50;
    this.height = 50;

    const storedSoundStatus = localStorage.getItem("soundMuted");
    if (storedSoundStatus === "true") {
      this.isMuted = true;
      this.loadImage(this.mute);
    }

    this.muteSound();

    canvas.addEventListener("click", this.onClick.bind(this));
    canvas.addEventListener("mousemove", this.onMouseMove.bind(this));
  }
  muteSound() {
    if (this.world) {
      this.world.jumpSound.setMute(true);
      this.world.coinSound.setMute(true);
      this.world.snoreSound.setMute(true);
      this.world.bottleBrokenSound.setMute(true);
      this.world.bottleCollectSound.setMute(true);
      this.world.chickenHitSound.setMute(true);
      this.world.characterHitSound.setMute(true);
      this.world.buySound.setMute(true);
      this.world.throwSound.setMute(true);
    }
  }

  onMouseMove(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    if (
      mouseX >= this.x &&
      mouseX <= this.x + this.width &&
      mouseY >= this.y &&
      mouseY <= this.y + this.height
    ) {
      canvas.style.cursor = "pointer";
    } else {
      canvas.style.cursor = "default";
    }
  }

  onClick(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

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

    if (this.world) {
      this.world.jumpSound.setMute(this.isMuted);
      this.world.coinSound.setMute(this.isMuted);
      this.world.snoreSound.setMute(this.isMuted);
      this.world.bottleBrokenSound.setMute(this.isMuted);
      this.world.bottleCollectSound.setMute(this.isMuted);
      this.world.chickenHitSound.setMute(this.isMuted);
      this.world.characterHitSound.setMute(this.isMuted);
      this.world.buySound.setMute(this.isMuted);
      this.world.throwSound.setMute(this.isMuted);
    }
  }
}
