/**
 * Manages collision detection within the game world, including collisions
 * between the character and enemies, bottles, coins, and the end boss.
 * Also handles the logic for collecting bottles, coins, buying salsa, and
 * throwing bottles.
 */
class CollisonManager {
  world;
  constructor(world) {
    this.world = world;
  }

  /**
   * Checks for collisions between the character and enemies.
   * If the character lands on top of an enemy, the enemy is hit and a hit sound is played.
   * Otherwise, if the character is hit, the character's energy is reduced and a sound is played.
   */
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

  /**
   * Checks for collisions between thrown bottles and enemies.
   * If a bottle hits an enemy, the enemy is hit, a sound is played, and the bottle is marked as broken.
   */
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

  /**
   * Checks if the end boss exists, and if the character is colliding with it.
   * Sets the end boss to attack mode if a collision is detected, or stops the attack otherwise.
   */
  checkCollisionEndbos() {
    let endboss = this.world.level.enemies.find((enemy) => enemy instanceof Endboss);

    if (endboss) {
        if (this.world.character.isColliding(endboss)) {
            endboss.isAttack = true;
        } else {
            endboss.isAttack = false;
        }

        if (endboss.energy <= 0) { // Korrektur: Vergleichsoperator muss <= sein
            this.world.enbossIsDead = true;
        }
    }
}


  /**
   * Checks if thrown bottles are broken, plays a sound if they are,
   * and removes them from the world.
   */
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

  /**
   * Checks for collisions between the character and collectible bottles.
   * If a collision occurs and the player has fewer than 5 bottles, it increases the bottle count,
   * updates the status bar, and removes the collected bottle from the world.
   */
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

  /**
   * Checks for collisions between the character and collectible coins.
   * If a collision occurs and the player has fewer than 5 coins, it increases the coin count,
   * updates the status bar, and removes the collected coin from the world.
   */
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

  /**
   * Checks if the character is pressing the DOWN key near the salsa store with at least one coin,
   * and fewer than 5 bottles in the inventory.
   * If so, buys a bottle, updates the status bars, and plays the buy sound.
   * Also enforces a brief cooldown to prevent repeated rapid purchases.
   */
  checkCollisionSalsaStore() {
    const now = Date.now();
    if (this.world.lastPurchaseTime && now - this.world.lastPurchaseTime < 500) {
      return;
    }

    if (
      this.world.keyboard.DOWN &&
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

  /**
   * Checks if the player can throw a bottle (e.g., has at least one bottle in inventory),
   * and if so, prepares a throw action in the game world.
   */
  checkThrowobjekt() {
    if (this.world.canThrowBottle()) {
      this.world.prepareThrow();
    }
  }
}
