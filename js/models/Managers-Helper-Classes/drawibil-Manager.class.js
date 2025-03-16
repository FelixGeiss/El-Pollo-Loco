/**
 * Manages drawing operations within the game world.
 */
class DrawibilManager {
    /**
     * Creates an instance of DrawibilManager.
     * @param {Object} world - The game world object containing canvas, context, and game state.
     */
    constructor(world) {
      this.world = world;
    }
  
    /**
     * Draws the entire game scene including UI, level, start screen, and game over conditions.
     */
    draw() {
      this.clearCanvas();
      if (!this.world.startGame) {
        this.drawStartScreen();
      } else {
        this.drawGameLevel();
      }
      this.checkGameOver();
      this.checkVictory();
      this.drawUIElements();
      this.scheduleNextFrame();
    }
    
    /**
     * Clears the entire canvas.
     */
    clearCanvas() {
      this.world.ctx.clearRect(0, 0, this.world.canvas.width, this.world.canvas.height);
    }
    
    /**
     * Draws the start screen elements.
     */
    drawStartScreen() {
      this.drawStartObject();
      this.addToMap(this.world.instructionIcon);
    }
    
    /**
     * Draws the game level and adjusts the view.
     */
    drawGameLevel() {
      this.drawLevel();
      this.world.ctx.translate(-this.world.camera_x, 0);
      this.drawStatusbar();
    }
    
    /**
     * Checks if the game is over based on the character's energy and displays the game over screen.
     */
    checkGameOver() {
      if (this.world.character.energy <= 0 && this.world.startGame) {
        this.drawGameOver();
        this.addToMap(this.world.restartGameIcon);
        this.world.audioManager.backgroundSound.stop();
        this.world.resetManager.stopAllIntervals();
      }
    }
    
    /**
     * Checks if the enemy boss is dead and, if so, displays the victory screen.
     */
    checkVictory() {
      if (this.world.enbossIsDead) {
        this.addToMap(this.world.youWon);
        this.addToMap(this.world.restartGameIcon);
        this.world.resetManager.stopAllIntervals();
        this.world.audioManager.backgroundSound.stop()
      }
    }
    
    /**
     * Draws UI elements such as mute icons, mobile controls, and an imprint if necessary.
     */
    drawUIElements() {
      this.addToMap(this.world.SoundsMuteIcon);
      this.addToMap(this.world.musicMuteIcon);
      this.drawMobileMovement();
      this.world.ctx.translate(this.world.camera_x, 0);
      this.world.ctx.translate(-this.world.camera_x, 0);
      if (!this.world.startGame) {
        this.addToMap(this.world.imprint);
      }
    }
    
    /**
     * Schedules the next animation frame and starts background sound if the game is active.
     */
    scheduleNextFrame() {
      requestAnimationFrame(() => this.draw());
      if (this.world.startGame) {
        this.world.audioManager.startBackroundsound();
        this.addToMap(this.world.buttonHome);
      }
    }
    
    /**
     * Draws the game level, including background objects, collectibles, enemies, and the character.
     */
    drawLevel() {
      this.world.ctx.translate(this.world.camera_x, 0);
      this.addObjectsToMap(this.world.level.backroundObjeckt);
      this.addObjectsToMap(this.world.level.collectiblBottel);
      this.addObjectsToMap(this.world.level.collectiblCoin);
      this.addToMap(this.world.salsaStore);
      this.addToMap(this.world.character);
      this.addObjectsToMap(this.world.level.clouds);
      this.addObjectsToMap(this.world.level.enemies);
      this.addObjectsToMap(this.world.throwableObjects);
    }
  
    /**
     * Draws mobile movement controls if the game runs on a small screen.
     */
    drawMobileMovement() {
      if (
        (this.world.startGame && window.innerWidth < 900) ||
        (this.world.startGame && window.innerWidth < 1060 && window.innerHeight < 1369)
      ) {
        this.addToMap(this.world.moveRaight);
        this.addToMap(this.world.moveLeft);
        this.addToMap(this.world.jump);
        this.addToMap(this.world.buy);
        this.addToMap(this.world.attack);
      }
    }
  
    /**
     * Draws status bars for health, bottles, and coins.
     */
    drawStatusbar() {
      this.addToMap(this.world.statusBar);
      this.addToMap(this.world.statusBarBottle);
      this.addToMap(this.world.statusBarCoin);
    }
  
    /**
     * Draws the start screen objects.
     */
    drawStartObject() {
      this.addToMap(this.world.startscreen);
      this.addToMap(this.world.playGame);
      this.world.showStartscreen = true;
    }
  
    /**
     * Draws the game over screen.
     */
    drawGameOver() {
      this.addToMap(this.world.gameOver);
    }
  
    /**
     * Adds a map object to the canvas and draws it. Flips the image if required.
     * @param {Object} mo - The map object to be drawn.
     */
    addToMap(mo) {
      if (mo.otherDirektion) {
        this.flipImage(mo);
      }
      mo.draw(this.world.ctx);
      if (mo.otherDirektion) {
        mo.x *= -1;
        this.world.ctx.restore();
      }
    }
  
    /**
     * Flips a map object's image horizontally.
     * @param {Object} mo - The map object whose image will be flipped.
     */
    flipImage(mo) {
      this.world.ctx.save();
      this.world.ctx.translate(mo.width, 0);
      this.world.ctx.scale(-1, 1);
      mo.x *= -1;
    }
  
    /**
     * Adds multiple map objects to the canvas.
     * @param {Object[]} objects - An array of map objects to be drawn.
     */
    addObjectsToMap(objects) {
      objects.forEach((o) => this.addToMap(o));
    }
  }
  