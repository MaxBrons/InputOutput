class Player extends Entity{
    constructor(img, position, speed, size, active) {
        super(img,position,speed,size,active);
        laserManager.addDrawablePositionObject(this);
        this.health = 1;
        this.source = "Player";
        this.weaponTypes = {
            sniper: 0,
            shotgun: 1
        }
        this.currentWeapon = this.weaponTypes.sniper;
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
        if(this.checkWeaponType(0)){
            laserManager.spawnLaser(this, "Player", false);
        }
        else if(this.checkWeaponType(1)){
            laserManager.spawnLaser(this, "Player", false,-10);
            laserManager.spawnLaser(this, "Player", false);
            laserManager.spawnLaser(this, "Player", false,10);
        }
    }

    changeWeaponType(index) {
        this.currentWeapon = index;
    }

    checkWeaponType(index) {
        let returnVal = this.currentWeapon == index ? true : false;
        return returnVal;
    }
}