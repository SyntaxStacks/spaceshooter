function Enemy(type){

	var enemyList           = ['MAVERICK', 'BLOCKADE', 'GUARD'];
	var ENEMYLASORCLASS     = 'enemyLasor';
	var ENEMYCLASS          = 'enemy';
	var FRAMEHEIGHT         = 300;
	var FRAMEWIDTH          = 600;
	var ENEMY_UPDATE_DELAY  = 30;
	var lastEnemyUpdateTime = Date.now();
	var destroy             = false;
	var status              = 'alive';
	var sprites             = null;
	var explosionFrame      = 0;
	var loadImage           = document.createElement('img');
	loadImage.src           = './img/sprites.png';
	loadImage.onload        = function(){
		sprites               = loadImage;
	}

	var enemyData           = enemySpecs(type? type.toUpperCase() : "");

	this.angle              = getAngle;
	this.blowUp             = startDestroySequence;
	this.dir                = getDirection;
	this.draw               = draw;
	this.floatXRange        = getFloatXRange;
	this.floatYRange        = getFloatYRange;
	this.getCenter          = getCenter;
	this.height             = getSpriteHeight;
	this.isDestroyed        = getDestroy;
	this.lasors             = getLasors;
	this.lasorSprite        = getLasorSprite;
	this.locationX          = getLocationX;
	this.locationY          = getLocationY;
	this.move               = move;
	this.originX            = getOriginX;
	this.originY            = getOriginY;
	this.update             = update;
	this.setShipSprite      = setShipSprite;
	this.setFloatXRange     = setFloatXRange;
	this.setFloatYRange     = setFloatYRange;
	this.setOriginX         = setOriginX;
	this.setOriginY         = setOriginY;
	this.setLocationX       = setLocationX;
	this.setLocationY       = setLocationY;
	this.setType            = setEnemyType;
	this.setXSpeed          = setEnemyXSpeed;
	this.setYSpeed          = setEnemyYSpeed;
	this.setDir             = setDirection;
	this.setAngle           = setAngle;
	this.shipSprite         = getShipSprite;
	this.shoot              = shoot;
	this.status             = getStatus;
	this.type               = getEnemyType;
	this.width              = getSpriteWidth;
	this.xSpeed             = getEnemyXSpeed;
	this.ySpeed             = getEnemyYSpeed;
	this.getHitBox = getHitBox;
	this.toString           = tostring();

	this.setOriginX((Math.random()*(FRAMEWIDTH - 2 * getFloatXRange())) + getFloatXRange());
	//enemyData.location.y = 100;
	this.setDir(0);
	
	function addLasor(lasor)     { enemyData.lasor.push(lasor); }
	function getAngle()          { return enemyData.angle; }
	function getCenter()         { return                                                { x: getLocationX() + (getSpriteWidth()/2), y: getLocationY() + (getSpriteHeight()/2) }};// { return { x: this.locationX() + (this.width()/2), y: this.locationY() + (this.height()/2) }; }
	function getDestroy()        { return destroy;}
	function getDirection()      { return enemyData.dir; }
	function getEnemyClass()     { return enemyData.className.ship; }
	function getEnemyLasor()     { return enemyData.sprite.lasor; }
	function getEnemyXSpeed()    { return enemyData.speed.x || 0; }
	function getEnemyYSpeed()    { return enemyData.speed.y || 0; }
	function getFloatXRange()    { return enemyData.range.x || 0; }
	function getFloatYRange()    { return enemyData.range.y || 0; }
	function getLasors()         { return enemyData.lasor; }
	function getSpriteOriginX()  { return enemyData.sprite.x; }
	function getSpriteOriginY()  { return enemyData.sprite.y; }
	function getSpriteWidth()    { return enemyData.sprite.width; }
	function getSpriteHeight()   { return enemyData.sprite.height; }
	function getStatus()         { return status; }
	function getLasorSprite()    { return enemyData.sprite.lasor; }
	function getShipSprite()     { return enemyData.sprite.ship; }
	function getOriginX()        { return enemyData.origin.x || 0; }
	function getOriginY()        { return enemyData.origin.y || 0; }
	function getLocationX()      { return enemyData.location.x; }
	function getLocationY()      { return enemyData.location.y; }
	function getEnemyType()      { return enemyData.type; }
	function move(moveDistance)  { this.setLocationX(this.locationX() + moveDistance); }
	function setAngle(ang)       { enemyData.angle = ang; }
	function setDirection(dir)   { enemyData.dir = dir; }
	function setEnemyType(type)  { enemyData.type = type; }
	function setEnemyXSpeed(x)   { enemyData.speed.x = x; }
	function setEnemyYSpeed(y)   { enemyData.speed.y = y; }
	function setFloatXRange(x)   { enemyData.range.x = x; }
	function setFloatYRange(y)   { enemyData.range.y = y; }
	function setLocationX(x)     { enemyData.location.x = x; }
	function setLocationY(y)     { enemyData.location.y = y; }
	function setOriginX(x)       { enemyData.origin.x = x; }
	function setOriginY(y)       { enemyData.origin.y = y; }
	function setShipSprite(ship) { enemyData.sprite.ship = ship; }
	function kill(){ destroy = true; }

	function tostring()          { return "ENEMY: "+getEnemyType(); }

	
	function getHitBox() { 
		return {
			x1: getLocationX(),
			y1: getLocationY(),
			x2: getLocationX() + getSpriteWidth(),
			y2: getLocationY() + getSpriteHeight()
		}
	}

	function draw(canvas) {

		canvas.save();
		drawLasors(canvas);
		drawEnemy(canvas);
		canvas.restore();

		return canvas;
	}

	function drawEnemy(canvas) {

		var events = {
			alive: drawEnemyAlive,
			dying: drawEnemyDying
		};

		events[getStatus()](canvas);
	}

	function drawEnemyAlive(canvas) {
		var translateX = getCenter().x,
		    translateY = getCenter().y;
		canvas.save();
		canvas.translate( translateX, translateY);
		canvas.rotate(getAngle());
		canvas.translate(-(translateX), -(translateY));
		canvas.drawImage(sprites, getSpriteOriginX(), getSpriteOriginY(), getSpriteWidth(), getSpriteHeight(),
					getLocationX(), getLocationY(), getSpriteWidth(), getSpriteHeight());
		canvas.rotate(0);
		canvas.restore();
	}

	function drawEnemyDying(canvas) {
			var exp = explosion();
			canvas.drawImage(sprites, exp.sprite.x, exp.sprite.y, exp.sprite.width, exp.sprite.height,
						getCenter().x - (exp.sprite.width/2), getCenter().y - (exp.sprite.height/2), exp.sprite.width, exp.sprite.height); 
	}

	function drawLasors(canvas) {
		canvas.save();
		if(getLasors() != null)
			for(var i = 0, lasors = getLasors(); i < lasors.length ; i++) { lasors[i].draw(canvas); }
		canvas.restore();
	}

	function shoot(ship) {
		
		var originY = getOriginY();
		var originX = getOriginX();
		var angle = angleBetweenObjects(this, ship);
		var velocityY = 1;
		var velocityX = ((originY - 1)*Math.tan(angle));
		
		if(getLasors().length >= 2 && this.type() != "GUARD")
			return false;
		lasor = new Lasor(this, ship, velocityX, velocityY);
		addLasor(lasor);
	}

	function update(ship) {
		var currentTime = Date.now();
		
		if(status == 'alive') {
			var spaceship = ship;
			var enemy        = this;
			var shipX = spaceship.locationX();
			var enemyX = enemy.locationX();

			var enemyType    = enemy.type();
			var enemyMoveDir = enemy.dir();

			if(enemyMoveDir != 1 && enemyMoveDir != -1) {
				var dir = (Math.random() <= 0.5)? -1 : 1;
				enemy.setDir(dir);
			}

			var deg = (angleBetweenObjects(enemy, spaceship));
			enemy.setAngle(deg);

			if(currentTime - lastEnemyUpdateTime > ENEMY_UPDATE_DELAY ) {
				var enemyXOrigin = enemy.originX();

				if(enemyX < enemyXOrigin - enemy.floatXRange()) {
					enemy.setDir(1);
				} else 
				if(enemyX > enemyXOrigin + enemy.floatXRange()) {
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

			if(this.type() != "BLOCKADE") {
				if(enemyType == "GUARD" && Math.abs(enemyX - shipX) < 16)
					this.shoot(spaceship);
				else if(enemyType != "GUARD" && Math.random() >= 0.9)
					this.shoot(spaceship);
			}

			if(currentTime - lastEnemyUpdateTime > ENEMY_UPDATE_DELAY )
				lastEnemyUpdateTime = Date.now();
		}
		else if(status == 'dying') {
			if(currentTime - lastEnemyUpdateTime > ENEMY_UPDATE_DELAY ) {
				if(explosionFrame < 0 && getLasors().length == 0)
					kill();
				else
					explosionFrame--;

				lastEnemyUpdateTime =  Date.now();
			}

		}
		updateEnemyLasorPosition();
	}

	function updateEnemyLasorPosition() {

		var lasors = getLasors() || [];

		for (var i = 0; i < lasors.length; i++) {
			var lasor = lasors[i];
			lasor.update();	
			if(lasor.isDestroyed())
				lasors.splice(i, 1);
		}
	}

	function enemySpecs(enemyType) {
		
		var ENEMYSPRITEWIDTH = 16;
		var ENEMYSPRITEHEIGHT = 16
		var spriteXIndex = 0;
		var spriteYIndex = 3;

		function randomEnemy() {
			var enemyIndex = Math.floor(Math.random()*enemyList.length);
			return enemySpecs(enemyList[enemyIndex]);
		}

		if(enemyType == "MAVERICK") {
			spriteXIndex = 8;
			spriteYIndex = 3;
	 		return {
				type: "MAVERICK",
				angle: 0,
				location: {
					x: 0,
					y: 40
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
				range: {
					x: 50,
					y: 50
				},
				speed: {
					x: 3,
					y: 0
				},
				lasor: []
			}
		}
		else if(enemyType == "BLOCKADE") {
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
				range: {
					x: 0,
					y: 0 
				},
				speed: {
					x: 10,
					y: 0
				},
				lasor: []
			}
		}
		else if(enemyType == "GUARD") {
			spriteXIndex = 2;
			spriteYIndex = 3;
			return {
				type: "GUARD",
				angle: 0,
				location: {
					x: 0,
					y: 60
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
				range: {
					x: 0,
					y: 5 
				},
				speed: {
					x: 10,
					y: 1
				},
				lasor: []
			}
		}
		else
			return randomEnemy();
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
				height: EXPLOSIONSPRITEHEIGHT
			},
		}
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

	function startDestroySequence() {
		explosionFrame = 4;
		status = 'dying';
	}

}

define(['Lasor'], function(Lasor){ return Enemy; });
