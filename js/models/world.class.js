/**
 * Manages the entire game world, including character, level, audio, collisions, and rendering.
 *
 * @class World
 */
class World {
  /**
   * The main character of the game.
   * @type {Character}
   */
  character = new Character();

  /**
   * The level configuration for the game.
   * @type {Level}
   */
  level = level1;

  /**
   * The HTML canvas element used for rendering.
   * @type {HTMLCanvasElement}
   */
  canvas;

  /**
   * The 2D drawing context of the canvas.
   * @type {CanvasRenderingContext2D}
   */
  ctx;

  /**
   * Object tracking keyboard input states.
   * @type {Object}
   */
  keyboard;

  /**
   * Horizontal camera offset for scrolling effects.
   * @type {number}
   */
  camera_x = 0;

  /**
   * Flag indicating if the game has started.
   * @type {boolean}
   */
  startGame = false;

  /**
   * Array of interval IDs used for game loops and animations.
   * @type {number[]}
   */
  Intervals = [];

  /**
   * Flag to determine if the start screen should be displayed.
   * @type {boolean}
   */
  showStartscreen = true;

  /**
   * Array containing objects that the character can throw.
   * @type {Array<Throwableobject>}
   */
  throwableObjects = [];

  /**
   * The current count of bottles available to throw.
   * @type {number}
   */
  bottleCount = 0;

  /**
   * The current count of coins collected.
   * @type {number}
   */
  CoinCount = 0;

  /**
   * Flag to prevent immediate successive bottle throws.
   * @type {boolean}
   */
  throwTimeout = false;

  /**
   * Manages all game audio, including sound effects and background music.
   * @type {AudioManager}
   */

  resetManager;
  collisonManager;
  imprint = new Imprint();
  SoundsMuteIcon = new SoundsMuteIcon();
  musicMuteIcon = new MusicsMuteIcon();
  instructionIcon = new InstructionIcon();
  buttonHome = new HomeIcon();
  playGame = new PlayGameIcon();
  restartGameIcon = new RestartGameIcon();
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
    this.setWorld();
    this.run();
    this.pushInterval();
    this.stopAllIntervals();
    this.initializeManager();
    this.drawibilManager.draw();
  }

  /**
   * Initializes managers for game reset, collision detection, audio, and drawing.
   */
  initializeManager() {
    this.resetManager = new GameResetManager(this);
    this.collisonManager = new CollisonManager(this);
    this.audioManager = new AudioManager(this);
    this.drawibilManager = new DrawibilManager(this);
  }

  /**
 * Assigns this World instance to various game objects so they can access global properties.
 */
setWorld() {
  this.character.world = this;
  this.SoundsMuteIcon.world = this;
  this.musicMuteIcon.world = this;
  this.playGame.world = this;
  this.buttonHome.world = this;
  this.instructionIcon.world = this;
  this.imprint.world = this;
  this.restartGameIcon.world = this;
  this.setWorldMobileIcon();
}

/**
 * Assigns this World instance to mobile-specific game objects so they can access global properties.
 */
setWorldMobileIcon() {
  this.buy.world = this;
  this.attack.world = this;
  this.jump.world = this;
  this.moveRaight.world = this;
  this.moveLeft.world = this;
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
   * Collects enemy movement intervals so they can be managed later.
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
      this.level.clouds.forEach((cloud) => {
        this.Intervals.push(cloud.animationInterval);
      });
      this.level.collectiblCoin.forEach((coin) => {
        this.Intervals.push(coin.animationInterval);
      });
      this.Intervals.push(this.character.moveIntervall);
      this.Intervals.push(this.character.characterInterval);
    }
  }

  /**
   * Stops all intervals currently stored in the Intervals array.
   */
  stopAllIntervals() {
    this.Intervals.forEach((intervalId) => clearInterval(intervalId));
    this.Intervals = [];
  }

  /**
   * Checks if the player can throw a bottle by verifying key input, inventory, and timeout.
   * @returns {boolean} True if a bottle can be thrown; otherwise, false.
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
   * Calculates the X position for throwing a bottle based on the character's direction.
   * @returns {number} The calculated X position.
   */
  calculateXPosition() {
    return this.character.otherDirektion
      ? this.character.x - 50
      : this.character.x + 100;
  }

  /**
   * Creates a new bottle at the specified X position and adds it to the throwable objects.
   * @param {number} xPosition - The X position for the new bottle.
   */
  createBottle(xPosition) {
    const bottle = new Throwableobject(
      xPosition,
      this.character.y + 100,
      this.character.otherDirektion
    );
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
}
