class Enemy extends Entity {
    constructor(img, position, speed, size, active) {
        super(img, position, speed, size, active);
        laserManager.addDrawablePositionObject(this);
        this.source = "Enemy";
    }

    draw(context) {
        if (this.active) {
            context.drawImage(this.image, this.position.x - this.image.width / 5, this.position.y - this.image.height / 5, this.size.x, this.size.y);

            let dx = Math.sin(Date.now() / 400.0) * 0.25;
            let dy = Math.cos(Date.now() / 400.0) * 0.25;
            this.position.x += dx;
            this.position.y += dy;
        }
    }

    shoot(percentate) {
        if(this.active){
            let randBool = (Math.random() * 100 < percentate) ? true : false;
    
            if (randBool) {
                laserManager.spawnLaser(this, "Enemy", true);
            }
        }
    }

    destroy() {
        this.active = false;
        enemies.splice(enemies.indexOf(this),1);
    }
}