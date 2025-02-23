class MusicsMuteIcon extends MovableObject {
  mute = "img/Mute/3.png";
  nonMute = "img/Mute/4.png";
  isMuted = false;
  world;

  constructor() {
    super();

    this.loadImage(this.nonMute);

    this.x = 590;
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
   
    this.world.backgroundSound.muted = this.isMuted ? true : false;
    this.world.backgroundSound.pause()

  }
}
