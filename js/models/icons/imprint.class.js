class Imprint extends DrawableObject {
   

    constructor(world) {
      super();
      this.world = world;
      // Erstelle ein h2-Element
      this.element = document.createElement("h2");
      this.element.textContent = "Imprint";
      this.element.style.position = "absolute";
      this.element.style.cursor = "pointer";
      
      if (this.world.startGame) {
         this.element.style.display = "none";
         console.log("wurde auf non gesetzt ");
         
      }
    
     
  
      // Füge das Element zum Body hinzu
      document.body.appendChild(this.element);
  
      // Aktualisiere die Position
      this.updatePosition();
  
      // Event-Listener hinzufügen
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
      // Positioniere das Element relativ zur Canvas-Größe
      this.element.style.left = `${canvas.width * 0.05}px`;
      this.element.style.top = `${canvas.height * 0.05}px`;
    }
  
    onClick(event) {
      event.preventDefault();
  
      // Überprüfe, ob das Spiel noch nicht gestartet wurde
      if (!this.world.startGame) {
        window.location.href = "imprint.html";
      }
    }
  
    onRelease(event) {
      event.preventDefault();
    }
  }