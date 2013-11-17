function Lasor(shooter, target) {
	var lasor        = lasorData(shooter);
	var FRAMEHEIGHT  = 300;
	var FRAMEWIDTH   = 600;
	var destroy      = false

	this.draw        = drawLasor;
	this.isDestroyed = getDestroy;
	this.x           = getLocationX;
	this.y           = getLocationY;
	this.originX     = getOriginX;
	this.originY     = getOriginY;
	this.setX        = setLocationX;
	this.setY        = setLocationY;
	this.angle       = getAngle;
	this.kill        = kill;

	function getLocationX()  { return lasor.x; }
	function getLocationY()  { return lasor.y; }
	function getOriginX()    { return lasor.origin.x; }
	function getOriginY()    { return lasor.origin.y; }
	function setLocationX(x) { lasor.x = x; }
	function setLocationY(y) { lasor.y = y; }
	function getAngle()      { return lasor.angle; }
	function kill()          { destroy = true; }
	function getDestroy()    { return destroy;}

	function drawLasor(canvas) {
		canvas.save()
		canvas.fillStyle = "#F00";
		if(lasor != null){ canvas.fillRect(lasor.x,lasor.y,3,3);}
		canvas.restore();
	}

	function lasorData(ship) {
		return {
			type: ship.type(),
			angle: (target == null)? 0 : angleBetweenObjects(shooter, target),
			origin: {
				x: ship.locationX() + (ship.width()/2),
				y: ship.locationY() + ship.height()
			},
			x: ship.locationX() + (ship.width()/2),
			y: ship.locationY() + ship.height()
		};
	}

	function angleBetweenObjects(obj1, obj2) {
		var e1x = parseInt(Math.abs(obj1.locationX()));
		var e2x = parseInt(Math.abs(obj2.locationX()));
		var e1y = parseInt(Math.abs(obj1.locationY()));
		var e2y = parseInt(Math.abs(obj2.locationY()));

		var rise = e1y - e2y;
		var run = e1x - e2x;
		var angle = -Math.atan(run/rise);
		return angle;
	}																						
}

define(function(){ return Lasor; });
