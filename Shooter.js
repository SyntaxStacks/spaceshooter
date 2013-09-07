var Enemy = require("./Enemy");

/*
::key input::
var RIGHT = 39;
var LEFT = 37;
var SPACE = 32;

var SHIPID = 'spaceship';
var LASORCLASS = 'lasor';
var LASOR = '|';

var FRAMEHEIGHT = 300;
var FRAMEWIDTH = 600;
var ENEMY_MOVEX = 1;
var ENEMY_UPDATE_DELAY = 30;
var ENEMYSCOREVALUE = 100;
var MENUSCREEN = 0;
var GAMESCREEN = 1;
var GAMEOVER = 2;
var GAMEFRAME = "gameframe";

var status = MENUSCREEN;
var level = 1;
var score = 0;
var delay = 10;
var lastEnemyUpdateTime = Date.now();

*/
function Shooter(){
	var lastEnemyUpdateTime = Date.now();
	var enemyList = null;
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
			var enemy = enemies[i];
			var enemyType = getElementType(enemy);
			var enemyObj = getEnemyObject(enemy);
			var enemyMoveDir = enemy.getAttribute("data-dir");

			if(enemyMoveDir != 1 && enemyMoveDir != -1){
				var dir = (Math.random() <= 0.5)? -1 : 1;
				enemy.setAttribute("data-dir", dir);
			}

			var deg = (angleBetweenElements(enemy, spaceship));
			rotateElement(enemy, deg);

			if(currentTime - lastEnemyUpdateTime > ENEMY_UPDATE_DELAY ){
				var enemyX = getElementMarginLeft(enemy);
				var enemyXOrigin = parseInt(enemy.getAttribute("data-originX"));

				if(enemyX < enemyXOrigin - getFloatXRange(enemyObj)){
					enemy.setAttribute("data-dir", "1");
				} else 
				if(enemyX > enemyXOrigin + getFloatXRange(enemyObj)){
					enemy.setAttribute("data-dir", "-1");
				}

				var newEnemyLocation =  getEnemyXSpeed(enemyObj) * enemyMoveDir;
				setElementMargin(enemy, newEnemyLocation);

				//blockade specific
				if(getElementType(enemy) == "BLOCKADE" ||getElementType(enemy) == "GUARD") {
					if(Math.abs(enemyX - enemyXOrigin) <= getEnemyXSpeed(enemyObj) )
						enemy.style.marginLeft = enemyXOrigin;
				}
				
					
			}	

			var enemyLasorSprite = getEnemyLasor(getEnemyObject(enemy));
			if(enemyLasorSprite)
				if(enemyType == "GUARD" && Math.abs(enemyX - shipX) < 50)
					enemyShoot(enemy);
				else if(Math.random() >= 0.9 && elementsOfClass(ENEMYLASORCLASS).length < elementsOfClass(ENEMYCLASS).length)
				enemyShoot(enemy);
		}
		
		if(currentTime - lastEnemyUpdateTime > ENEMY_UPDATE_DELAY )
			lastEnemyUpdateTime = Date.now();
	}

	function checkForHit(){
		var lasors = elementsOfClass(LASORCLASS);
		var enemyLasors = elementsOfClass(ENEMYLASORCLASS);
		var enemies = elementsOfClass(ENEMYCLASS);

		for(var i = 0; i < lasors.length; i++){
			for(var j = 0; j < enemies.length; j++){
				var currentLasor = lasors[i];
				var currentEnemy = enemies[j];

				var currentLasorX = parseInt(currentLasor.style.marginLeft) || 0;
				var currentLasorY = parseInt(currentLasor.style.marginTop) || 0;
				var currentEnemyX = parseInt(currentEnemy.style.marginLeft) || 0;
				var currentEnemyY = parseInt(currentEnemy.style.marginTop) || 0;

				if(currentLasorX > currentEnemyX - 5 && currentLasorX < currentEnemyX + 15){
					if(currentLasorY < currentEnemyY && currentLasorY > currentEnemyY - 10){
						addPoints();
						removeElement(currentEnemy);
					}
				}	
			}
		}

		if(elementsOfClass(ENEMYCLASS).length == 0){
			createNewLevel();
		}	

		for(var i = 0; i < enemyLasors.length; i++){
			var currentLasor = enemyLasors[i];
			var ship = elementWithId(SHIPID);

			var currentLasorX = parseInt(currentLasor.style.marginLeft) || 0;
			var currentLasorY = parseInt(currentLasor.style.marginTop) || 0;
			var shipX = parseInt(ship.style.marginLeft) || 0;
			var shipY = parseInt(ship.style.marginTop) || 0;

			if(currentLasorX > shipX - 5 && currentLasorX < shipX + 30){
				if(currentLasorY > shipY && currentLasorY < shipY + 10){
					//removeElement(currentEnemy);
					endGame();
					console.log("dedz");
				}
			}	
		}
	}

	function updateLasorPosition(){
		var nodeList = elementsOfClass(LASORCLASS);
		for(var i = 0; i < nodeList.length; i++) {
			var e = nodeList[i];
			if(getElementMarginTop(e) < 0){
				removeElement(e);
				continue;
			}
	    	
	    	e.style.marginTop = getElementMarginTop(e) - 5;
		}
	}

	function startGame(){
		level = 0;
		score = 0;
		status = GAMESCREEN;

		document.body.innerHTML = '<!-- Space Shooter --> '+
		'<canvas id="'+GAMEFRAME+'"></canvas>';
	}

	function endGame(){
		status = GAMEOVER;

		document.body.innerHTML = "DEDZ <input type='button' onClick='startGame();' value='replay'>";
	}

	function addPoints(){
		score += ENEMYSCOREVALUE;
		updateScoreBoard();
	}

	function createNewLevel(){
		level++;
		updateLevelBoard();
		for(var i = 0; i < level; i++){
			var enemy = randomEnemy();
			enemy.style.marginLeft = -50*i;
		}
	}

	function randomEnemy(){
		var enemyIndex = Math.floor(Math.random()*enemyList.length);
		return createEnemy(enemyList[enemyIndex]);
	}

	function updateScoreBoard(){
		var scoreboard = elementWithId("score");

		scoreboard.innerHTML = "SCORE: " + score;

	}

	function updateLevelBoard(){
		var scoreboard = elementWithId("level");

		scoreboard.innerHTML = "LEVEL: " + level;
	}

	function run(){
		
		if (status == GAMESCREEN){
			updateLasorPosition();
			updateEnemyLasorPosition()
			checkForHit();
			updateEnemyPosition();
		}
		else if(status == MENUSCREEN){
			
		}

		else if(status == GAMEOVER){

		}
	}
}