var canvas = require('./gameCanvas');
var input = require('./gameInput');
var assets = require('./gameAssets');

function Engine(config){  
  canvas.initialize(config, assets.images);

  var dependencies = {
    canvas: canvas, 
     input: input, 
    assets: assets
  };

  var animFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            null ;

  this.run = run;

  function run(scene, callback) {

    var recursiveAnim =  function() {
      scene.run(dependencies, function(status) {
        if(status != 'running') {
          callback(status);
          return;
        }
        assets.sounds.play();
        animFrame( recursiveAnim );
      });
    };

    animFrame( recursiveAnim );
  }
}

module.exports = Engine;
