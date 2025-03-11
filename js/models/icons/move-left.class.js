class MoveLeft extends DrawableObject {

    constructor() {
        super();
    
        this.loadImage("img/movement/arrow-left.png");
    
        this.updatePosition(); 
        this.width = 50;
        this.height = 50;
    
     
        canvas.addEventListener("touchstart", this.onTouchStart.bind(this), { passive: false });
        canvas.addEventListener("touchend", this.onTouchEnd.bind(this));
    
 
        window.addEventListener("resize", this.updatePosition.bind(this)); 
    }
    
    updatePosition() {
        this.x = canvas.width * 0.70; 
        this.y = canvas.height * 0.85; 
    }
    
    onTouchStart(event) {
        event.preventDefault();
    
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width; 
        const scaleY = canvas.height / rect.height; 
    
        const touch = event.touches[0];
        const touchX = (touch.clientX - rect.left) * scaleX;
        const touchY = (touch.clientY - rect.top) * scaleY;
    
      
        if (
            touchX >= this.x && touchX <= this.x + this.width &&
            touchY >= this.y && touchY <= this.y + this.height
        ) {
            
            this.world.keyboard.LEFT = true;
        }
    }
    
    onTouchEnd(event) {
        event.preventDefault();
    
        // Bewegung nach links deaktivieren
        this.world.keyboard.LEFT = false;
    }
}