class MoveRaight extends DrawableObject {

   
    constructor() {
        super();
    
        this.loadImage("img/movement/arrow-right.png");
    
        this.updatePosition(); 
        this.width = 50;
        this.height = 50;
    
     
        canvas.addEventListener("click", this.onClick.bind(this));
        canvas.addEventListener("touchstart", this.onClick.bind(this), { passive: false });
    
       
        canvas.addEventListener("mouseup", this.onRelease.bind(this));
        canvas.addEventListener("touchend", this.onRelease.bind(this));
    
        
        window.addEventListener("resize", this.updatePosition.bind(this)); 
    }
    
    updatePosition() {
        this.x = canvas.width * 0.90; 
        this.y = canvas.height * 0.85; 
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
            mouseX >= this.x && mouseX <= this.x + this.width &&
            mouseY >= this.y && mouseY <= this.y + this.height
        ) {
            
            this.world.keyboard.RIGHT = true;
        }
    }
    
    onRelease(event) {
        event.preventDefault();
    
    
        this.world.keyboard.RIGHT = false;
    }
  }