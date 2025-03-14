/**
 * Manages the entire game world, including character, level, audio, collisions, and rendering.
 */
class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  startGame = false;
  Intervals = [];
  showStartscreen = true;
  throwableObjects = [];
  bottleCount = 0;
  CoinCount = 0;
  throwTimeout = false;

  /**
   * Handles all game audio, including sound effects and background music.
   * @type {AudioManager}
   */
  audioManager = new AudioManager();
  resetManager;
  collisonManager;
  imprint = new Imprint();
  SoundsMuteIcon = new SoundsMuteIcon();
  musicMuteIcon = new MusicsMuteIcon();
  instructionIcon = new InstructionIcon();
  buttonHome = new HomeIcon();
  playGame = new PlayGameIcon();
  startscreen = new Startscreen();
  gameOver = new GameOver();
  youWon = new YouWon();

  moveRaight = new MoveRaight();
  moveLeft = new MoveLeft();
  jump = new Jump();
  buy = new Buy();
  attack = new Attack();

  salsaStore = new SalsaStore();
  statusBar = new StatusBar();
  statusBarBottle = new StatusBarBottle();
  statusBarCoin = new StatusBarCoin();

  /**
   * Creates a new World instance, sets up rendering, event loops, intervals, and managers.
   * @param {HTMLCanvasElement} canvas - The canvas element to render on.
   * @param {Object} keyboard - An object tracking key states.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
    this.pushInterval();
    this.stopAllIntervals();
    this.initializeManager();
  }

  /**
   * Initializes managers for game reset and collision checking.
   */
  initializeManager() {
    this.resetManager = new GameResetManager(this);
    this.collisonManager = new CollisonManager(this);
  }

  /**
   * Assigns this World instance to various objects so they can reference it.
   */
  setWorld() {
    this.character.world = this;
    this.SoundsMuteIcon.world = this;
    this.musicMuteIcon.world = this;
    this.playGame.world = this;
    this.buttonHome.world = this;
    this.moveRaight.world = this;
    this.moveLeft.world = this;
    this.jump.world = this;
    this.buy.world = this;
    this.attack.world = this;
    this.instructionIcon.world = this;
    this.imprint.world = this;
  }

  /**
   * Runs the main game loop, continuously checking for collisions and other game interactions.
   */
  run() {
    setInterval(() => {
      this.collisonManager.checkCollision();
      this.collisonManager.checkThrowobjekt();
      this.collisonManager.checkCollisionBottle();
      this.collisonManager.checkCollisionEndbos();
      this.collisonManager.checkbottleIsBroken();
      this.collisonManager.checkCollisionBottleCollectib();
      this.collisonManager.checkCollisionCoinCollectib();
      this.collisonManager.checkCollisionSalsaStore();
      this.collisonManager.checkCollisionButtonToMouse();
    }, 1);
  }

  /**
   * Collects enemy movement intervals so they can be controlled later.
   */
  pushInterval() {
    this.level.enemies.forEach((enemy) => {
      if (enemy.moveInterval) {
        this.Intervals.push(enemy.moveInterval);
      }
    });
  }

  /**
   * Starts intervals for enemies, clouds, coins, and the character if the game has begun.
   */
  startAllIntervals() {
    if (this.startGame) {
      this.level.enemies.forEach((enemy) => {
        enemy.moveEnemie();
        this.Intervals.push(enemy.moveInterval);
      });
      if (this.startGame) {
        this.level.clouds.forEach((cloud) => {
          this.Intervals.push(cloud.animationInterval);
        });
      }
      if (this.startGame) {
        this.level.collectiblCoin.forEach((coin) => {
          this.Intervals.push(coin.animationInterval);
        });
      }
      this.Intervals.push(this.character.moveIntervall);
      this.Intervals.push(this.character.characterInterval);
    }
  }

  /**
   * Stops all intervals currently stored in the Intervals array.
   */
  stopAllIntervals() {
    this.Intervals.forEach((intervalId) => {
      clearInterval(intervalId);
    });
    this.Intervals = [];
  }

  /**
   * Checks if the player can throw a bottle by verifying key input, inventory, and timeout.
   * @returns {boolean} True if a bottle can be thrown, otherwise false.
   */
  canThrowBottle() {
    return this.keyboard.D && this.bottleCount > 0 && !this.throwTimeout;
  }

  /**
   * Executes the steps needed to throw a bottle and updates relevant properties.
   */
  prepareThrow() {
    this.audioManager.snoreSound.stop();
    this.character.stopTimer();
    const xPosition = this.calculateXPosition();
    this.createBottle(xPosition);
    this.updateBottleCount();
    this.setThrowTimeout();
  }

  /**
   * Calculates the X position from which a bottle should be thrown based on the character's direction.
   * @returns {number} The calculated X position.
   */
  calculateXPosition() {
    return this.character.otherDirektion ? this.character.x - 50 : this.character.x + 100;
  }

  /**
   * Creates a new bottle at the specified X position and adds it to the list of throwable objects.
   * @param {number} xPosition - The X position for the new bottle.
   */
  createBottle(xPosition) {
    const bottle = new Throwableobject(xPosition, this.character.y + 100, this.character.otherDirektion);
    this.throwableObjects.push(bottle);
  }

  /**
   * Decrements the bottle count and updates the corresponding status bar.
   */
  updateBottleCount() {
    this.bottleCount--;
    this.statusBarBottle.setPercentage(this.bottleCount);
  }

  /**
   * Sets a timeout to prevent immediate successive bottle throws.
   */
  setThrowTimeout() {
    this.throwTimeout = true;
    setTimeout(() => {
      this.throwTimeout = false;
      this.audioManager.throwSound.play();
    }, 500);
  }

  /**
   * The recurring draw loop for all game objects, managing camera translation and fixed UI elements.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (!this.startGame) {
      this.drawStartObject();
      this.addToMap(this.instructionIcon);
    }
    if (this.startGame) {
      this.drawLevel();
    }
    if (this.startGame) {
      this.ctx.translate(-this.camera_x, 0);
      this.drawStatusbar();
    }
    if (this.character.energy <= 0 && this.startGame) {
      this.drawGameOver();
    }
    if (this.enbossIsDead) {
      this.addToMap(this.youWon);
    }
    this.addToMap(this.SoundsMuteIcon);
    this.addToMap(this.musicMuteIcon);
    this.drawMobileMovement();
    this.ctx.translate(this.camera_x, 0);
    this.ctx.translate(-this.camera_x, 0);
    if (!this.startGame) {
      this.addToMap(this.imprint);
    }
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
    if (this.startGame) {
      this.startBackroundsound();
      this.addToMap(this.buttonHome);
    }
  }

  /**
   * Draws the game level, including the background, collectibles, enemies, and the character.
   */
  drawLevel() {
    return (
      this.ctx.translate(this.camera_x, 0),
      this.addObjectsToMap(this.level.backroundObjeckt),
      this.addObjectsToMap(this.level.collectiblBottel),
      this.addObjectsToMap(this.level.collectiblCoin),
      this.addToMap(this.salsaStore),
      this.addToMap(this.character),
      this.addObjectsToMap(this.level.clouds),
      this.addObjectsToMap(this.level.enemies),
      this.addObjectsToMap(this.throwableObjects)
    );
  }

  /**
   * Draws mobile movement controls if the game is running on a small screen.
   */
  drawMobileMovement() {
    if (this.startGame && window.innerWidth < 900) {
      this.addToMap(this.moveRaight);
      this.addToMap(this.moveLeft);
      this.addToMap(this.jump);
      this.addToMap(this.buy);
      this.addToMap(this.attack);
    }
  }

  /**
   * Draws the status bars for game elements like health, bottles, and coins.
   */
  drawStatusbar() {
    return (
      this.addToMap(this.statusBar),
      this.addToMap(this.statusBarBottle),
      this.addToMap(this.statusBarCoin)
    );
  }

  /**
   * Draws the start screen objects.
   */
  drawStartObject() {
    this.addToMap(this.startscreen);
    this.addToMap(this.playGame);
    this.showStartscreen = true;
  }

  /**
   * Draws the game over screen.
   */
  drawGameOver() {
    this.addToMap(this.gameOver);
  }

  /**
   * Adds multiple objects to the map.
   * @param {Array} objects - An array of objects to add.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Adds a drawable object to the map, handling image flipping if necessary.
   * @param {DrawableObject} mo - The drawable object.
   */
  addToMap(mo) {
    if (mo.otherDirektion) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    if (mo.otherDirektion) {
      mo.x = mo.x * -1;
      this.ctx.restore();
    }
  }

  /**
   * Flips the image of a drawable object horizontally.
   * @param {DrawableObject} mo - The drawable object.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Starts the background sound if music is not muted.
   */
  startBackroundsound() {
    let storedMuteStatus = localStorage.getItem("MusikMute");
    if (storedMuteStatus === null) {
      localStorage.setItem("MusikMute", "false");
      storedMuteStatus = "false";
    }
    if (storedMuteStatus === "false") {
      this.audioManager.backgroundSound.play();
    }
  }
}
