class CollisonManager {
    constructor(world) {
      this.world = world;
      
      
    }
  world;
  


  checkCollision() {
    this.world.level.enemies.forEach((enemy) => {
      if (!enemy.enemyIsDead && this.world.character.isColliding(enemy)) {
        if (
          this.world.character.y +
            this.world.character.height -
            this.world.character.offset.bottom <
          enemy.y + enemy.offset.top + enemy.height / 3
        ) {
          enemy.hit();
          this.world.audioManager.chickenHitSound.play();
        } else if (this.world.character.energy > 0) {
          this.world.audioManager.characterHitSound.play();
          this.world.character.hit();
          this.world.character.x = this.world.character.x - 40;

          this.world.statusBar.setPercentage(this.world.character.energy);
        }
      }
    });
  }

  checkCollisionBottle() {
    this.world.throwableObjects.forEach((bottle) => {
      this.world.level.enemies.forEach((enemy) => {
        if (!enemy.enemyIsDead && bottle.isColliding(enemy)) {
          enemy.hit();
          this.world.audioManager.chickenHitSound.play();
          bottle.bottleIsBroken = true;
          this.world.audioManager.throwSound.stop();
        }
      });
    });
  }

  checkCollisionEndbos() {
    let endboss = this.world.level.enemies.find((enemy) => enemy instanceof Endboss);

    if (endboss) {
      if (this.world.character.isColliding(endboss)) {
        endboss.isAttack = true;
      } else {
        endboss.isAttack = false;
      }
    }
  }

  checkbottleIsBroken() {
    this.world.throwableObjects.forEach((bottle) => {
      if (bottle.bottleIsBroken) {
        this.world.audioManager.throwSound.stop();
        this.world.audioManager.bottleBrokenSound.play();

        const index = this.world.throwableObjects.indexOf(bottle);
        if (index !== -1) {
          this.world.throwableObjects.splice(index, 1);
        }
      }
    });
  }

  checkCollisionBottleCollectib() {
    this.world.level.collectiblBottel.forEach((collectiblBottl) => {
      if (this.world.character.isColliding(collectiblBottl) && this.world.bottleCount < 5) {
        this.world.bottleCount++;
        this.world.audioManager.bottleCollectSound.play();
        this.world.statusBarBottle.setPercentage(this.world.bottleCount);
        const index = this.world.level.collectiblBottel.indexOf(collectiblBottl);
        if (index !== -1) {
          this.world.level.collectiblBottel.splice(index, 1);
        }
      }
    });
  }
  checkCollisionCoinCollectib() {
    this.world.level.collectiblCoin.forEach((collectiblCoin) => {
      if (this.world.character.isColliding(collectiblCoin) && this.world.CoinCount < 5) {
        this.world.CoinCount++;
        this.world.audioManager.coinSound.play();
        this.world.statusBarCoin.setPercentage(this.world.CoinCount);
        const index = this.world.level.collectiblCoin.indexOf(collectiblCoin);
        if (index !== -1) {
          this.world.level.collectiblCoin.splice(index, 1);
        }
      }
    });
  }

  checkCollisionSalsaStore() {
    const now = Date.now();
    if (this.world.lastPurchaseTime && now - this.world.lastPurchaseTime < 500) {
      return;
    }

    if (
      this.world.keyborad.DOWN &&
      this.world.CoinCount > 0 &&
      this.world.bottleCount < 5 &&
      this.world.character.isColliding(this.world.salsaStore)
    ) {
      this.world.lastPurchaseTime = now;
      this.world.bottleCount++;
      this.world.statusBarBottle.setPercentage(this.world.bottleCount);
      this.world.CoinCount--;
      this.world.statusBarCoin.setPercentage(this.world.CoinCount);
      this.world.audioManager.buySound.play();
    }
  }

  checkThrowobjekt() {
    if (this.world.canThrowBottle()) {
      this.world.prepareThrow();
    }
  }

}