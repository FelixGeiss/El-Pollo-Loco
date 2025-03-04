class PlayGame extends DrawableObject {
  world;

  constructor() {
    super();

    this.loadImage("img/play.png");

    this.x = 510;
    this.y = 20;
    this.width = 50;
    this.height = 50;

    canvas.addEventListener("click", this.onClick.bind(this));
    canvas.addEventListener("touchstart", this.onClick.bind(this), { passive: false });
    canvas.addEventListener("mousemove", this.onMouseMove.bind(this));
  }

  onMouseMove(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    if (
      mouseX >= this.x &&
      mouseX <= this.x + this.width &&
      mouseY >= this.y &&
      mouseY <= this.y + this.height &&
      !this.world.startGame
    ) {
      canvas.style.cursor = "pointer";
    } else {
      canvas.style.cursor = "default";
    }
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
      mouseX >= this.x &&
      mouseX <= this.x + this.width &&
      mouseY >= this.y &&
      mouseY <= this.y + this.height 
    ) {
      this.toggleGame();
    }
  }

  toggleGame() {
    this.world.startGame = true;
    this.world.startAllIntervals();
  }
}
