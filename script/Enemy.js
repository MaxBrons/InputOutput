class Enemy{
    constructor(img,position,speed,size){
        this.image = new Image();
        this.image.src = img;
        this.position = position;
        this.speed = speed;
        this.size = size;
        this.active = false;
    }

    draw(context){
        if(this.active){
            context.drawImage(this.image,this.position.x,this.position.y,this.size.x,this.size.y);

            let dx = Math.sin(Date.now() / 200.0)*0.5;
            let dy = Math.cos(Date.now() / 200.0)*0.25;
            this.position.x += dx;
            this.position.y += dy;
        }
    }

    destroy(){
        this.active = false;
    }

    shoot(){

    }
}