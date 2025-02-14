class Level {
  enemies;
  clouds;
  backroundObjeckt;
  level_end_x = 13590;

  constructor(enemies, clouds, backroundObjeckt) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backroundObjeckt = backroundObjeckt;
    this.repetBackround()
  
  
  }

  repetBackround() {
    
    for (let index = 0; index < 20; index++) {
      let suffix = (index % 2 === 0) ? "1" : "2";
    
      this.backroundObjeckt.push(
        new BackgroundObjekt("img/5_background/layers/air.png", 719 * index),
        new BackgroundObjekt("img/5_background/layers/3_third_layer/" + suffix + ".png", 719 * index),
        new BackgroundObjekt("img/5_background/layers/2_second_layer/" + suffix + ".png", 719 * index),
        new BackgroundObjekt("img/5_background/layers/1_first_layer/" + suffix + ".png", 719 * index)
      );
    }
  }
  
 
}
