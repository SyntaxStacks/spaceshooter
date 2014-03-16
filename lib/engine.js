var gameCanvas = require('./gameCanvas');
var gameInput = require('./gameInput');

function Engine(canvas){  
  canvas    = new gameCanvas(canvas);
  var input = new gameInput();

  var animFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            null ;

  this.run = run;

  function run(scene, callback) {
    var recursiveAnim =  function() {
      scene.run(canvas, input, function(status) {
        if(status != 'running') {
          callback(status);
          return;
        }
        animFrame( recursiveAnim );
      });
    };

    animFrame( recursiveAnim );
  }
}

module.exports = Engine;
