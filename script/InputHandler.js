class InputHandler {
    constructor() {
        this.handtrack = new Handtrackjs();
        this.inputTypes = {
            handtrack: 0,
            mouse: 1
        }
        this.inputType = this.inputTypes.handtrack;
    }

    update() {
        if (this.checkInputType(0)) {
            if (handTrack.posx > player.image.width / 4 && handTrack.posx < canvas.width - player.image.width / 4) {
                player.position.x = handTrack.posx * 1.2;
                //player.position.x = player.speed * Math.cos(this.handtrack.posx) / 60;
            }
        } else if (this.checkInputType(1)) {
            document.addEventListener('mousemove', this.mouseUpdate, {
                once: true
            });
        }
    }

    mouseUpdate(evt){
        if (evt.clientX > player.image.width / 4 && evt.clientX < canvas.width - player.image.width / 4) {
            player.position.x = evt.clientX;
        }
    }

    changeInputType(index) {
        this.inputType = index;
    }

    checkInputType(index) {
        let returnVal = this.inputType == index ? true : false;
        return returnVal;
    }

    toggleInput() {
        if (inputHandler.checkInputType(0)) {
            inputHandler.changeInputType(1);
            trackingTypeText.innerHTML = "Mouse";
        }
        else if (inputHandler.checkInputType(1)) {
            inputHandler.changeInputType(0);
            trackingTypeText.innerHTML = "Hand Tracking";
        }
    }
}