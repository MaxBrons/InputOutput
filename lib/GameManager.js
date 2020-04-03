class GameManager{
    constructor(){
        this.active = true;
    }

    gameOver(){
        document.getElementById("gameOverScreen").style.display = "block";
        document.getElementById("canvas").style.height = 0;
        document.getElementById("myvideo").style.display = "none";
    }

    restart(){
        document.getElementById("gameOverScreen").style.display = "none";
        document.getElementById("canvas").style.height = window.height;
        document.getElementsByClassName("videobox").style.display = "block";
    }
}