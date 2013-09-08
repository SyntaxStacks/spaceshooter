function Ship(type){
	
	var data = shipSpecs(type);
	var loadImage = document.createElement('img');
	var sprites = null;
	var FRAMEHEIGHT = 300;
	var FRAMEWIDTH = 600;
	
	loadImage.src = 'sprites.png';
	loadImage.onload = function(){
		sprites = loadImage;
	}

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
	this.floatXRange    = getFloatXRange;
	this.floatYRange    = getFloatYRange;
	this.originX        = getOriginX;
	this.originY        = getOriginY;
	this.locationX      = getLocationX;
	this.locationY      = getLocationY;
	this.type           = getShipType;
	this.xSpeed         = getShipXSpeed;
	this.ySpeed         = getShipYSpeed;
	this.dir            = getDirection;
	this.angle          = getAngle;
	this.width 			= getSpriteWidth;
	this.height 		= getSpriteHeight;
	this.draw 			= draw;
	this.move			= move;
	this.shoot 			= shoot;
	this.update			= update;
	this.lasors 		= getLasors;
	
	//this.toString = tostring();
	
	function move(moveDistance)		{ this.setLocationX(this.locationX() + moveDistance); }
	function setShipSprite(ship)	{ data.sprite.ship = ship; }
	function setFloatXRange(x)	{ data.range.x = x; }
	function setFloatYRange(y)	{ data.range.y = y; }
	function setOriginX(x)		{ data.range.x = x; }
	function setOriginY(y)		{ data.range.y = y; }
	function setLocationX(x)	{ data.location.x = x; }
	function setLocationY(y)	{ data.location.y = y; }
	function setShipType(type)	{ data.type = type; }
	function setShipXSpeed(x)	{ data.speed.x = x; }
	function setShipYSpeed(y)	{ data.speed.y = y; }
	function setDirection(dir)	{ data.dir = dir; }
	function setAngle(ang)		{ data.angle = ang; }
	function getShipSprite()	{ return data.sprite.ship; }
	function getFloatXRange()	{ return data.range.x || 0; }
	function getFloatYRange()	{ return data.range.y || 0; }
	function getOriginX()		{ return data.origin.x || 0; }
	function getOriginY()		{ return data.origin.y || 0; }
	function getLocationX()		{ return data.location.x; }
	function getLocationY()		{ return data.location.y; }
	function getShipType()		{ return data.type; }
	function getShipXSpeed()	{ return data.speed.x || 0; }
	function getShipYSpeed()	{ return data.speed.y || 0; }
	function getDirection()		{ return data.dir; }
	function getAngle(ang)		{ return data.angle; }
	function getSpriteOriginX()	{ return data.sprite.x; }
	function getSpriteOriginY()	{ return data.sprite.y; }
	function getSpriteWidth()	{ return data.sprite.width; }
	function getSpriteHeight()	{ return data.sprite.height; }
	function getLasors()		{ return data.lasor; }
	function addLasor(lasor)	{ data.lasor.push(lasor); }
	//function tostring()		{ return "Ship: "+getShipType(); }

	function draw(canvas){

		var ctx = canvas;
		ctx.save();
		ctx.translate(this.width(), this.height());
		ctx.rotate(Math.PI);
		
		ctx.drawImage(sprites, getSpriteOriginX(), getSpriteOriginY(), getSpriteWidth(), getSpriteHeight(),
					(-this.locationX()), (-this.locationY()), this.width(), this.height());
		ctx.restore();

		ctx.save()
		var lasors = getLasors();
		ctx.fillStyle = "#F00";
		if(lasors != null)
			for(var i = 0; i < lasors.length; i++){
				var lasor = lasors[i];

				ctx.fillRect(lasor.x,lasor.y,3,3);
			}

		ctx.restore();

		return ctx;
	}

	function update(){
		var lasors = getLasors();
		for(var i = 0; i < lasors.length; i++) {
			var lasor = lasors[i];
			if(lasor.y < 0){
				getLasors().splice(i, 1);
				continue;
			}
	    	
	    	lasor.y = lasor.y - 5;
		}																							
	}

	function shoot(ship){
		//if(data.lasor.length >= 2)
		//	return false;
		
		var ship = ship;
		var lasor = {
			type: this.type(),
			angle: 0,
			x: this.locationX()+(this.width()/2),
			y: this.locationY()
		};
		addLasor(lasor);
	}

	function shipSpecs(type){

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
				speed:{
					x: 10,
					y: 1
				},
				lasor: []
			}
	}
}

define(function(){ return Ship; });