function UI() {
	var FRAMEHEIGHT = 300;
	var FRAMEWIDTH = 600;
	var level = 0;
	var score = 0;

	this.addLevel  = addLevel;
	this.addPoints = addPoints;
	this.draw      = draw
	this.level     = getLevel;
	this.score     = getScore;
	this.reset		= reset;

	function addLevel() { level++; }
	function addPoints(points) { score += Number(points); }
	function getLevel() { return level; }
	function getScore() { return score; }
	function draw(canvas) {

		canvas.save();
		canvas.fillStyle = "#ccc";
		canvas.fillRect(0,290,FRAMEWIDTH, 60);
		canvas.fillStyle = "#000";
		canvas.fillText("SCORE: " + score, 50, 300);
		canvas.fillText("LEVEL: " + level, FRAMEWIDTH-100, 300);
		canvas.restore();
	}
	function reset() {
		level = 1;
		score = 0;
	}
}

define(function(){ return UI; });