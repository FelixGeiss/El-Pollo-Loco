class PlayGame extends MovableObject {
  world;
  constructor() {
    super();

    this.loadImage("img/play.png");

    this.x = 510;
    this.y = 20;
    this.width = 50;
    this.height = 50;
    canvas.addEventListener("click", this.onClick.bind(this));
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
      this.toggleGame();
    }
  }
  toggleGame() {
    this.world.startGame = true;
    this.world.startAllIntervals();
   
  }
}
