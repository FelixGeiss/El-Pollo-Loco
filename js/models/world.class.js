class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyborad;
  camera_x = 0;
  startGame = false;
  Intervals = [];
  // Statusbar
  statusBar = new StatusBar();
  statusBarBottle = new StatusBarBottle();
  statusBarCoin = new StatusBarCoin();

  // Audio
  jumpSound = new PlayAudio("audio/jumppp11.ogg", false, 1);
  coinSound = new PlayAudio("audio/coin.mp3", false, 1);
  snoreSound = new PlayAudio("audio/big-snore.mp3", true, 1);
  bottleBrokenSound = new PlayAudio("audio/bottle-broken.mp3", false, 1, false);
  bottleCollectSound = new PlayAudio(
    "audio/glass-clinking.mp3",
    false,
    1,
    false
  );
  chickenHitSound = new PlayAudio("audio/chicken-hit.mp3", false, 1, false);
  characterHitSound = new PlayAudio("audio/hit.mp3", false, 1, false);
  buySound = new PlayAudio("audio/buy.mp3", false, 1, false);
  throwSound = new PlayAudio("audio/throw.mp3", false, 1, false);
  backgroundSound = new PlayAudio("audio/level-ix-211054.mp3", true, 0.8, true);
  SoundsMuteIcon = new SoundsMuteIcon();
  musicMuteIcon = new MusicsMuteIcon();
  salsaStore = new SalsaStore();
  bottleSign = new BottleSign();
  startscreen = new Startscreen();
  gameOver = new GameOver();
  playGame = new PlayGame();
  buttonHome = new ButtonHome();

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
    console.log(this.level);
    
  }

  setWorld() {
    this.character.world = this;
    this.SoundsMuteIcon.world = this;
    this.musicMuteIcon.world = this;
    this.playGame.world = this;
    this.buttonHome.world = this;
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
    console.log(this.Intervals,"intervale");
  }


  stopAllIntervals() {
    this.Intervals.forEach((intervalId) => {
      clearInterval(intervalId);
    });
    this.Intervals = [];
    console.log(this.Intervals , "home wurde geklickt " );
    
  }

  checkThrowobjekt() {
    if (this.keyborad.D && this.bottleCount > 0 && !this.throwTimeout) {
      let xPosition;
      this.snoreSound.stop();
      this.character.stopTimer();
      if (this.character.otherDirektion) {
        xPosition = this.character.x - 50;
      } else {
        xPosition = this.character.x + 100;
      }

      let bottle = new Throwableobject(
        xPosition,
        this.character.y + 100,
        this.character.otherDirektion
      );

      this.bottleCount--;
      this.statusBarBottle.setPercentage(this.bottleCount);
      this.throwableObjects.push(bottle);

      this.throwTimeout = true;
      setTimeout(() => {
        this.throwTimeout = false;
        this.throwSound.play();
      }, 500);
    }
  }

  checkCollision() {
    this.level.enemies.forEach((enemy) => {
      if (!enemy.enemyIsDead && this.character.isColliding(enemy)) {
        if (
          this.character.y +
            this.character.height -
            this.character.offset.bottom <
          enemy.y + enemy.offset.top + enemy.height / 4
        ) {
          enemy.hit();
          this.chickenHitSound.play();
        } else {
          this.characterHitSound.play();
          this.character.hit();
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
          this.chickenHitSound.play();
          bottle.bottleIsBroken = true;
          this.throwSound.stop();
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
        this.throwSound.stop();
        this.bottleBrokenSound.play();

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
        this.bottleCollectSound.play();
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
        this.coinSound.play();
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
      // Zeitpunkt des Kaufs aktualisieren
      this.lastPurchaseTime = now;
      this.bottleCount++;
      this.statusBarBottle.setPercentage(this.bottleCount);
      this.CoinCount--;
      this.statusBarCoin.setPercentage(this.CoinCount);
      this.buySound.play();
    }
  }

  draw() {
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
    }
    this.addToMap(this.SoundsMuteIcon);
    this.addToMap(this.musicMuteIcon);

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
      this.backgroundSound.play();
    }
  }

  resetGame() {
    // 1. Stoppe alle Intervalle
    this.stopAllIntervals();

    // 2. Setze den Charakter zurück
    this.character.resetCharacter();

    // 3. Setze die Gegner zurück
    this.level.enemies.forEach((enemy) => {
      enemy.resetEnemy();
    });
    this.level.clouds.forEach((clouds) => {
      clouds.reset();
    });

    this.level.collectiblCoin.forEach((coin) => {
      coin.reset();
    });

    this.level.collectiblBottel.forEach((bottle) => {
      bottle.reset();
    });
    // 5. Setze die Statusleisten zurück
    this.statusBar.setPercentage(100); // Volle Energie
    this.statusBarBottle.setPercentage(0); // Keine Flaschen
    this.statusBarCoin.setPercentage(0); // Keine Münzen

    this.throwableObjects = [];
    this.bottleCount = 0;
    this.CoinCount = 0;

    this.startGame = false;
  }
}
