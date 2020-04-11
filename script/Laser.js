class Laser extends Entity {
    constructor(img, position, speed, size, audio, source, active, rotated = false) {
        super(img, position, speed, size, active);
        this.audio = new Audio();
        this.audio.src = audio;
        this.source = source;
        this.rotated = rotated
    }

    draw(context) {
        context.drawImage(this.image, this.position.x - this.image.width / 4, this.position.y - this.image.height / 4);
        if (this.position.y < 0 - this.image.height || this.position.y > canvas.height + this.image.height)
            this.destroy();

        if (!this.rotated) {
            this.position.y -= this.speed;
            this.image.src = "img/laser-blue-1.png";
        }
        else if (this.rotated) {
            this.position.y += this.speed;
            this.image.src = "img/laser-blue-1-rotated.png";
        }

        if (laserManager.entities.length > 0) {
            laserManager.entities.forEach((e) => {
                if (e.active && e.source != this.source) {
                    this.position.rad = new Vector2D(1, 1);
                    this.position.rad.differencevector(e.position, this.position);
                    if (this.position.rad.magnitude < 30) {
                        e.destroy();
                        this.destroy();
                        return;
                    }
                }
            });
        }
    }

    destroy() {
        this.active = false;
    }
}