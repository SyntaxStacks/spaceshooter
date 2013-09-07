function Enemy(type){

	var enemyList = ['MAVERICK', 'BLOCKADE', 'GUARD'];
	var ENEMYLASORCLASS = 'enemyLasor';
	var ENEMYCLASS = 'enemy';
	var FRAMEHEIGHT = 300;
	var FRAMEWIDTH = 600;

	var enemyData = enemySpecs(type? type.toUpperCase() : "");
	enemyData.xorigin = (Math.random()*(FRAMEWIDTH - 2 * getFloatXRange(enemyData))) + getFloatXRange(enemyData);
	enemyData.yorigin = 40;
	enemyData.dir = 0;
	enemyData.location.x = 0;
	enemyData.location.y = enemyData.yorigin;

	this.setShipSprite  = setShipSprite;
	this.setFloatXRange = setFloatXRange;
	this.setFloatYRange = setFloatYRange;
	this.setOriginX     = setOriginX;
	this.setOriginY     = setOriginY;
	this.setLocationX   = setLocationX;
	this.setLocationY   = setLocationY;
	this.setType        = setEnemyType;
	this.setXSpeed      = setEnemyXSpeed;
	this.setYSpeed      = setEnemyYSpeed;
	this.setDir         = setDirection;
	this.setAngle       = setAngle;
	this.shipSprite     = getShipSprite;
	this.lasorSprite	= getLasorSprite;
	this.floatXRange    = getFloatXRange;
	this.floatYRange    = getFloatYRange;
	this.originX        = getOriginX;
	this.originY        = getOriginY;
	this.locationX      = getLocationX;
	this.locationY      = getLocationY;
	this.type           = getEnemyType;
	this.xSpeed         = getEnemyXSpeed;
	this.ySpeed         = getEnemyYSpeed;
	this.dir            = getDirection;
	this.angle          = getAngle;
	
	this.move			= move;
	this.toString = tostring();
	
	function move(moveDistance)		{ this.setLocationX(this.locationX + moveDistance); }
	function setShipSprite(ship)	{ enemyData.sprite.ship = ship; }
	function setFloatXRange(x)	{ enemyData.range.x = x; }
	function setFloatYRange(y)	{ enemyData.range.y = y; }
	function setOriginX(x)		{ enemyData.range.x = x; }
	function setOriginY(y)		{ enemyData.range.y = y; }
	function setLocationX(x)	{ enemyData.location.x = x; }
	function setLocationY(y)	{ enemyData.location.y = y; }
	function setEnemyType(type)	{ enemyData.type = type; }
	function setEnemyXSpeed(x)	{ enemyData.speed.x = x; }
	function setEnemyYSpeed(y)	{ enemyData.speed.y = y; }
	function setDirection(dir)	{ enemyData.dir = dir; }
	function setAngle(ang)		{ enemyData.angle = ang; }
	function getLasorSprite()	{ return enemyData.sprite.lasor; }
	function getShipSprite()	{ return enemyData.sprite.ship; }
	function getFloatXRange()	{ return enemyData.range.x || 0; }
	function getFloatYRange()	{ return enemyData.range.y || 0; }
	function getOriginX()		{ return enemyData.range.x || 0; }
	function getOriginY()		{ return enemyData.range.y || 0; }
	function getLocationX()		{ return enemyData.location.x; }
	function getLocationY()		{ return enemyData.location.y; }
	function getEnemyType()		{ return enemyData.type; }
	function getEnemyXSpeed()	{ return enemyData.speed.x || 0; }
	function getEnemyYSpeed()	{ return enemyData.speed.y || 0; }
	function getDirection()		{ return enemyData.dir; }
	function getAngle()		{ return enemyData.angle; }
	function tostring()		{ return "ENEMY: "+getEnemyType(); }
	function getEnemyClass()	{ return enemyData.className.ship; }
	function getEnemyLasor()	{ return enemyData.sprite.lasor; }
	
	function enemySpecs(enemyType){
		
		function randomEnemy(){
			var enemyIndex = Math.floor(Math.random()*enemyList.length);
			return enemySpecs(enemyList[enemyIndex]);
		}

		if(enemyType == "MAVERICK")
	 		return {
				type: "MAVERICK",
				angle: 0,
				location: {
					x: 0,
					y: 0
				},
				sprite: {
					ship: "&#9660;",
					lasor: "*"
				},
				className: {
					ship: ENEMYCLASS,
					lasor: ENEMYLASORCLASS
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
		else if(enemyType == "BLOCKADE")
			return {
				type: "BLOCKADE",
				angle: 0,
				location: {
					x: 0,
					y: 0
				},
				sprite: {
					ship: "&#8734;",
					lasor: null
				},
				className: {
					ship: ENEMYCLASS,
					lasor: ENEMYLASORCLASS
				},
				range:{
					x: 0,
					y: 0 
				},
				speed:{
					x: 10,
					y: 0
				}
			};
		else if(enemyType == "GUARD")
			return {
				type: "GUARD",
				angle: 0,
				location: {
					x: 0,
					y: 0
				},
				sprite: {
					ship: "U",
					lasor: "."
				},
				className: {
					ship: ENEMYCLASS,
					lasor: ENEMYLASORCLASS
				},
				range:{
					x: 0,
					y: 5 
				},
				speed:{
					x: 10,
					y: 1
				}
			};
		else
			return randomEnemy();
	}
}

module.exports = Enemy;