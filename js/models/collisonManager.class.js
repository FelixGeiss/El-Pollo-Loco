/**
 * Represents a collision manager that handles various collision checks and interactions within the game world.
 */
class CollisonManager {
  world;
  mouseX = 0;
  mouseY = 0;

  /**
   * Creates a CollisonManager instance.
   * @param {Object} world - The game world instance.
   */
  constructor(world) {
    this.world = world;
    this.world.canvas.addEventListener("mousemove", this.trackMousePosition.bind(this));
  }

  /**
   * Tracks and stores the mouse position relative to the canvas.
   * @param {MouseEvent} event - The mousemove event.
   */
  trackMousePosition(event) {
    const rect = this.world.canvas.getBoundingClientRect();
    // Calculate scaling factors
    const scaleX = this.world.canvas.width / rect.width;
    const scaleY = this.world.canvas.height / rect.height;
    // Scale mouse position
    this.mouseX = (event.clientX - rect.left) * scaleX;
    this.mouseY = (event.clientY - rect.top) * scaleY;
  }

  /**
   * Checks collisions between the character and enemies.
   * If the character jumps on an enemy, the enemy is hit.
   * Otherwise, the character takes damage and is pushed back.
   */
  checkCollision() {
    this.world.level.enemies.forEach((enemy) => {
      if (!enemy.enemyIsDead && this.world.character.isColliding(enemy)) {
        if (this.shouldHitEnemy(enemy)) {
          this.handleEnemyCollision(enemy);
        } else {
          this.handleCharacterCollision();
        }
      }
    });
  }

  /**
   * Determines if the enemy should be hit based on the character's position.
   * @param {Object} enemy - The enemy object.
   * @returns {boolean} True if the enemy should be hit, otherwise false.
   */
  shouldHitEnemy(enemy) {
    return (
      this.world.character.y +
        this.world.character.height -
        this.world.character.offset.bottom <
      enemy.y + enemy.offset.top + enemy.height / 1 &&
      enemy.height < 400
    );
  }

  /**
   * Handles the collision when the enemy is hit.
   * @param {Object} enemy - The enemy object.
   */
  handleEnemyCollision(enemy) {
    enemy.hit();
    this.world.audioManager.chickenHitSound.play();
  }

  /**
   * Handles the collision when the character is hit.
   * Applies a cooldown so that the character only takes damage once every 500ms.
   */
  handleCharacterCollision() {
    if (this.world.character.energy > 0) {
      const now = Date.now();
      if (
        !this.world.character.lastHitTime ||
        now - this.world.character.lastHitTime > 500
      ) {
        this.world.audioManager.characterHitSound.play();
        this.world.character.hit();
        this.world.character.lastHitTime = now;
        this.world.character.x -= 40;
        this.world.statusBar.setPercentage(this.world.character.energy);
      }
    }
  }

  /**
   * Checks collisions between thrown bottles and enemies.
   * If a bottle collides with an enemy, the enemy is hit and the bottle breaks.
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
   * Checks collisions with the endboss.
   * Sets the endboss to attack mode if colliding, and checks if the endboss is dead.
   */
  checkCollisionEndbos() {
    let endboss = this.world.level.enemies.find((enemy) => enemy instanceof Endboss);

    if (endboss) {
      if (this.world.character.isColliding(endboss)) {
        endboss.isAttack = true;
      } else {
        endboss.isAttack = false;
      }

      if (endboss.energy <= 0) {
        this.world.enbossIsDead = true;
      }

      if (this.world.character.x > 9790) {
        endboss.itsMove = true;
      }
    }
  }

  /**
   * Checks if thrown bottles are broken.
   * Stops the throw sound, plays the bottle broken sound, and removes the broken bottle from the game.
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
   * Collects bottles when the character collides with them.
   * Increases the bottle count up to a maximum of 5.
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
   * Collects coins when the character collides with them.
   * Increases the coin count up to a maximum of 5.
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
   * Implements the purchase logic for the Salsa Store.
   * If the character is colliding with the store and has enough coins,
   * they can purchase a bottle (if below the maximum bottle count).
   */
  checkCollisionSalsaStore() {
    const now = Date.now();
    if (this.world.lastPurchaseTime && now - this.world.lastPurchaseTime < 500) return;

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
   * Handles the bottle-throwing logic.
   * Checks if a bottle can be thrown and prepares the throw if possible.
   */
  checkThrowobjekt() {
    if (this.world.canThrowBottle()) {
      this.world.prepareThrow();
    }
  }

  /**
   * Checks if the mouse is hovering over any UI icons on the canvas and updates the cursor style accordingly.
   */
  checkCollisionButtonToMouse() {
    const icons = this.getRelevantIcons();
    const isHovering = this.checkIconsHoverState(icons);
    this.updateCursor(isHovering);
  }

  /**
   * Returns an array of icons to be checked for hover state.
   * @returns {Array<DrawableObject>} Icons that should respond to mouse hover.
   */
  getRelevantIcons() {
    return [
      this.world.instructionIcon,
      this.world.musicMuteIcon,
      this.world.playGame,
      this.world.SoundsMuteIcon,
      this.world.imprint
    ];
  }

  /**
   * Determines whether to skip checking a particular icon based on the current game state.
   * @param {DrawableObject} icon - The icon to evaluate.
   * @returns {boolean} True if the icon should be skipped, otherwise false.
   */
  shouldSkipIcon(icon) {
    if (this.world.startGame) {
      return [this.world.imprint, this.world.instructionIcon].includes(icon);
    }
    const allowed = [
      this.world.imprint,
      this.world.instructionIcon,
      this.world.SoundsMuteIcon,
      this.world.playGame,
      this.world.musicMuteIcon
    ];
    return !allowed.includes(icon);
  }

  /**
   * Checks if an icon has valid x/y properties for collision detection.
   * @param {DrawableObject} icon - The icon to check.
   * @returns {boolean} True if the icon has valid position properties, otherwise false.
   */
  hasValidPosition(icon) {
    return typeof icon.x !== 'undefined' && typeof icon.y !== 'undefined';
  }

  /**
   * Determines if the mouse coordinates are currently over the icon's bounds.
   * @param {DrawableObject} icon - The icon to check.
   * @returns {boolean} True if the mouse is over the icon, otherwise false.
   */
  isMouseOverIcon(icon) {
    return (
      this.mouseX >= icon.x &&
      this.mouseX <= icon.x + icon.width &&
      this.mouseY >= icon.y &&
      this.mouseY <= icon.y + icon.height
    );
  }

  /**
   * Iterates through icons to check if the mouse is hovering over any of them.
   * @param {Array<DrawableObject>} icons - The array of icons to evaluate.
   * @returns {boolean} True if the mouse is hovering over any icon, otherwise false.
   */
  checkIconsHoverState(icons) {
    for (const icon of icons) {
      if (!icon || this.shouldSkipIcon(icon)) continue;
      if (!this.hasValidPosition(icon)) continue;
      if (this.isMouseOverIcon(icon)) return true;
    }
    return false;
  }

  /**
   * Updates the cursor style based on whether the mouse is hovering over a relevant icon.
   * @param {boolean} isHovering - True if the mouse is hovering over an icon, otherwise false.
   */
  updateCursor(isHovering) {
    this.world.canvas.style.cursor = isHovering ? "pointer" : "default";
  }
}
