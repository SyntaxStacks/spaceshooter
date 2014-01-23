function Main(canvas) {
  var GameEngine = new Engine(canvas);

  this.play = play;

  var scenes = {
    menu: newMenuScene,
    game: newShooterScene
  };

  function play() {
    var menu = newMenuScene();

  }

  function newMenuScene() {
    var menu = new Menu();
    GameEngine.run(menu, done);
  }

  function newShooterScene() {
    var shooter = new Shooter();
    GameEngine.run(shooter, done);
  }

  function done(scene) {
    if(scene == 'running') return;
    nextScene = scenes[scene] || newMenuScene;
    console.log(nextScene);
    nextScene();
  }

}

var reqs = ['Engine', 'Menu', 'Shooter'];
define(reqs, function() { return Main; });
