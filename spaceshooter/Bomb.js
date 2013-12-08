function Bomb(shooter, target) {
	var bomb        = bombData(shooter);
	var FRAMEHEIGHT  = 300;
	var FRAMEWIDTH   = 600;
	var explosionFrame      = 0;
	var sprites             = null;
	var loadImage           = document.createElement('img');
	loadImage.src           = './img/sprites.png';
	loadImage.onload        = function(){
		sprites               = loadImage;
	}

	this.draw        = drawBomb;
	this.status			 = getStatus;
	this.setStatus	 = setStatus;
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
		var events = {
			fired: drawBombFired,
			detonated: drawBombDetonated,
		};

		events[getStatus()](canvas);
	}

	function drawBombFired(canvas) {
		canvas.save()
		canvas.fillStyle = "#0F0";
		if(bomb != null){ canvas.fillRect(bomb.x,bomb.y,10,10);}
		canvas.restore();
	}

	function drawBombDetonated(canvas) {
		var exp = explosion();
		canvas.save()
		canvas.fillStyle = "#0F0";
		if(bomb != null){ 
			canvas.drawImage(sprites, exp.sprite.x, exp.sprite.y, exp.sprite.width, exp.sprite.height,
						(getLocationX()-50) - (exp.sprite.width/2), (getLocationY()-50) - (exp.sprite.height/2), 100, 100); 
		}
		canvas.restore();
	}

	function bombData(ship) {
		return {
			type: ship.type(),
			status: 'fired',
			angle: 0, 
			origin: {
				x: ship.locationX() + (ship.width()/2),
				y: ship.locationY() + ship.height()
			},
			x: ship.locationX() + (ship.width()/2),
			y: ship.locationY() + ship.height()
		};
	}

	function explosion(frame) {
		var spriteXIndex = explosionFrame;
		var spriteYIndex = 0;
		var EXPLOSIONSPRITEWIDTH = 32;
		var EXPLOSIONSPRITEHEIGHT = 32;
		return {
			sprite: {
				x: spriteXIndex * EXPLOSIONSPRITEWIDTH,
				y: spriteYIndex * EXPLOSIONSPRITEWIDTH,
				width: EXPLOSIONSPRITEWIDTH,
				height: EXPLOSIONSPRITEHEIGHT,
			},
		}
	}
}

define(function(){ return Bomb; });
