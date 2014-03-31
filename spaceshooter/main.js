var engine = require('../lib/engine');
var menu = require('./scenes/menu');
var shooter = require('./scenes/shooter');
var config = require('./config');

function Main() {
    var gameEngine = new engine(config);

    this.play = play;

    var scenes = {
        menu: newMenuScene,
        game: newShooterScene
    };

    function play() {
        var menu = newMenuScene();
    }

    function newMenuScene() {
        var menuScene = new menu(config);
        gameEngine.run(menuScene, done);
    }

    function newShooterScene() {
        var shooterScene = new shooter(config);
        gameEngine.run(shooterScene, done);
    }

    function done(scene) {
        if(scene == 'running') return;
        nextScene = scenes[scene] || newMenuScene;
        nextScene();
    }

    return( this );
}

module.exports = Main;

