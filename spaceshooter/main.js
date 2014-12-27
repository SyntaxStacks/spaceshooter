var engine = require('../lib/engine');
var menu = require('./scenes/menu');
var shooter = require('./scenes/shooter');
var config = require('./config');

var main = {
    initialize: function () {
        engine.initialize(config);
    },

    get scenes () {
        return { 
            menu: main.newMenuScene,
            game: main.newShooterScene
        }
    },

    play: function play() {
        var menu = main.newMenuScene();
    },

    newMenuScene: function newMenuScene() {
        var menuScene = new menu(config);
        engine.run(menuScene, main.done);
    },

    newShooterScene: function newShooterScene() {
        var shooterScene = new shooter(config);
        engine.run(shooterScene, main.done);
    },

    done: function done(scene) {
        if (scene == 'running') { return; }
        nextScene = main.scenes[scene] || main.newMenuScene;
        nextScene();
    }

}

module.exports = main;

