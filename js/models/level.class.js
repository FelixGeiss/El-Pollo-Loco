/**
 * Represents a level in the game, containing enemies, clouds, background objects,
 * and collectible items such as bottles and coins.
 */
class Level {

  enemies;
  clouds;
  backroundObjeckt;
  collectiblBottel;
  collectiblCoin;
  level_end_x = 13590;
  initialCollectiblesBottles;
  initialCollectiblesCoins;

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
    this.initialCollectiblesBottles = [...collectiblBottel];
    this.initialCollectiblesCoins = [...collectiblCoin];
    this.collectiblBottel = collectiblBottel;
    this.collectiblCoin = collectiblCoin;
    this.repetBackround();
  }

  /**
   * Resets the collectible items (bottles and coins) to their initial state,
   * restoring positions and statuses if needed.
   */
  resetCollectibles() {
    this.collectiblBottel = [...this.initialCollectiblesBottles];
    this.collectiblCoin = [...this.initialCollectiblesCoins];
    this.collectiblBottel.forEach(bottle => bottle.reset());
    this.collectiblCoin.forEach(coin => coin.reset());
  }

  /**
   * Populates the background with repeated images to create a scrolling effect,
   * alternating between two variants of each background layer.
   */
  repetBackround() {
    for (let index = 0; index < 20; index++) {
      let suffix = (index % 2 === 0) ? "1" : "2";
      this.backroundObjeckt.push(
        new BackgroundObjekt("img/5_background/layers/air.png", 719 * index),
        new BackgroundObjekt(`img/5_background/layers/3_third_layer/${suffix}.png`, 719 * index),
        new BackgroundObjekt(`img/5_background/layers/2_second_layer/${suffix}.png`, 719 * index),
        new BackgroundObjekt(`img/5_background/layers/1_first_layer/${suffix}.png`, 719 * index)
      );
    }
  }
}
