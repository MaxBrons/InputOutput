const video = document.getElementById("myvideo");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

let imgindex = 1
let isVideo = false;
let model = null;
let videoInterval = 5

const modelParams = {
    flipHorizontal: true, // flip e.g for video  
    maxNumBoxes: 2, // maximum number of boxes to detect
    iouThreshold: 0.5, // ioU threshold for non-max suppression
    scoreThreshold: 0.6, // confidence threshold for predictions.
}

function startVideo() {
    handTrack.startVideo(video).then(function (status) {
        console.log("video started", status);
        if (status) {
            isVideo = true
            runDetection()
        } else {
        }
    });
}

function toggleVideo() {
    if (!isVideo) {
        startVideo();
    } else {
        handTrack.stopVideo(video)
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
            let midval = predictions[0].bbox[0] + (predictions[0].bbox[2] / 2)
            gamex = document.body.clientWidth * (midval / video.width)
            updatePaddleControl(gamex)
            console.log('Predictions: ', gamex);

        }
        if (isVideo) {
            setTimeout(() => {
                runDetection(video)
            }, videoInterval);
        }
    });
}

// Load the model.
handTrack.load(modelParams).then(lmodel => {
    // detect objects in the image.
    model = lmodel
    $(".overlaycenter").animate({
        opacity: 0,
        fontSize: "0vw"
    });
});

// ===============================

let windowXRange, worldXRange = 0
let paddle
let Vec2
let accelFactor

// TestBed Details
windowHeight = $(document).height()
windowWidth = document.body.clientWidth

console.log(windowHeight, windowWidth);

var scale_factor = 10
var SPACE_WIDTH = windowWidth / scale_factor;
var SPACE_HEIGHT = windowHeight / scale_factor;

// Paddle Details
accelFactor = 0.042 * SPACE_WIDTH;

var paddleMap = new Map();
var maxNumberPaddles = 10;
windowHeight = window.innerHeight
windowWidth = window.innerWidth

function updatePaddleControl(x) {
    // gamex = x;
    let mouseX = convertToRange(x, windowXRange, worldXRange);
    let lineaVeloctiy = Vec2((mouseX - paddle.getPosition().x) * accelFactor, 0)
    // paddle.setLinearVelocity(lineaVeloctiy)
    // paddle.setLinearVelocity(lineaVeloctiy)
    lineaVeloctiy.x = isNaN(lineaVeloctiy.x) ? 0 : lineaVeloctiy.x
    paddle.setLinearVelocity(lineaVeloctiy)
    console.log("linear velocity", lineaVeloctiy.x, lineaVeloctiy.y)
}

