var enemy = null;

function Enemy(type){

	enemy = enemySpecs(type.toUpperCase());
	
	enemy.xorigin = (Math.random()*(FRAMEWIDTH - 2 * getFloatXRange(enemyObj))) + getFloatXRange(enemyObj);
	enemy.yorigin = 40;
	enemy.dir = 0;
	enemy.location.x = 0;
	enemy.location.y = enemy.yorigin;

	return enemy;

	this.prototype.getShipSprite = getShipSprite(enemy);
	this.prototype.getFloatXRange = getFloatXRange(enemy);
	this.prototype.getFloatYRange = getFloatYRange(enemy);
	this.prototype.getOriginX = getOriginX(enemy);
	this.prototype.getOriginY = getOriginY(enemy);
	this.prototype.getEnemyClass = getEnemyClass(enemy);
	this.prototype.getEnemyLasor = getEnemyLasor(enemy);
	this.prototype.getElementType = getElementType(enemy);
	this.prototype.getEnemyXSpeed = getEnemyXSpeed(enemy);
	this.prototype.getEnemyYSpeed = getEnemyYSpeed(enemy);

}

function getShipSprite(){
	return enemy.sprite.ship;
}

function getFloatXRange(){
	return enemy.range.x || 0;
}

function getFloatYRange(){
	return enemy.range.y || 0;
}

function getOriginXRange(){
	return enemy.range.x || 0;
}

function getOriginYRange(){
	return enemy.range.y || 0;
}

function getEnemyClass(){
	return enemy.className.ship;
}

function getEnemyLasor(){
	return enemy.sprite.lasor;
}

function getEnemyType(element){
	return enemy.type;
}

function getEnemyXSpeed(){
	return enemy.speed.x || 0;
}

function getEnemyYSpeed(){
	return enemy.speed.y || 0;
}

function enemySpecs(enemyType){

	if(enemyType == "MAVERICK")
		return {
			type: "MAVERICK",
			location: {
				x: 0,
				y: 0
			}
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
	if(enemyType == "BLOCKADE")
		return {
			type: "BLOCKADE",
			location: {
				x: 0,
				y: 0
			}
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
	if(enemyType == "GUARD")
		return {
			type: "GUARD",
			location: {
				x: 0,
				y: 0
			}
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
}