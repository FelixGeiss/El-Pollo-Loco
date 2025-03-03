class CollectiblBottel extends MovableObject {
  width = 70;
  height = 80;
  y = 340;

  constructor() {
    super().loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    this.offset.top = 10;
    this.offset.bottom = 5;
    this.offset.left = 25;
    this.offset.right = 10;
     this.x = 500 + Math.random() * (10050 - 500);
  }

  reset(){
    this.x = 500 + Math.random() * (10050 - 500);
   
  }
}
