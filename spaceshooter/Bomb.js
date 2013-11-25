function Bomb(shooter, target) {
	var bomb        = bombData(shooter);
	var FRAMEHEIGHT  = 300;
	var FRAMEWIDTH   = 600;

	this.draw        = drawBomb;
	this.status			 = getStatus;
	this.x           = getLocationX;
	this.y           = getLocationY;
	this.originX     = getOriginX;
	this.originY     = getOriginY;
	this.setX        = setLocationX;
	this.setY        = setLocationY;
	this.angle       = getAngle;
	this.kill        = kill;

	function getLocationX()  { return bomb.x; }
	function getLocationY()  { return bomb.y; }
	function getOriginX()    { return bomb.origin.x; }
	function getOriginY()    { return bomb.origin.y; }
	function setLocationX(x) { bomb.x = x; }
	function setLocationY(y) { bomb.y = y; }
	function getAngle()      { return bomb.angle; }
	function kill()          { destroy = true; }
	function getStatus()     { return bomb.status;}
	function setStatus(status) { bomb.status = status; }

	function drawBomb(canvas) {
		canvas.save()
		canvas.fillStyle = "#0F0";
		if(bomb != null){ canvas.fillRect(bomb.x,bomb.y,10,10);}
		canvas.restore();
	}

	function bombData(ship) {
		return {
			type: ship.type(),
			status: 'LOADED',
			angle: 0, 
			origin: {
				x: ship.locationX() + (ship.width()/2),
				y: ship.locationY() + ship.height()
			},
			x: ship.locationX() + (ship.width()/2),
			y: ship.locationY() + ship.height()
		};
	}
}

define(function(){ return Bomb; });
