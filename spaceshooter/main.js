var pixeljs = require('pixeljs');
var assetsFile = require('../assets/assets');
var menu = require('./scenes/menu');
var shooter = require('./scenes/shooter');
var config = require('./config');

var main = {
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
        var scene = menu.initialize(config);
        pixeljs.run(scene).then(main.done);
    },

    newShooterScene: function newShooterScene() {
        var scene = shooter.initialize(config);
        pixeljs.run(scene).then(main.done);
    },

    done: function done(scene) {
        nextScene = main.scenes[scene] || main.newMenuScene;
        nextScene();
    }
}

module.exports = {
    initialize: function () {
        var opts = {
            config: config,
            assets: assetsFile
        };
        pixeljs.initialize(opts);

        return main;
    }
};
