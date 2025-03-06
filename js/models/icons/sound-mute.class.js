class SoundsMuteIcon extends DrawableObject {
  mute = "img/Mute/2.png";
  nonMute = "img/Mute/1.png";
  isMuted = false;
  world;

  constructor() {
    super();

    this.loadImage(this.nonMute);
    this.updatePosition(); // Initiale Position setzen
    this.width = 50;
    this.height = 50;

    // Lade gespeicherten Mute-Status
    const storedSoundStatus = localStorage.getItem("soundMuted");
    if (storedSoundStatus === "true") {
      this.isMuted = true;
      this.loadImage(this.mute);
    }

    this.muteSound(); // Mute-Status anwenden

    // Event-Listener für Maus, Touch und Canvas-Größenänderung
    canvas.addEventListener("click", this.onClick.bind(this));
    canvas.addEventListener("touchstart", this.onClick.bind(this), { passive: false });
    canvas.addEventListener("mousemove", this.onMouseMove.bind(this));
    window.addEventListener("resize", this.updatePosition.bind(this)); // Bei Größenänderung anpassen
  }


  updatePosition() {
    this.x = canvas.width * 0.90; 
    this.y = canvas.height * 0.05; 
  }


  muteSound() {
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


  onMouseMove(event) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width; 
    const scaleY = canvas.height / rect.height; 

    let mouseX, mouseY;

    if (event.touches && event.touches.length > 0) {
      // Touch-Ereignis
      mouseX = (event.touches[0].clientX - rect.left) * scaleX;
      mouseY = (event.touches[0].clientY - rect.top) * scaleY;
    } else {
      // Mausklick-Ereignis
      mouseX = (event.clientX - rect.left) * scaleX;
      mouseY = (event.clientY - rect.top) * scaleY;
    }

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
    event.preventDefault();

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width; 
    const scaleY = canvas.height / rect.height; 
    let mouseX, mouseY;

    if (event.touches && event.touches.length > 0) {
      // Touch-Ereignis
      mouseX = (event.touches[0].clientX - rect.left) * scaleX;
      mouseY = (event.touches[0].clientY - rect.top) * scaleY;
    } else {
      // Mausklick-Ereignis
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