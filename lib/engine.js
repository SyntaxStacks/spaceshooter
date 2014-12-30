var canvas = require('./gameCanvas');
var input = require('./gameInput');
var assets = require('./gameAssets');


var engine = {
    get dependencies () {
        return {
            canvas: canvas, 
            input: input, 
            assets: assets
        };
    },
    run: function run (scene, callback) {
        var animFrame = window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame   ||
                window.mozRequestAnimationFrame      ||
                window.oRequestAnimationFrame        ||
                window.msRequestAnimationFrame       ||
                null;
        var recursiveAnim =  function () {
            scene.run(engine.dependencies, function(status) {
                if(status != 'running') {
                    callback(status);
                    return;
                }
                assets.sounds.play();
                animFrame( recursiveAnim );
            });
        };

        animFrame( recursiveAnim );
    },
    initialize: function (config) {
        assets.initialize();
        canvas.initialize(config, assets.images);
    },
};

module.exports = engine;
