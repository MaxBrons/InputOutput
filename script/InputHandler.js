class InputHandler {
    constructor() {
        this.handtrack = new Handtrackjs();
        this.inputTypes = {
            handtrack: 0,
            mouse: 1
        }
        this.inputType = this.inputTypes.mouse;
    }

    update() {
        if (this.inputType == this.inputTypes.handtrack) {
            player.position.x = this.handtrack.posx;
            //player.position.x = player.speed * Math.cos(this.handtrack.posx) / 60;
        } else if (this.inputType == this.inputTypes.mouse) {
            document.addEventListener('mousemove', (evt) => {
                if (evt.clientX > player.image.width/3 && evt.clientX < canvas.width - player.image.width/3)
                    player.position.x = evt.clientX;
            });
        }
    }
}