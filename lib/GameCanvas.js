function GameCanvas(canvas) {
	var ctx     = canvas;
	var frame   = 0;

	this.canvas = getCanvas;
	this.draw   = draw;

	function getCanvas() { return canvas; }
	function draw(game) { game(ctx); }
}

define(function() { return GameCanvas; } );
