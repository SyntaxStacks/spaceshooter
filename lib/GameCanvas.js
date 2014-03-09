define(function() {
  function GameCanvas(canvas) {
    var ctx     = canvas;
    var frame   = 0;

    this.canvas = getCanvas;
    this.render   = draw;

    function getCanvas() { return canvas; }
    function draw(game) { game(ctx); }
  }

  return GameCanvas; 
});
