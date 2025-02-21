class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyborad;
  camera_x = 0;
  statusBar = new StatusBar();
  statusBarBottle = new StatusBarBottle();
  statusBarCoin = new StatusBarCoin();
  salsaStore = new SalsaStore();
  bottleSign  = new BottleSign ;
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
  }

  setWorld() {
    this.character.world = this;
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
      this.checkCollisionSalsaStore()
    }, 50);
  }

  checkThrowobjekt() {
    if (this.keyborad.D && this.bottleCount > 0 && !this.throwTimeout) {
      let xPosition;
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
      }, 500);
    }
  }

  checkCollision() {
    this.level.enemies.forEach((enemy) => {
      if (!enemy.enemyIsDead && this.character.isColliding(enemy)) {
        if (
          this.character.y + this.character.height - this.character.offset.bottom <
          enemy.y + enemy.offset.top + enemy.height / 4
        ) {
          enemy.hit();
        } else {
          this.character.hit();
          this.statusBar.setPercentage(this.character.energy);
        }
      }
    });
  }
  

  checkCollisionBottle() {
    this.throwableObjects.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy)) {
          enemy.hit();
          bottle.bottleIsBroken = true;
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
        this.statusBarCoin.setPercentage(this.CoinCount);
        const index = this.level.collectiblCoin.indexOf(collectiblCoin);
        if (index !== -1) {
          this.level.collectiblCoin.splice(index, 1);
        }
      }
    });
  }


  checkCollisionSalsaStore() {

   
    
    if (
        this.keyborad.DOWN  && 
        this.CoinCount > 0 &&
        this.bottleCount < 5 &&
        this.character.isColliding(this.salsaStore)
    ) {
        this.bottleCount++;
        this.statusBarBottle.setPercentage(this.bottleCount);
        this.CoinCount--;
        this.statusBarCoin.setPercentage(this.CoinCount);
    }
}


  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backroundObjeckt);

    this.addObjectsToMap(this.level.collectiblBottel);
    this.addObjectsToMap(this.level.collectiblCoin);
    this.addToMap(this.salsaStore);
    this.addToMap(this.bottleSign);
    // ------------Space for fixed object-------------

    this.addToMap(this.character);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.addToMap(this.statusBarBottle);
    this.addToMap(this.statusBarCoin);
    this.ctx.translate(this.camera_x, 0);
    this.ctx.translate(-this.camera_x, 0);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
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
}
