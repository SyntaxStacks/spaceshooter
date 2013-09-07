function Ship(type){
	
	var data = shipSpecs(type);

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
	
	//this.toString = tostring();
	
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
	//function tostring()		{ return "Ship: "+getShipType(); }

	function shipSpecs(type){

		if(type == "PLAYER")
	 		return {
				type: "PLAYER",
				angle: 0,
				location: {
					x: 0,
					y: 0
				},
				sprite: {
					ship: ">O<",
					lasor: "|"
				},
				className: {
					ship: "class",
					lasor: "lasorclass"
				},
				range:{
					x: 50,
					y: 50
				},
				speed: {
					x: 1,
					y: 0
				}
			};
	}
}

module.exports = Ship