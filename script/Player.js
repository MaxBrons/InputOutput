class Player extends Entity{
    constructor(img, position, speed, size, active) {
        super(img,position,speed,size,active);
        laserManager.addDrawablePositionObject(this);
        this.health = 1;
        this.source = "Player";
    }

    draw(context) {
        context.drawImage(this.image, this.position.x - this.image.width / 4, this.position.y - this.image.height / 4, this.size.x, this.size.y);
    }

    destroy() {
        if (this.health > 1)
            this.health -= 1;
        else if (this.health <= 1){
            gameManager.gameOver();
            gameManager.gameState = gameManager.gameStateEnum.stopped;
        }
    }

    shoot() {
        laserManager.spawnLaser(this, "Player", false);
    }
}