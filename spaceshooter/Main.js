var reqs = ['Engine', 'Menu', 'Shooter', 'Config'];
define(reqs, function(Engine, Menu, Shooter, Config) { 
  function Main(canvas) {
    var GameEngine = new Engine(canvas);
    var config = new Config();

    this.play = play;

    var scenes = {
      menu: newMenuScene,
      game: newShooterScene
    };

    function play() {
      var menu = newMenuScene();

    }

    function newMenuScene() {
      var menu = new Menu(config);
      GameEngine.run(menu, done);
    }

    function newShooterScene() {
      var shooter = new Shooter(config);
      GameEngine.run(shooter, done);
    }

    function done(scene) {
      if(scene == 'running') return;
      nextScene = scenes[scene] || newMenuScene;
      nextScene();
    }

    return( this );
  }

  return( Main ); 
});

