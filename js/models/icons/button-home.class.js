class ButtonHome extends DrawableObject {
  constructor() {
    super();

    this.loadImage("img/home.png");

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
      mouseY <= this.y + this.height &&
      this.world.character.energy <= 0 
    ) {
      this.world.startGame = false;
      this.world.resetGame()
      console.log("wurde gecklickt");
      
    }
  }
}