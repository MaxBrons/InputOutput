class Handtrackjs{
    constructor(){
        this.posx = null;
        this.posy = null;
    }
}

const video = document.getElementById("myvideo");

let imgindex = 1;
let isVideo = false;
let model = null;
let videoInterval = 5;

const modelParams = {
    flipHorizontal: true, // flip e.g for video  
    maxNumBoxes: 1, // maximum number of boxes to detect
    iouThreshold: 0.5, // ioU threshold for non-max suppression
    scoreThreshold: 0.6, // confidence threshold for predictions.
}

function startVideo() {
    handTrack.startVideo(video).then(function (status) {
        console.log("video started", status);
        if (status) {
            isVideo = true;
            runDetection();
        }
    });
}

function toggleVideo() {
    if (!isVideo) {
        startVideo();
    } else {
        handTrack.stopVideo(video);
        isVideo = false;
    }
}

toggleVideo();

function runDetection() {
    model.detect(video).then(predictions => {
        // console.log("Predictions: ", predictions);
        // get the middle x value of the bounding box and map to paddle location
        model.renderPredictions(predictions, canvas, context, video);
        if (predictions[0]) {
            let midval = predictions[0].bbox[0] + (predictions[0].bbox[2] / 2);
            this.posx = document.body.clientWidth * (midval / video.width);
            this.posy = document.body.clientHeight * (midval / video.height);
            console.log('Predictions: ', predictions);
        }
        if (isVideo) {
            setTimeout(() => {
                runDetection(video);
            }, videoInterval);
        }
    });
}

// Load the model.
handTrack.load(modelParams).then(lmodel => {
    // detect objects in the image.
    model = lmodel;
    $(".overlaycenter").animate({
        opacity: 0,
        fontSize: "0vw"
    });
});