function Ship(type){

	var data            = shipSpecs(type);
	var loadImage       = document.createElement('img');
	var sprites         = null;
	var FRAMEHEIGHT     = 300;
	var FRAMEWIDTH      = 600;
	var FIREDELAY       = 100;
	var lastFire        = Date.now();

	loadImage.src       = './img/sprites.png';
	loadImage.onload    = function(){
		sprites           = loadImage;
	}

	this.angle          = getAngle;
	this.dir            = getDirection;
	this.draw           = draw;
	this.floatXRange    = getFloatXRange;
	this.floatYRange    = getFloatYRange;
	this.height         = getSpriteHeight;
	this.lasors         = getLasors;
	this.locationX      = getLocationX;
	this.locationY      = getLocationY;
	this.move           = move;
	this.originX        = getOriginX;
	this.originY        = getOriginY;
	this.setShipSprite  = setShipSprite;
	this.setFloatXRange = setFloatXRange;
	this.setFloatYRange = setFloatYRange;
	this.setOriginX     = setOriginX;
	this.setOriginY     = setOriginY;
	this.setLocationX   = setLocationX;
	this.setLocationY   = setLocationY;
	this.setType        = setShipType;
	this.setXSpeed      = setShipXSpeed;
	this.setYSpeed      = setShipYSpeed;
	this.setDir         = setDirection;
	this.setAngle       = setAngle;
	this.shipSprite     = getShipSprite;
	this.shoot          = shoot;
	this.type           = getShipType;
	this.update         = update;
	this.width          = getSpriteWidth;
	this.xSpeed         = getShipXSpeed;
	this.ySpeed         = getShipYSpeed;
	//this.toString     = tostring();

	function addLasor(lasor)     { data.lasor.push(lasor); }
	function getShipSprite()     { return data.sprite.ship; }
	function getFloatXRange()    { return data.range.x || 0; }
	function getFloatYRange()    { return data.range.y || 0; }
	function getOriginX()        { return data.origin.x || 0; }
	function getOriginY()        { return data.origin.y || 0; }
	function getLocationX()      { return data.location.x; }
	function getLocationY()      { return data.location.y; }
	function getShipType()       { return data.type; }
	function getShipXSpeed()     { return data.speed.x || 0; }
	function getShipYSpeed()     { return data.speed.y || 0; }
	function getDirection()      { return data.dir; }
	function getAngle(ang)       { return data.angle; }
	function getSpriteOriginX()  { return data.sprite.x; }
	function getSpriteOriginY()  { return data.sprite.y; }
	function getSpriteWidth()    { return data.sprite.width; }
	function getSpriteHeight()   { return data.sprite.height; }
	function getLasors()         { return data.lasor; }
	function move(moveDistance)  { this.setLocationX(this.locationX() + moveDistance); }
	function setAngle(ang)       { data.angle = ang; }
	function setDirection(dir)   { data.dir = dir; }
	function setFloatXRange(x)   { data.range.x = x; }
	function setFloatYRange(y)   { data.range.y = y; }
	function setLocationX(x)     { data.location.x = x; }
	function setLocationY(y)     { data.location.y = y; }
	function setOriginX(x)       { data.range.x = x; }
	function setOriginY(y)       { data.range.y = y; }
	function setShipSprite(ship) { data.sprite.ship = ship; }
	function setShipType(type)   { data.type = type; }
	function setShipXSpeed(x)    { data.speed.x = x; }
	function setShipYSpeed(y)    { data.speed.y = y; }
	//function tostring()        { return "Ship: "+getShipType(); }

	function draw(canvas) {

		canvas.save();
		drawShip(canvas);
		drawLasors(canvas);
		canvas.restore();

		return canvas;
	}

	function drawShip(canvas) {
		canvas.save()
		canvas.translate(getSpriteWidth(), getSpriteHeight());
		canvas.rotate(Math.PI);
		
		canvas.drawImage(sprites, getSpriteOriginX(), getSpriteOriginY(), getSpriteWidth(), getSpriteHeight(),
					(-getLocationX()), (-getLocationY()), getSpriteWidth(), getSpriteHeight());
		canvas.rotate(0);
		canvas.restore();
	}

	function drawLasors(canvas) {
		canvas.save();
		canvas.fillStyle = "#F00";
		for(var i = 0, lasors = getLasors(); i < lasors.length; i++) { lasors[i].draw(canvas); }
		canvas.restore();
	}

	function shoot(ship) {
		if(Date.now() - lastFire > FIREDELAY && data.lasor.length <= 2){
			var lasor = new Lasor(ship, null);
			addLasor(lasor);
			lastFire = Date.now();
		}
	}

	function update(events) {

		var lasors = getLasors();

		for (var i = 0; i < lasors.length; i++) {
			var lasor = lasors[i];
			if(lasor.y() < 0)
				lasor.kill();
    		lasor.setY(lasor.y() - 5);

			if(lasor.isDestroyed())
				lasors.splice(i, 1);
		}	

		for(var i = 0; i < events.length; i++) {
			event = events[i];

			if(event.input == "RIGHT")
				this.move(3);
			if(event.input == "LEFT")
				this.move(-3);
			if(event.input == "SPACE" || (event.input == "LEFT" && event.input == "RIGHT"))
				shoot(this);
		}
	}

	function shipSpecs(type) {

		var ENEMYSPRITEWIDTH = 16;
		var ENEMYSPRITEHEIGHT = 16

		if(type == "PLAYER")
	 		spriteXIndex = 1;
			spriteYIndex = 3;
			return {
				type: "PLAYER",
				angle: 0,
				location: {
					x: 0,
					y: 250
				},
				origin: {
					x: 0,
					y: 0 
				},
				sprite: {
					x: spriteXIndex * ENEMYSPRITEWIDTH,
					y: spriteYIndex * ENEMYSPRITEWIDTH,
					width: ENEMYSPRITEWIDTH,
					height: ENEMYSPRITEHEIGHT
				},
				className: {
					ship: "class",
					lasor: "lasorclass"
				},
				speed: {
					x: 10,
					y: 1
				},
				lasor: []
			}
	}
}

define(['Lasor'], function(){ return Ship; });
