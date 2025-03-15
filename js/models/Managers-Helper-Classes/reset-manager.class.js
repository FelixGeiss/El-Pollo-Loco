/**
 * Manages resetting the game by stopping ongoing intervals,
 * resetting the character, enemies, clouds, collectible items, and status bars,
 * as well as clearing certain arrays and counters.
 *
 * @class GameResetManager
 */
class GameResetManager {
  /**
   * The game world instance that holds game elements.
   * @type {Object}
   */
  world;

  /**
   * Creates a new GameResetManager instance.
   *
   * @constructor
   * @param {Object} world - The game world containing all game elements.
   */
  constructor(world) {
    this.world = world;
  }

  /**
   * Resets the entire game by stopping all intervals, resetting key entities,
   * status bars, counts, and store items.
   */
  resetGame() {
    this.stopAllIntervals();
    this.resetCharacter();
    this.resetArrayElements(this.world.level.enemies, "resetEnemy");
    this.resetArrayElements(this.world.level.clouds, "reset");
    this.resetArrayElements(this.world.level.collectiblCoin, "reset");
    this.resetArrayElements(this.world.level.collectiblBottel, "reset");
    this.resetStatusBars();
    this.resetCounts();
    this.resetStore();
  }

  /**
   * Resets the store to its default state.
   */
  resetStore() {
    this.world.salsaStore.reset();
  }

  /**
   * Resets the character to its default state and stops the snore sound.
   */
  resetCharacter() {
    this.world.character.resetCharacter();
    this.world.audioManager.snoreSound.stop();
  }

  /**
   * Calls a specified reset method on each element of an array, if it exists.
   *
   * @param {Array} array - The array of elements to reset.
   * @param {string} resetMethod - The name of the reset method to call on each element.
   */
  resetArrayElements(array, resetMethod) {
    if (array && array.length > 0) {
      array.forEach((element) => {
        if (element[resetMethod]) {
          element[resetMethod]();
        }
      });
    }
  }

  /**
   * Resets all status bars to their initial values.
   */
  resetStatusBars() {
    this.world.statusBar.setPercentage(100);
    this.world.statusBarBottle.setPercentage(0);
    this.world.statusBarCoin.setPercentage(0);
  }

  /**
   * Resets all counts and clears the array of throwable objects.
   */
  resetCounts() {
    this.world.throwableObjects = [];
    this.world.bottleCount = 0;
    this.world.CoinCount = 0;
  }

  /**
   * Stops and clears all intervals stored in the world's Intervals array.
   */
  stopAllIntervals() {
    this.world.Intervals.forEach((intervalId) => {
      clearInterval(intervalId);
    });
    this.world.Intervals = [];
  }
}
