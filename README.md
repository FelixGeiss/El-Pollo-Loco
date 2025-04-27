# El Pollo Loco

## Description

El Pollo Loco is a 2D jump-and-run game set in a desert landscape. The player controls the main character, Pepe, who moves through the level, avoids obstacles, fights enemies, 
and collects items like salsa bottles and coins. The goal is to reach the end of the level and possibly defeat an end boss.

## Features

* Movable character (Pepe) with various animations (walking, jumping, idle, hurt, dead, long idle with snoring)
* Enemies (Chickens, small chickens, end boss - based on filenames in `index.html`)
* Collectible items (Salsa bottles, coins - based on filenames in `index.html`)
* Throwing mechanic (throwing salsa bottles)
* Status bars for health, collected bottles, and coins
* Sound effects and background music with mute options
* Level system with backgrounds and clouds
* Touch controller support for mobile devices
* Salsa shop to buy throwable bottles with coins
* Start screen, game over, and you won screens

## Controls

### Keyboard:
* **Right Arrow:** Walk right
* **Left Arrow:** Walk left
* **Up Arrow / Spacebar:** Jump
* **D:** Throw salsa bottle
* **Down Arrow:** Buy salsa bottle (in the shop)

### Game Icons:
* **Attack Icon:** Throw salsa bottle
* **Arrow Icons:** Movement
* **Mute Icons:** Toggle sound effects / music mute
* **Home Icon:** Back to main menu
* **Play Icon:** Start game
* **Restart Icon:** Restart game
* **Salsa Store Icon:** At the salsa shop, you can use coins to buy salsa bottles for throwing.

*(Note: Touch controls are implemented via controller overlays on the screen)*

## How to Play

1.  Clone or download the project directory.
2.  Open the `index.html` file in your web browser.

## Project Structure (Based on uploaded files)

* `index.html`: Main HTML file that loads the game.
* `instruction.html`: Instructions for controls.
* `imprint.html`: Imprint information.
* `css/`: Contains the stylesheets (`style.css`, `styleInstruction.css`).
* `js/`: Contains the JavaScript files.
    * `game.js`: Main game logic and initialization.
    * `models/`: Contains classes for game objects.
        * `character.class.js`: Logic for the player character.
        * `drawable-object.class.js`: Base class for drawable objects.
        * `background.class.js`: Logic for background objects.
        * `cloud.class.js`: Logic for clouds.
        * *(Other classes like `movable-object.class.js`, `chicken.class.js`, `endboss.class.js`, status bars, collectibles etc. are referenced in `index.html`)*
    * `levels/`: Contains level definitions (e.g., `level1.js` referenced in `index.html`).
* `img/`: Contains all image files for backgrounds, characters, objects, icons etc.
* `fonts/`: Contains font files (e.g., `Zabars.ttf` referenced in `style.css`).
* `audio/`: (Presumably) Contains sound files (not directly visible in uploaded files, but sound features exist).

## Author

* Felix Geiss 
