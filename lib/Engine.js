var reqs = ['GameCanvas', 'GameInput'];
define(reqs, function(GameCanvas, GameInput) {
  function Engine(canvas){  
    canvas    = new GameCanvas(canvas);
    var input = new GameInput();

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
  return( Engine ); 
});
