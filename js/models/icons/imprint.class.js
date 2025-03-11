class Imprint extends DrawableObject {
  constructor(world) {
    super();
    this.world = world;

    this.element = document.createElement("h2");
    this.element.textContent = "Imprint";
    this.element.style.position = "absolute";
 
    
    if (this.world.startGame) {
      this.element.style.display = "none";
      console.log("wurde auf non gesetzt ");
    }

    document.body.appendChild(this.element);

    this.updatePosition();

    this.element.addEventListener("click", this.onClick.bind(this));
    this.element.addEventListener("touchstart", this.onClick.bind(this), {
      passive: false,
    });

    this.element.addEventListener("mouseup", this.onRelease.bind(this));
    this.element.addEventListener("touchend", this.onRelease.bind(this));

    window.addEventListener("resize", this.updatePosition.bind(this));
  }

  world;

  updatePosition() {
    this.element.style.left = `${canvas.width * 0.05}px`;
    this.element.style.top = `${canvas.height * 0.05}px`;
  }

  onClick(event) {
    event.preventDefault();

    if (!this.world.startGame) {
      window.location.href = "imprint.html";
    }
  }

  onRelease(event) {
    event.preventDefault();
  }
}
