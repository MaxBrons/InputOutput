class Entity{
    constructor(img, position, speed, size, active = false) {
        this.image = new Image();
        this.image.src = img;
        this.position = position;
        this.speed = speed;
        this.size = size;
        this.active = active;
    }
}