/**
 * Represents a level in the game, containing enemies, clouds, background objects,
 * and collectible items such as bottles and coins.
 */
class Level {
  /**
   * An array of enemy objects in the level.
   * @type {Array<Enemy>}
   */
  enemies;

  /**
   * An array of cloud objects in the level.
   * @type {Array<Clout>}
   */
  clouds;

  /**
   * An array of background objects in the level.
   * @type {Array<BackgroundObjekt>}
   */
  backroundObjeckt;

  /**
   * An array of collectible bottle objects in the level.
   * @type {Array<CollectiblBottel>}
   */
  collectiblBottel;

  /**
   * An array of collectible coin objects in the level.
   * @type {Array<CollectiblCoin>}
   */
  collectiblCoin;

  /**
   * The x-coordinate at which the level ends.
   * @type {number}
   */
  level_end_x = 13590;

  /**
   * Creates a new Level instance, initializes arrays for enemies, clouds, 
   * background objects, and collectible items, and then calls repetBackround() 
   * to populate the background.
   * @param {Array<Enemy>} enemies - The enemies present in the level.
   * @param {Array<Clout>} clouds - The clouds present in the level.
   * @param {Array<BackgroundObjekt>} backroundObjeckt - The background objects in the level.
   * @param {Array<CollectiblBottel>} collectiblBottel - The collectible bottles in the level.
   * @param {Array<CollectiblCoin>} collectiblCoin - The collectible coins in the level.
   */
  constructor(enemies, clouds, backroundObjeckt, collectiblBottel, collectiblCoin) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backroundObjeckt = backroundObjeckt;
    this.collectiblBottel = collectiblBottel;
    this.collectiblCoin = collectiblCoin;
    this.repetBackround();
  }

  /**
   * Populates the background with repeated images to create a scrolling effect.
   * Alternates between two variants of each background layer.
   */
  repetBackround() {
    for (let index = 0; index < 20; index++) {
      let suffix = (index % 2 === 0) ? "1" : "2";

      this.backroundObjeckt.push(
        new BackgroundObjekt("img/5_background/layers/air.png", 719 * index),
        new BackgroundObjekt("img/5_background/layers/3_third_layer/" + suffix + ".png", 719 * index),
        new BackgroundObjekt("img/5_background/layers/2_second_layer/" + suffix + ".png", 719 * index),
        new BackgroundObjekt("img/5_background/layers/1_first_layer/" + suffix + ".png", 719 * index)
      );
    }
  }
}
