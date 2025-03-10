class Imprint {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext("2d");
      this.text = "Imprint";
      this.fontSize = 20;
      this.fontFamily = "Arial";
      this.color = "#ffde59";
      this.setupEvents();
    }
  
    draw() {
      this.ctx.font = `${this.fontSize}px ${this.fontFamily}`;
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "bottom";
      this.ctx.fillStyle = this.color;
  
     
      const x = this.canvas.width / 2;
      const y = this.canvas.height - 10; 
      this.ctx.fillText(this.text, x, y);
  
     
      this.textArea = {
        x: x - this.ctx.measureText(this.text).width / 2, 
        y: y - this.fontSize, 
        width: this.ctx.measureText(this.text).width, 
        height: this.fontSize, 
      };
  
  
    }
  
    setupEvents() {
    
      this.canvas.addEventListener("click", (event) => this.handleClick(event));
      this.canvas.addEventListener("touchend", (event) => this.handleTouch(event));
    }
  
    handleClick(event) {
      const rect = this.canvas.getBoundingClientRect(); 
      const scaleX = this.canvas.width / rect.width;   
      const scaleY = this.canvas.height / rect.height; 
      const clickX = (event.clientX - rect.left) * scaleX; 
      const clickY = (event.clientY - rect.top) * scaleY;  
     
  
      if (this.isClickInsideText(clickX, clickY)) {
        window.location.href = "../imprint.html";
      } 
    }
  
    handleTouch(event) {
      const rect = this.canvas.getBoundingClientRect(); 
      const scaleX = this.canvas.width / rect.width;  
      const scaleY = this.canvas.height / rect.height;
  
      const touch = event.changedTouches[0];
      const touchX = (touch.clientX - rect.left) * scaleX;
      const touchY = (touch.clientY - rect.top) * scaleY;  
    
  
      if (this.isClickInsideText(touchX, touchY)) {
        window.location.href = "../imprint.html";
      } 
    }
  
    isClickInsideText(clickX, clickY) {
      return (
        clickX >= this.textArea.x &&
        clickX <= this.textArea.x + this.textArea.width &&
        clickY >= this.textArea.y &&
        clickY <= this.textArea.y + this.textArea.height
      );
    }
  }