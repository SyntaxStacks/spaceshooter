/*
::key input::
var RIGHT = 39;
var LEFT = 37;
var SPACE = 32;

var SHIPID = 'spaceship';
var LASORCLASS = 'lasor';
var LASOR = '|';


var ENEMY_MOVEX = 1;

var ENEMYSCOREVALUE = 100;
v
var lastEnemyUpdateTime = Date.now();

*/
/*function updateEnemyLasorPosition(){

	var nodeList = elementsOfClass(ENEMYLASORCLASS);
	for(var i = 0; i < nodeList.length; i++) {
		var lasor = nodeList[i];
		var originY = parseInt(lasor.getAttribute("data-originY"));
    	var originX = parseInt(lasor.getAttribute("data-originX"));
		var angle = lasor.getAttribute("data-angle");
    	
		
		if(getElementMarginTop(lasor) > FRAMEHEIGHT){
			removeElement(lasor);
			continue;
		}
    	
    	
    	var lasorMoveY = getElementMarginTop(lasor) + 1;
    	lasor.style.marginTop = lasorMoveY;

    	var lasorMoveX = originX + ((originY - lasorMoveY)*Math.tan(angle));
    	lasor.style.marginLeft = lasorMoveX;

	}
}*/
function Shooter(canvas){
	var canvas = new GameCanvas(canvas);
	var frame = 0;

	var lastEnemyUpdateTime = Date.now();
	var enemyList = [];

	var FRAMEHEIGHT = 300;
	var FRAMEWIDTH = 600;
	var ENEMYSCOREVALUE = 100;
	var MENUSCREEN = 0;
	var GAMESCREEN = 1;
	var GAMEOVER = 2;
	var GAMEFRAME = "gameframe";
	var status = GAMESCREEN;
	var level = 1;
	var score = 0;
	var delay = 10;
	var ENEMY_UPDATE_DELAY = 30;
	var enemyList = [];
	var ship = new Ship("PLAYER");

	this.enemies = getEnemies;
	this.run = run;
	this.draw = draw;

	function getEnemies(){
		return enemyList;
	}

	function getShip(){
		return ship;
	}

	function getLasors(){
		return null;
	}

	function getShipLasors(){
		return null;
	}

	function getLevel(){
		return level;
	}

	function addLevel(){
		level++;
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


	function getEnemies(){
		return enemyList;
	}

	function getShip(){
		return ship;
	}

	function updateEnemyPosition(){
		var currentTime = Date.now();
		
		var enemies = getEnemies();
		var spaceship = getShip();
		var shipX = spaceship.locationX();

		for(var i = 0; i < enemies.length; i++){
			var enemy        = enemies[i];
			var enemyType    = enemy.type();
			var enemyMoveDir = enemy.dir();

			if(enemyMoveDir != 1 && enemyMoveDir != -1){
				var dir = (Math.random() <= 0.5)? -1 : 1;
				enemy.setDir(dir);
			}

			var deg = (angleBetweenObjects(enemy, spaceship));
			enemy.setAngle(deg);

			if(currentTime - lastEnemyUpdateTime > ENEMY_UPDATE_DELAY ){
				var enemyX = enemy.locationX();
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

			var enemyLasorSprite = enemy.lasorSprite();
			if(enemyLasorSprite)
				if(enemyType == "GUARD" && Math.abs(enemyX - shipX) < 50)
					;//enemyShoot(enemy);
				else if(Math.random() >= 0.9 && getLasors().length < getEnemies().length)
					;//enemyShoot(enemy);
		}
		
		if(currentTime - lastEnemyUpdateTime > ENEMY_UPDATE_DELAY )
			lastEnemyUpdateTime = Date.now();
	}

	function checkForHit(){
		var lasors = getShipLasors();
		var enemyLasors = getLasors();
		var enemies = getEnemies();

		/*for(var i = 0; i < lasors.length; i++){
			for(var j = 0; j < enemies.length; j++){
				var currentLasor = lasors[i];
				var currentEnemy = enemies[j];

				var currentLasorX = currentLasor.locationX() || 0;
				var currentLasorY = currentLasor.locationY() || 0;
				var currentEnemyX = currentEnemy.locationX() || 0;
				var currentEnemyY = currentEnemy.locationY() || 0;

				if(currentLasorX > currentEnemyX - 5 && currentLasorX < currentEnemyX + 15){
					if(currentLasorY < currentEnemyY && currentLasorY > currentEnemyY - 10){
						addPoints();
						removeElement(currentEnemy);
					}
				}	
			}
		}*/

		if(getEnemies().length == 0){
			createNewLevel();
		}	

		/*for(var i = 0; i < enemyLasors.length; i++){
			var currentLasor = enemyLasors[i];
			var ship = getShip();

			var currentLasorX = currentLasor.locationX() || 0;
			var currentLasorY = currentLasor.locationY() || 0;
			var shipX         = ship.locationX() || 0;
			var shipY         = ship.locationY() || 0;

			if(currentLasorX > shipX - 5 && currentLasorX < shipX + 30){
				if(currentLasorY > shipY && currentLasorY < shipY + 10){
					//removeElement(currentEnemy);
					endGame();
					console.log("dedz");
				}
			}	
		}*/
	}

	function draw(canvas){

		
		var ctx = canvas;
		ctx.fillRect(0,0,FRAMEWIDTH,FRAMEHEIGHT);   // Draw a rectangle with default settings
		ctx.save();

		var enemies = getEnemies();
		for(var i = 0; i < enemies.length; i++){
			enemy = enemyList[i];
			enemy.draw(ctx);
		}
		ctx.restore();
		return ctx;
	}

	function updateLasorPosition(){
		var lasors = getShipLasors();
		for(var i = 0; i < lasors.length; i++) {
			var lasor = lasors[i];
			if(lasor.locationY < 0){
				//TODO: REMOVE OFFSCREEN ELEMENT  removeElement(e);
				continue;
			}
	    	
	    	lasor.setLocationY(lasor.locationY - 5);
		}
	}

	function startGame(){
		level = 0;
		score = 0;
		status = GAMESCREEN;

		//document.body.innerHTML = '<!-- Space Shooter --> '+
		//'<canvas id="'+GAMEFRAME+'"></canvas>';
	}

	function endGame(){
		status = GAMEOVER;

		//document.body.innerHTML = "DEDZ <input type='button' onClick='startGame();' value='replay'>";
	}

	function addPoints(){
		score += ENEMYSCOREVALUE;
		//updateScoreBoard();
	}

	function createNewLevel(){
		addLevel();
		//updateLevelBoard();
		for(var i = 0; i < level; i++){
			newEnemy = new Enemy()
			newEnemy.setLocationX(-50*i);
			enemyList.push(newEnemy);
		}
	}

	function updateScoreBoard(){
		var scoreboard = elementWithId("score");

		scoreboard.innerHTML = "SCORE: " + score;

	}

	function updateLevelBoard(){
		var scoreboard = getLevel("level");

		scoreboard.innerHTML = "LEVEL: " + level;
	}

	function run(){
		
		
		if (status == GAMESCREEN){
			//updateLasorPosition();
			//updateEnemyLasorPosition()
			checkForHit();
			updateEnemyPosition();
		}
		else if(status == MENUSCREEN){
			
		}

		else if(status == GAMEOVER){

		}

		canvas.draw(draw);
	}
};

define(['GameCanvas', 'Enemy', 'Ship'], function(){ return Shooter; });
