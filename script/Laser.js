class Laser {
    constructor(img, position, audio,source = null,target = null) {
        this.image = new Image(img);
        this.image.src = img;
        this.position = position;
        this.audio = new Audio();
        this.audio.src = audio;
        this.speed = 3;
        this.active = false;
        this.source = source;
        this.target = target;
    }

    draw(context) {
        if (this.active && this.source != null && this.target != null) {
            context.drawImage(this.image, this.position.x, this.position.y);
            if(this.source == "Player" && this.target != "Player")
            {
                this.position.y-= this.speed;
                for (let i = 0; i < enemies.length; i++) {
                    let dx = this.position.x - enemies[i].position.x;
                    let dy = this.position.y - enemies[i].position.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < this.image.width + enemies[i].image.width) {
                        this.destroy();
                        enemies[i].destroy();
                    }
                }
            }
            else{
                this.image.className = "rotate" + 90;
                this.position.y += this.speed;
                let dx = this.position.x - player.position.x;
                let dy = this.position.y - player.position.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < this.image.width + player.image.width) {
                        this.destroy();
                        player.damage();
                    }
                }
            if (this.position.x < 0 - this.image.width || this.position.x > canvas.width + this.image.width)
                this.destroy();
            if (this.position.y < 0 - this.image.height || this.position.y > canvas.height + this.image.height)
                this.destroy();
        }
    }

    setActive(x,y){
        if(!this.active) {
            this.active = true;
            this.position = new Vector2D(x,y + this.image.height);
        }
    }

    destroy() {
        this.active = false;
    }
}