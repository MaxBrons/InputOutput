class ArtyomManager {
  constructor() {
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
      var commands = ["sniper", "shotgun"];
      for (let cmd of commands) {
        if (wildcard.toLowerCase().indexOf(cmd) > -1) {
          if (cmd == commands[0]){
            player.changeWeaponType(0);
          }
          else if (cmd == commands[1]) {
            player.changeWeaponType(1);
          }
        }
      }
    });
  }
}
