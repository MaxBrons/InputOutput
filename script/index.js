const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth - 70;
const height = window.innerHeight;

///UI interaction///
let startButton = document.getElementById("startButton");
let button = document.getElementById("trackingTypeButton");
let trackingTypeText = document.getElementById("trackingType");

//Managers
let gameManager = new GameManager();
let artyomManager = new ArtyomManager();
let laserManager = new LaserManager();

//InputHandler
let inputHandler = new InputHandler();

//Player
let player = new Player("img/player-blue-1.png", new Vector2D(100, 700), 1, new Vector2D(50, 50), true);

//Enemy
let enemies = [];
const e_Amount_Per_Row = 10;
const e_Amount_Per_Column = 3;
const e_Row_Padding = 25;
const e_Vertical_Padding = 500;
const e_Vertical_Spacing = 100;
const e_Cooldown = 5.0;

canvas.width = width - 200;
canvas.height = height;

//Display start screen
gameManager.startScreen();

//Spawns the enemies
function initialize() {
  let i = 0;
  const enemySpacing = (canvas.width / e_Amount_Per_Row - 1);
  for (let y = 0; y < e_Amount_Per_Column; y++) {
    let yPos = ((height / e_Vertical_Padding) * 20) + (y * e_Vertical_Spacing);
    for (let x = 0; x < e_Amount_Per_Row; x++) {
      let xPos = (width / e_Row_Padding) + (x * enemySpacing);
      enemies.push(new Enemy("img/enemy-blue-1.png", new Vector2D(xPos, yPos), 300, new Vector2D(50, 50), true));
      laserManager.addDrawablePositionObject(enemies[i]);
      i++;
    }
  }

  gameManager.changeGameState(0);

  setInterval(() => {
    if (gameManager.checkGameState(0)) {
      //Lets all enemies fire
      enemies.forEach((e) => e.shoot(3));
    }
  }, 500);
  setInterval(() => {
    if (inputHandler.checkInputType(1)) {
      player.shoot();
    }
  }, 750);
}

//Draws and/or Updates the Entity
function animate() {
  if (gameManager.checkGameState(0)) {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, width, height);

    //Update Enemies, Player and Lasers
    player.draw(context); //Update the Player
    laserManager.update(); //Update all Laser
    inputHandler.update(); //Update user input

    if (enemies.length > 0) {
      // Update all Enemies
      enemies.forEach((e) => e.draw(context));
    }
    else {
      //Set the gamestate to stopped, so that the winning screen is shown
      gameManager.changeGameState(1);
      if (enemies.length <= 0)
        gameManager.gameWon(); //When all enemies are dead, show the win screen
    }
    // else if (gameManager.checkGameState(2)){
    //   gameManager.pause(); //Pause the game
    // }
  }
}
startButton.onclick = () => {
  //Initialization
  artyomManager.init();
  laserManager.initialize();
  initialize();
  animate();
  gameManager.gameStart();
}
button.onclick = () => {
  inputHandler.toggleInput();
}

