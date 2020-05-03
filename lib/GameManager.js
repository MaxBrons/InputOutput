class GameManager {
    constructor() {
        this.gameStateEnum = {
            running: 0,
            stopped: 1,
            pauzed: 2,
            initialize: 3
        }
        this.gameState = this.gameStateEnum.initialize;
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


    // pause(){
    //     if(document.getElementById("pauseScreen").classList.contains("hide"))
    //         document.getElementById("pauseScreen").classList.remove("hide")
    //     document.getElementById("pauseScreen").style.display = "block";
    //     document.getElementById("canvas").style.height = 0;
    //     document.getElementById("myvideo").style.display = "none";
    // }

    // resume(){

    //     gameManager.gameState = gameManager.gameStateEnum.running;
    //     if(!document.getElementById("pauseScreen").classList.contains("hide"))
    //         document.getElementById("pauseScreen").classList.add("hide")
    //     document.getElementById("pauseScreen").style.display = "block";
    //     document.getElementById("canvas").style.height = window.height;
    //     document.getElementById("myvideo").style.display = "block";
    // }
}