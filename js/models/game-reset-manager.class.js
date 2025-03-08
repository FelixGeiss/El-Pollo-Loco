class GameResetManager {
    constructor(world) {
      this.world = world;
      
      
    }
  world;

  
    resetGame() {

 
      this.stopAllIntervals();
      this.resetCharacter();
      this.resetArrayElements(this.world.level.enemies, "resetEnemy");
      this.resetArrayElements(this.world.level.clouds, "reset");
      this.resetArrayElements(this.world.level.collectiblCoin, "reset");
      this.resetArrayElements(this.world.level.collectiblBottel, "reset");
      this.resetStatusBars();
      this.resetCounts();
      
     
      
    
    }
  
    resetCharacter() {
      this.world.character.resetCharacter();
      this.world.audioManager.snoreSound.stop();
    }
  
    resetArrayElements(array, resetMethod) {
      if (array && array.length > 0) {
        array.forEach((element) => {
          if (element[resetMethod]) {
            element[resetMethod]();
          }
        });
      }
    }
  
    resetStatusBars() {
      this.world.statusBar.setPercentage(100);
      this.world.statusBarBottle.setPercentage(0);
      this.world.statusBarCoin.setPercentage(0);
    }
  
    resetCounts() {
      this.world.throwableObjects = [];
      this.world.bottleCount = 0;
      this.world.CoinCount = 0;
    }
  
    stopAllIntervals() {
      this.world.Intervals.forEach((intervalId) => {
        clearInterval(intervalId);
      });
      this.world.Intervals = [];
    }
  }