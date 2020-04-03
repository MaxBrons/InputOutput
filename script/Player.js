class Player {
    constructor(img, position, speed, size) {
        this.image = new Image();
        this.image.src = img;
        this.position = position;
        this.speed = speed;
        this.size = size;
        this.handtrack = new Handtrackjs();
        this.health = 1;
    }

    draw(context) {
        context.drawImage(this.image, this.position.x, this.position.y, this.size.x, this.size.y);
    }

    update() {
        this.position.x += this.speed * Math.cos(this.handtrack.posx);
        this.position.y += this.speed * Math.cos(this.handtrack.posy);
    }

    damage(){
        if(this.health > 1)
            this.health -= 1;
        else if(this.health <= 1)
            gamemanager.gameOver();
    }
}