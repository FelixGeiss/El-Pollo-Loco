class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyborad;
  camera_x = 0;
  startGame = false;
  Intervals = [];
  showGameOver = false;

  audioManager = new AudioManager();
  resetManager;

  SoundsMuteIcon = new SoundsMuteIcon();
  musicMuteIcon = new MusicsMuteIcon();
  buttonHome = new ButtonHome();

  salsaStore = new SalsaStore();
  bottleSign = new BottleSign();
  startscreen = new Startscreen();
  gameOver = new GameOver();
  playGame = new PlayGame();

  moveRaight = new MoveRaight();
  moveLeft = new MoveLeft();
  jump = new Jump();
  buy = new Buy();
  attack = new Attack();

  // Statusbar
  statusBar = new StatusBar();
  statusBarBottle = new StatusBarBottle();
  statusBarCoin = new StatusBarCoin();

  throwableObjects = [];
  bottleCount = 0;
  CoinCount = 0;
  throwTimeout = false;

  constructor(canvas, keyborad) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyborad = keyborad;

    this.draw();
    this.setWorld();

    this.run();
    this.pushInterval();
    this.stopAllIntervals();

    this.initializeResetManager();
  }
  initializeResetManager() {
    this.resetManager = new GameResetManager(this);
  }
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
  }

  run() {
    setInterval(() => {
      this.checkCollision();
      this.checkThrowobjekt();
      this.checkCollisionBottle();
      this.checkCollisionEndbos();
      this.checkbottleIsBroken();
      this.checkCollisionBottleCollectib();
      this.checkCollisionCoinCollectib();
      this.checkCollisionSalsaStore();
    }, 50);
  }

  pushInterval() {
    this.level.enemies.forEach((enemy) => {
      if (enemy.moveInterval) {
        this.Intervals.push(enemy.moveInterval);
      }
    });
  }

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

  stopAllIntervals() {
    this.Intervals.forEach((intervalId) => {
      clearInterval(intervalId);
    });
    this.Intervals = [];
  }

  checkThrowobjekt() {
    if (this.canThrowBottle()) {
      this.prepareThrow();
    }
  }

  canThrowBottle() {
    return this.keyborad.D && this.bottleCount > 0 && !this.throwTimeout;
  }

  prepareThrow() {
    this.audioManager.snoreSound.stop();
    this.character.stopTimer();
    const xPosition = this.calculateXPosition();
    this.createBottle(xPosition);
    this.updateBottleCount();
    this.setThrowTimeout();
  }

  calculateXPosition() {
    return this.character.otherDirektion
      ? this.character.x - 50
      : this.character.x + 100;
  }

  createBottle(xPosition) {
    const bottle = new Throwableobject(
      xPosition,
      this.character.y + 100,
      this.character.otherDirektion
    );
    this.throwableObjects.push(bottle);
  }

  updateBottleCount() {
    this.bottleCount--;
    this.statusBarBottle.setPercentage(this.bottleCount);
  }

  setThrowTimeout() {
    this.throwTimeout = true;
    setTimeout(() => {
      this.throwTimeout = false;
      this.audioManager.throwSound.play();
    }, 500);
  }

  checkCollision() {
    this.level.enemies.forEach((enemy) => {
      if (!enemy.enemyIsDead && this.character.isColliding(enemy)) {
        if (
          this.character.y +
            this.character.height -
            this.character.offset.bottom <
          enemy.y + enemy.offset.top + enemy.height / 3
        ) {
          enemy.hit();
          this.audioManager.chickenHitSound.play();
        } else if (this.character.energy > 0) {
          this.audioManager.characterHitSound.play();
          this.character.hit();
          this.character.x = this.character.x - 40;

          console.log(this.character);

          this.statusBar.setPercentage(this.character.energy);
        }
      }
    });
  }

  checkCollisionBottle() {
    this.throwableObjects.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        if (!enemy.enemyIsDead && bottle.isColliding(enemy)) {
          enemy.hit();
          this.audioManager.chickenHitSound.play();
          bottle.bottleIsBroken = true;
          this.audioManager.throwSound.stop();
        }
      });
    });
  }

  checkCollisionEndbos() {
    let endboss = this.level.enemies.find((enemy) => enemy instanceof Endboss);

    if (endboss) {
      if (this.character.isColliding(endboss)) {
        endboss.isAttack = true;
      } else {
        endboss.isAttack = false;
      }
    }
  }

  checkbottleIsBroken() {
    this.throwableObjects.forEach((bottle) => {
      if (bottle.bottleIsBroken) {
        this.audioManager.throwSound.stop();
        this.audioManager.bottleBrokenSound.play();

        const index = this.throwableObjects.indexOf(bottle);
        if (index !== -1) {
          this.throwableObjects.splice(index, 1);
        }
      }
    });
  }

  checkCollisionBottleCollectib() {
    this.level.collectiblBottel.forEach((collectiblBottl) => {
      if (this.character.isColliding(collectiblBottl) && this.bottleCount < 5) {
        this.bottleCount++;
        this.audioManager.bottleCollectSound.play();
        this.statusBarBottle.setPercentage(this.bottleCount);
        const index = this.level.collectiblBottel.indexOf(collectiblBottl);
        if (index !== -1) {
          this.level.collectiblBottel.splice(index, 1);
        }
      }
    });
  }
  checkCollisionCoinCollectib() {
    this.level.collectiblCoin.forEach((collectiblCoin) => {
      if (this.character.isColliding(collectiblCoin) && this.CoinCount < 5) {
        this.CoinCount++;
        this.audioManager.coinSound.play();
        this.statusBarCoin.setPercentage(this.CoinCount);
        const index = this.level.collectiblCoin.indexOf(collectiblCoin);
        if (index !== -1) {
          this.level.collectiblCoin.splice(index, 1);
        }
      }
    });
  }

  checkCollisionSalsaStore() {
    const now = Date.now();
    if (this.lastPurchaseTime && now - this.lastPurchaseTime < 500) {
      return;
    }

    if (
      this.keyborad.DOWN &&
      this.CoinCount > 0 &&
      this.bottleCount < 5 &&
      this.character.isColliding(this.salsaStore)
    ) {
      this.lastPurchaseTime = now;
      this.bottleCount++;
      this.statusBarBottle.setPercentage(this.bottleCount);
      this.CoinCount--;
      this.statusBarCoin.setPercentage(this.CoinCount);
      this.audioManager.buySound.play();
    }
  }
 
  draw() {
     

    console.log(this.startGame);
    

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (!this.startGame) {
      this.drawStartObject();
    }

    if (this.startGame) {
      this.drawLevel();
    }

    // ------------Space for fixed object-------------

    if (this.startGame) {
      this.ctx.translate(-this.camera_x, 0);
      this.drawStatusbar();
    }
    if (this.character.energy <= 0 && this.startGame) {
      this.drawGameOver();
      this.showGameOver = true;
    }
    this.addToMap(this.SoundsMuteIcon);
    this.addToMap(this.musicMuteIcon);

    this.drawMobileMovement();

    this.ctx.translate(this.camera_x, 0);
    this.ctx.translate(-this.camera_x, 0);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });

    if (this.startGame) {
      this.startBackroundsound();
    }
  }

  drawLevel() {
    return (
      this.ctx.translate(this.camera_x, 0),
      this.addObjectsToMap(this.level.backroundObjeckt),
      this.addObjectsToMap(this.level.collectiblBottel),
      this.addObjectsToMap(this.level.collectiblCoin),
      this.addToMap(this.salsaStore),
      this.addToMap(this.bottleSign),
      this.addToMap(this.character),
      this.addObjectsToMap(this.level.clouds),
      this.addObjectsToMap(this.level.enemies),
      this.addObjectsToMap(this.throwableObjects)
    );
  }
  drawMobileMovement() {
    if (this.startGame && window.innerWidth < 768) {
      this.addToMap(this.moveRaight);
      this.addToMap(this.moveLeft);
      this.addToMap(this.jump);
      this.addToMap(this.buy);
      this.addToMap(this.attack);
    }
  }
  drawStatusbar() {
    return (
      this.addToMap(this.statusBar),
      this.addToMap(this.statusBarBottle),
      this.addToMap(this.statusBarCoin)
    );
  }

  drawStartObject() {
    this.addToMap(this.startscreen);
    this.addToMap(this.playGame);
    this.showGameOver = false;
  }

  drawGameOver() {
    this.addToMap(this.gameOver);
    this.addToMap(this.buttonHome);
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirektion) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);
    mo.drawBorder(this.ctx);

    if (mo.otherDirektion) {
      mo.x = mo.x * -1;
      this.ctx.restore();
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

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
