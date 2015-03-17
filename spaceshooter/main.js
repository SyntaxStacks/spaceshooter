var pixeljs = require('pixeljs');
var assetsFile = require('../assets/assets');
var menu = require('./scenes/menu');
var shooter = require('./scenes/shooter');
var config = require('./config');

var main = {
    initialize: function () {
        var opts = {
            config: config,
            assets: assetsFile
        };
        pixeljs.initialize(opts);
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
        menu.initialize(config);
        pixeljs.run(menu).then(main.done);
    },

    newShooterScene: function newShooterScene() {
        shooter.initialize(config);
        pixeljs.run(shooter).then(main.done);
    },

    done: function done(scene) {
        if (scene == 'running') { return; }
        nextScene = main.scenes[scene] || main.newMenuScene;
        nextScene();
    }
}

module.exports = main;
