class SoundsMuteIcon extends MovableObject {
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


    canvas.addEventListener('click', this.onClick.bind(this));
  }

  onClick(event) {

    const rect = canvas.getBoundingClientRect();

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;


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
   
    this.world.jumpSound.muted = this.isMuted ? true : false;
    this.world.coinSound.muted       = this.isMuted ? true : false;
    this.world.snoreSound.muted      = this.isMuted ? true : false;
    this.world.bottleBrokenSound.muted  = this.isMuted ? true : false;
    this.world.bottleCollectSound.muted = this.isMuted ? true : false;
    this.world.chickenHitSound.muted    = this.isMuted ? true : false;
    this.world.characterHitSound.muted  = this.isMuted ? true : false;
    this.world.buySound.muted        = this.isMuted ? true : false;
    this.world.throwSound.muted      = this.isMuted ? true : false;
    


  }
}
