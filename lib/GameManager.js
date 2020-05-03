class GameManager {
    constructor() {
        this.gameStateEnum = {
            running: 0,
            stopped: 1,
            startScreen: 2,
            initialize: 3
        }
        this.gameState = this.gameStateEnum.initialize;
    }
    startScreen(){
        console.log("Start screen with info");
        document.getElementById("startScreenContent").style.display = "block";
        document.getElementById("canvas").style.display = "none";
        document.getElementById("myvideo").style.display = "none";
    }

    gameStart(){
        console.log("Game Starting");
        document.getElementById("startScreenContent").style.display = "none";
        document.getElementById("canvas").style.display = "block";
        document.getElementById("myvideo").style.display = "block";
    }

    gameWon() {
        console.log("You Won The Game!");
        document.getElementById("winnerScreen").style.display = "block";
        document.getElementById("canvas").style.height = 0;
        document.getElementById("myvideo").style.display = "none";
    }

    gameOver() {
        console.log("You Lost The Game, Better Luck Next Time");
        document.getElementById("gameOverScreen").style.display = "block";
        document.getElementById("canvas").style.height = 0;
        document.getElementById("myvideo").style.display = "none";
    }

    changeGameState(index) {
        this.gameState = index;
    }

    checkGameState(index) {
        let returnVal = this.gameState == index ? true : false;
        return returnVal;
    }
}