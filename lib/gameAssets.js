var audio = require('./gameAudio');
var image = require('./gameImage');
var assets = {
    initialize: function () {
        audio.initialize();
        image.initialize();

        assets.sounds = audio;
        assets.images = image.collection;
    }
};

module.exports = assets;
