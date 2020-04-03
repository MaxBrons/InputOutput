const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth - 70;
const height = window.innerHeight;

//GameManager
let gamemanager = new GameManager();

//Player
let player = new Player("img/player-blue-1.png", new Vector2D(100, 600), -15, new Vector2D(50, 50));

//Laser
let lasers = [];
const LASER_MAX_SPEED = 300.0;
const LASER_COOLDOWN = 0.5;

//Enemy
let enemies = [];
const e_Amount_Per_Row = 10;
const e_Row_Padding = 3;
const e_Vertical_Padding = 80;
const e_Vertical_Spacing = 80;
const e_Cooldown = 5.0;

canvas.width = width - 200;
canvas.height = height;

function init() {
  for (let i = 0; i < 30; i++) {
    lasers.push(new Laser("img/laser-blue-1.png", new Vector2D(300, 400), "sound/sfx-laser1.ogg"));
  }

  let i = 0;
  const enemySpacing = (canvas.width/ e_Amount_Per_Row - 1);
  for (let y = 0; y < 3; y++) {
    let yPos = e_Vertical_Padding + y * e_Vertical_Spacing;
    for (let x = 0; x < e_Amount_Per_Row; x++) {
      let xPos = 40 + x * enemySpacing + e_Row_Padding;
      enemies.push(new Enemy("img/enemy-blue-1.png", new Vector2D(xPos, yPos), 300, new Vector2D(50, 50)));
      enemies[i].active = true;
      i++;
    }
  }
}

function animate() {
  if(gamemanager.active){
    requestAnimationFrame(animate);
    context.clearRect(0, 0, width, height);
  
    //Update Enemies, Player and Lasers
    for (let i = 0; i < enemies.length; i++) { enemies[i].draw(context); }
    for (let i = 0; i < lasers.length; i++) { lasers[i].draw(context); }
    player.draw(context);
  }
}
player.update();
animate();

function laserSpawn(){
  for (let i = 0; i < lasers.length; i++) {
    lasers[i].source = "Enemy";
    lasers[i].target = "Player";
    lasers[i].setActive(enemies[0].position.x,enemies[0].position.y);
  }
}