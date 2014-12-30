promise = require('bluebird');
createjs = require('createjs'); 
canvas = require('./gameCanvas');
input = require('./gameInput');
assets = require('./gameAssets');

engine = {
    run: function run (scene) {
        return new promise(function (resolve, reject) {
            var updateFn = function (status) {
                if(status != 'running') {
                    resolve(status);
                    return;
                }
                assets.sounds.play();
                canvas.update();
            };

            var updateEvent =  function () {
                scene.run().then(updateFn);
            };

            engine.addEvent(updateEvent);
        });
    },
    initialize: function (config) {
        assets.initialize();
        canvas.initialize(config);
    },
    addEvent: function (fn) {
        fn = fn.bind(fn);
        createjs.Ticker.addEventListener('tick', fn);
    },
    clearEvents: function (type) {
        createjs.Ticker.removeAllEventListeners(type);
    }
};

module.exports = engine;
