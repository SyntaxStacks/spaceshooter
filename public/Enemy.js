function Enemy(type){

	var enemyList = ['MAVERICK', 'BLOCKADE', 'GUARD'];
	var ENEMYLASORCLASS = 'enemyLasor';
	var ENEMYCLASS = 'enemy';
	var FRAMEHEIGHT = 300;
	var FRAMEWIDTH = 600;
	var ENEMY_UPDATE_DELAY = 30;
	var lastEnemyUpdateTime = Date.now();
	var loadImage = document.createElement('img');
	var sprites = null;
	loadImage.src = 'sprites.png';
	loadImage.onload = function(){
		sprites = loadImage;
	}

	var enemyData = enemySpecs(type? type.toUpperCase() : "");

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
	this.width 			= getSpriteWidth;
	this.height 		= getSpriteHeight;
	this.draw 			= draw;
	this.update 		= update;
	this.move			= move;
	this.shoot			= shoot;
	this.lasors 		= getLasors;
	this.toString = tostring();

	this.setOriginX((Math.random()*(FRAMEWIDTH - 2 * getFloatXRange())) + getFloatXRange());
	//enemyData.location.y = 100;
	this.setDir(0);
	
	function move(moveDistance)		{ this.setLocationX(this.locationX() + moveDistance); }
	function setShipSprite(ship)	{ enemyData.sprite.ship = ship; }
	function setFloatXRange(x)	{ enemyData.range.x = x; }
	function setFloatYRange(y)	{ enemyData.range.y = y; }
	function setOriginX(x)		{ enemyData.origin.x = x; }
	function setOriginY(y)		{ enemyData.origin.y = y; }
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
	function getOriginX()		{ return enemyData.origin.x || 0; }
	function getOriginY()		{ return enemyData.origin.y || 0; }
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
	function getLasors()		{ return enemyData.lasor; }
	function addLasor(lasor)	{ enemyData.lasor.push(lasor); }
	function getSpriteOriginX()	{ return enemyData.sprite.x; }
	function getSpriteOriginY()	{ return enemyData.sprite.y; }
	function getSpriteWidth()	{ return enemyData.sprite.width; }
	function getSpriteHeight()	{ return enemyData.sprite.height; }
	function getLasors()		{ return enemyData.lasor; }

	function draw(canvas){

		var ctx = canvas;
		ctx.save();
		ctx.translate(this.locationX()+this.width()/2, this.locationY()+this.height()/2);
		ctx.rotate(this.angle());
		ctx.translate(-this.width()/2, -this.height()/2);
		ctx.drawImage(sprites, getSpriteOriginX(), getSpriteOriginY(), getSpriteWidth(), getSpriteHeight(),
					0, 0, this.width(), this.height()); //this.locationX(), this.locationY(), 10, 10);
		ctx.rotate(0);
		ctx.restore();

		ctx.save()
		var lasors = getLasors();
		ctx.fillStyle = "#F00";
		if(lasors != null){
			for(var i = 0; i < lasors.length; i++){
				var lasor = lasors[i];

				ctx.fillRect(lasor.x,lasor.y,3,3);
			}
		}
		ctx.restore();

		return ctx;
	}

	function shoot(ship){
		if(getLasors().length >= 2 && this.type() != "GUARD")
			return false;

		var ship = ship;
		var angle = angleBetweenObjects(this, ship);
		var lasor = {
			type: this.type(),
			angle: angle,
			origin:{
				x: this.locationX(),
				y: this.locationY()
			},
			x: this.locationX(),
			y: this.locationY()
		};
		addLasor(lasor);
	}

	function update(ship){
		var currentTime = Date.now();
		
		var spaceship = ship;
		var enemy        = this;
		var shipX = spaceship.locationX();
		var enemyX = enemy.locationX();

		var enemyType    = enemy.type();
		var enemyMoveDir = enemy.dir();

		if(enemyMoveDir != 1 && enemyMoveDir != -1){
			var dir = (Math.random() <= 0.5)? -1 : 1;
			enemy.setDir(dir);
		}

		var deg = (angleBetweenObjects(enemy, spaceship));
		enemy.setAngle(deg);

		if(currentTime - lastEnemyUpdateTime > ENEMY_UPDATE_DELAY ){
			var enemyXOrigin = enemy.originX();

			if(enemyX < enemyXOrigin - enemy.floatXRange()){
				enemy.setDir(1);
			} else 
			if(enemyX > enemyXOrigin + enemy.floatXRange()){
				enemy.setDir(-1);
			}

			var enemyNextMove =  enemy.xSpeed() * enemyMoveDir;
			enemy.move(enemyNextMove);

			//blockade specific
			if(enemy.type() == "BLOCKADE" || enemy.type() == "GUARD") {
				if(Math.abs(enemyX - enemyXOrigin) <= enemy.xSpeed() )
					enemy.setLocationX(enemyXOrigin);
			}	
		}	

		if(this.type() != "BLOCKADE"){
			if(enemyType == "GUARD" && Math.abs(enemyX - shipX) < 16)
				this.shoot(spaceship);
			else if(enemyType != "GUARD" && Math.random() >= 0.9)
				this.shoot(spaceship);
		}

		if(currentTime - lastEnemyUpdateTime > ENEMY_UPDATE_DELAY )
			lastEnemyUpdateTime = Date.now();

		updateEnemyLasorPosition();
	}

	function updateEnemyLasorPosition(){

		var lasors = getLasors();
		if(lasors == null) return;
		for(var i = 0; i < lasors.length; i++) {
			var lasor = lasors[i];
			if(lasor.y > FRAMEHEIGHT){
				getLasors().splice(i, 1);
				continue;
			}

			var originY = lasor.origin.y;
	    	var originX = lasor.origin.x;
			var angle = lasor.angle;
	    	var lasorMoveY = lasor.y + 1;
	    	lasor.y = lasorMoveY;

	    	var lasorMoveX = originX + ((originY - lasorMoveY)*Math.tan(angle));
	    	lasor.x = lasorMoveX;

		}
	}
	

	function enemySpecs(enemyType){
		
		var ENEMYSPRITEWIDTH = 16;
		var ENEMYSPRITEHEIGHT = 16
		var spriteXIndex = 0;
		var spriteYIndex = 3;

		function randomEnemy(){
			var enemyIndex = Math.floor(Math.random()*enemyList.length);
			return enemySpecs(enemyList[enemyIndex]);
		}

		if(enemyType == "MAVERICK"){
			spriteXIndex = 8;
			spriteYIndex = 3;
	 		return {
				type: "MAVERICK",
				angle: 0,
				location: {
					x: 0,
					y: 0
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
				},
				lasor: []
			}
		}
		else if(enemyType == "BLOCKADE"){
			spriteXIndex = 5;
			spriteYIndex = 3;
			return {
				type: "BLOCKADE",
				angle: 0,
				location: {
					x: 0,
					y: 0
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
				},
				lasor: null
			}
		}
		else if(enemyType == "GUARD"){
			spriteXIndex = 2;
			spriteYIndex = 3;
			return {
				type: "GUARD",
				angle: 0,
				location: {
					x: 0,
					y: 0
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
				},
				lasor: []
			}
		}
		else
			return randomEnemy();
	}

	function angleBetweenObjects(obj1, obj2){
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

define(function(){ return Enemy; });