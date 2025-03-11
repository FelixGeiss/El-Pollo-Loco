class Jump extends DrawableObject {

    constructor() {
        super();
    
        this.loadImage("img/movement/arrow-up.png");
    
        this.updatePosition(); 
        this.width = 50;
        this.height = 50;
    
        canvas.addEventListener("touchstart", this.onTouchStart.bind(this), { passive: false });
        canvas.addEventListener("touchend", this.onTouchEnd.bind(this));
    
      
        window.addEventListener("resize", this.updatePosition.bind(this)); 
    }
    
    updatePosition() {
        this.x = canvas.width * 0.05; 
        this.y = canvas.height * 0.70; 
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
           
            this.world.keyboard.UP = true;
        }
    }
    
    onTouchEnd(event) {
        event.preventDefault();

        this.world.keyboard.UP = false;
    }
}