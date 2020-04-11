class ArtyomManager {
  constructor() {
    this.match = false;
  }

  init() {
    let artyom = new Artyom();
    artyom.fatality();
    setTimeout(function () {
      artyom.initialize({
        lang: "en-GB",
        continuous: true, // Artyom will listen forever
        listen: true, // Start recognizing
        debug: false, // Show everything in the console
        speed: 1 // talk normally
      }).then(function () {
        console.log("Ready to work!");
      });
    }, 150);

    artyom.on("*", true).then((i, wildcard) => {
      var commands = ["fire", "stop", "pause"];
      for (let cmd of commands) {
        if (wildcard.toLowerCase().indexOf(cmd) > -1) {
          if (cmd == commands[0]){
            this.match = true;
          }
          else if (cmd == commands[1]) {
            this.match = false;
          }
          // else if (cmd == commands[2]){
          //     gameManager.gameState = gameManager.gameStateEnum.pauzed;
          // }
        }
      }
    });
  }
}
