class ButtonHome extends DrawableObject {
  constructor() {
    super();

    this.loadImage("img/home.png");

    this.x = 510;
    this.y = 20;
    this.width = 50;
    this.height = 50;

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
      mouseX >= this.x &&
      mouseX <= this.x + this.width &&
      mouseY >= this.y &&
      mouseY <= this.y + this.height &&
      this.world.character.energy <= 0 
    ) {
      this.world.startGame = false;
      this.world.resetGame();
      console.log("Button wurde geklickt/getippt");
    }
  }
}
