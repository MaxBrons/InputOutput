class InputHandler {
    constructor() {
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
            }
        } else if (this.checkInputType(1)) {
            document.addEventListener('mousemove', this.mouseUpdate, { once: true });
        }
    }

    handTrackUpdate(boxSize) {
        if (boxSize < bBox * 0.90) {
            player.shoot();
        }
    }

    mouseUpdate(evt) {
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
            startVideo();
            inputHandler.changeInputType(0);
            trackingTypeText.innerHTML = "Hand Tracking";
        }
    }
}