planck.testbed(function (testbed) {
    var pl = planck;
    Vec2 = pl.Vec2;

    var world = pl.World(Vec2(0, -30));
    var PADDLE = 5

    var paddleFixedDef = {
        // density : 1.0,
        // restitution : BEAD_RESTITUTION,
        userData: {
            name: "paddle"
        }
    };

    var self;

    testbed.step = tick;
    testbed.width = SPACE_WIDTH;
    testbed.height = SPACE_HEIGHT;

    var playerScore = 0;
    windowXRange = [0, windowWidth]
    worldXRange = [-(SPACE_WIDTH / 2), SPACE_WIDTH / 2]


    var characterBodies = [];
    var paddleBodies = new Map();

    var globalTime = 0;
    var CHARACTER_LIFETIME = 6000

    start()

    $(function () {
        console.log("ready!");
        scoreDiv = document.createElement('div');
        $(scoreDiv).addClass("classname")
            .text("bingo")
            .appendTo($("body")) //main div
    });

    function start() {
        addUI()
    }

    // Remove paddles that are no longer in frame.
    function refreshMap(currentMap) {
        paddleBodies.forEach(function (item, key, mapObj) {
            if (!currentMap.has(key)) {
                world.destroyBody(paddleBodies.get(key).paddle);
                paddleBodies.delete(key)
            }
        });
    }

    world.on('pre-solve', function (contact) {

        var fixtureA = contact.getFixtureA();
        var fixtureB = contact.getFixtureB();

        var bodyA = contact.getFixtureA().getBody();
        var bodyB = contact.getFixtureB().getBody();

        var apaddle = bpaddle = false
        if (fixtureA.getUserData()) {
            apaddle = fixtureA.getUserData().name == paddleFixedDef.userData.name;
        }

        if (fixtureB.getUserData()) {
            bpaddle = fixtureB.getUserData().name == paddleFixedDef.userData.name;
        }
        if (apaddle || bpaddle) {
            // Paddle collided with something
            var paddle = apaddle ? fixtureA : fixtureB;
            var bead = !apaddle ? fixtureA : fixtureB;

            // console.log(paddle, bead);

            setTimeout(function () {
                paddleBeadHit(paddle, bead);
            }, 1);
        }

    })

    function addUI() {
        addPaddle()

        // Add mouse movement listener to move paddle
        // Add mouse movement listener to move paddle
        $(document).bind('touchmove touchstart mousemove', function (e) {
            e.preventDefault();
            var touch
            if (e.type == "touchmove") {
                touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
            } else if (e.type == "touchstart") {
                touch = e.targetTouches[0]
            } else if (e.type == "mousemove") {
                touch = e
            }
        });

        var ground = world.createBody();
        var groundY = -(0.3 * SPACE_HEIGHT)
        // ground.createFixture(pl.Edge(Vec2(-(0.95 * SPACE_WIDTH / 2), groundY), Vec2((0.95 * SPACE_WIDTH / 2), groundY)), 0.0);
    }

    function addPaddle() {
        paddle = world.createBody({
            type: "kinematic",
            filterCategoryBits: PADDLE,
            position: Vec2(-(0.4 * SPACE_WIDTH / 2), -(0.25 * SPACE_HEIGHT))
        })
        paddleLines = [
            [1.8, -0.1],
            [1.8, 0.1],
            [1.2, 0.4],
            [0.4, 0.6],
            [-2.4, 0.6],
            [-3.2, 0.4],
            [-3.8, 0.1],
            [-3.8, -0.1]
        ]

        n = 10, radius = SPACE_WIDTH * 0.03, paddlePath = [], paddlePath = []

        paddleLines.forEach(function (each) {
            paddlePath.push(Vec2(radius * each[0], radius * each[1]))
        })

        paddle.createFixture(pl.Polygon(paddlePath), paddleFixedDef)
        paddle.render = {
            fill: '#ff8800',
            stroke: '#000000'
        }
    }

    function tick(dt) {

        globalTime += dt;
        // wrap(box)
        wrap(paddle)
        paddleBodies.forEach(function (item, key, mapObj) {
            stayPaddle(item.paddle)
        });


    }

    function stayPaddle(paddle) {
        var p = paddle.getPosition()

        if (p.x < -SPACE_WIDTH / 2) {
            p.x = -SPACE_WIDTH / 2
            paddle.setPosition(p)
        } else if (p.x > SPACE_WIDTH / 2) {
            p.x = SPACE_WIDTH / 2
            paddle.setPosition(p)
        }
    }

    // Returns a random number between -0.5 and 0.5
    function rand(value) {
        return (Math.random() - 0.5) * (value || 1);
    }

    // If the body is out of space bounds, wrap it to the other side
    function wrap(body) {
        var p = body.getPosition();
        p.x = wrapNumber(p.x, -SPACE_WIDTH / 2, SPACE_WIDTH / 2);
        p.y = wrapNumber(p.y, -SPACE_HEIGHT / 2, SPACE_HEIGHT / 2);
        body.setPosition(p);
    }


    function wrapNumber(num, min, max) {
        if (typeof min === 'undefined') {
            max = 1, min = 0;
        } else if (typeof max === 'undefined') {
            max = min, min = 0;
        }
        if (max > min) {
            num = (num - min) % (max - min);
            return num + (num < 0 ? max : min);
        } else {
            num = (num - max) % (min - max);
            return num + (num <= 0 ? min : max);
        }
    }

    // rest of your code
    return world; // make sure you return the world
});


function convertToRange(value, srcRange, dstRange) {
    // value is outside source range return
    if (value < srcRange[0] || value > srcRange[1]) {
        return NaN;
    }

    var srcMax = srcRange[1] - srcRange[0],
        dstMax = dstRange[1] - dstRange[0],
        adjValue = value - srcRange[0];

    return (adjValue * dstMax / srcMax) + dstRange[0];

}