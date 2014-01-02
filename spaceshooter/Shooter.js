function Shooter(canvas) {
	var canvas          = new GameCanvas(canvas);
	var input           = new GameInput();
	var scoreboard      = new UI();
	var enemyList       = [];

	var FRAMEHEIGHT     = 300;
	var FRAMEWIDTH      = 600;
	var ENEMYSCOREVALUE = 100;
	var MENUSCREEN      = 'MENUSCREEN';
	var GAMESCREEN      = 'GAMESCREEN';
	var GAMEOVER        = 'GAMEOVER';
	var GAMEFRAME       = "gameframe";
	var status          = GAMESCREEN;
	var delay           = 10;
	var enemyList       = [];
	var ship            = new Ship("PLAYER");

	this.enemies        = getEnemies;
	this.run            = run;
	this.draw           = draw;

	function getEnemies()    { return enemyList; }
	function getShip()       { return ship; }
	function getShipLasors() { return getShip().lasors(); }
	function getShipBombs() { return getShip().bombs(); }
	function getLevel()      { return level; }
	function addLevel()      { level++; }

	function draw(canvas) {
		canvas.rotate(0);
		canvas.translate(0,0);
		canvas.save();

		canvas.fillRect(0,0,FRAMEWIDTH,FRAMEHEIGHT);
		
		if (status == GAMESCREEN) {
			drawGameScreen(canvas);
		}
		else if (status == GAMEOVER) {
			drawGameOver(canvas);
		}

	}

	function drawGameScreen(canvas) {
		
		getShip().draw(canvas);
		canvas.restore();
		canvas.save();
		drawEnemies(canvas);
		canvas.restore();

		canvas.save();
		scoreboard.draw(canvas);
		canvas.restore();
	}

	function drawGameOver(canvas) {
		canvas.save();
		canvas.fillStyle = "#FFF";
		canvas.fillText("GAME OVER!!!!!!1", 30, 30);
		canvas.fillText("SCORE: " + scoreboard.score(), 30, 50);
		canvas.fillText("PLEASE PRESS SHOOT", 30, 80);
		canvas.restore();
	}

	function drawEnemies(canvas) {
		var enemies = getEnemies();
		for(var i = 0, enemy = enemies[i]; i < enemies.length || 0; enemy = enemies[++i]) { enemy.draw(canvas); }
	}

	function getEnemyLasors() {
		var lasors = [];
		var enemies = getEnemies();
		for(var i = 0; i < enemies.length; i++) {
			var enemyLasors = enemies[i].lasors();
			if(enemyLasors == null) continue;
			for(var j = 0; j < enemyLasors.length; j++)
				lasors.push(enemyLasors[j]);
		}
		return lasors;
	}

	function collides(obj1, obj2) {
		var obj1Hitbox = obj1.getHitBox();
		var obj2Hitbox = obj2.getHitBox();

		if(obj1Hitbox.y1 < obj2Hitbox.y2 && obj1Hitbox.y1 > obj2Hitbox.y1) {
			if(obj1Hitbox.x1 > obj2Hitbox.x1 && obj1Hitbox.x1 < obj2Hitbox.x2) {
				return true;
			}
		}	

		return false;
	}

	function checkForHit() {
		var lasors = getShipLasors();
		var bombs = getShipBombs();
		var enemyLasors = getEnemyLasors();
		var enemies = getEnemies();

		for(var j = 0; j < enemies.length; j++) {
			var currentEnemy = enemies[j];
			for(var i = 0; i < lasors.length; i++) {
				var currentLasor = lasors[i];

				if(currentEnemy.status() == 'alive') {
					if(collides(currentLasor, currentEnemy)) {
						scoreboard.addPoints(100);
						currentEnemy.blowUp();
					}
				}
			}
			for(var k = 0; k < bombs.length; k++) {
				var currentBomb = bombs[k];
				if(currentEnemy.status() == 'alive') {
					if(collides(currentEnemy, currentBomb)) {
						scoreboard.addPoints(100);
						currentEnemy.blowUp();
					}
				}
			}
		}


		if(getEnemies().length == 0) {
			createNewLevel();
		}	

		for(var i = 0; i < enemyLasors.length; i++) {
			var currentLasor = enemyLasors[i];
			var ship = getShip();

			var currentLasorX = currentLasor.x() || 0;
			var shipX         = ship.locationX() || 0;

			if(currentLasorX > shipX - 5 && currentLasorX < shipX + 20) {
				var currentLasorY = currentLasor.y() || 0;
				var shipY         = ship.locationY() || 0;
				if(currentLasorY > shipY && currentLasorY < shipY + 10) {
					//removeElement(currentEnemy);
					endGame();
					console.log("dedz");
				}
			}	
		}
	}

	function startGame() {
		scoreboard.reset();
		status = GAMESCREEN;
	}

	function endGame() {
		status = GAMEOVER;
		enemyList = [];
		//document.body.innerHTML = "DEDZ <input type='button' onClick='startGame();' value='replay'>";
	}

	function createNewLevel() {
		scoreboard.addLevel();
		getShip().replenishBombs();
		for(var i = 0; i < scoreboard.level()*2; i++) {
			newEnemy = new Enemy()
			newEnemy.setLocationX(-50*i);
			enemyList.push(newEnemy);
		}
	}

	function updateSprites() {
		getShip().update(input.get());

		var enemies = getEnemies();
		for(var i = 0; i < enemies.length; i++) {

			enemies[i].update(getShip());
		}
	}

	function removeDestroyedObjects(){
		var enemies = getEnemies();
		for(var i = 0; i < enemies.length; i++) {
			var enemy = enemies[i];
			if(enemy == undefined)
				continue;

			if(enemy.isDestroyed() == true) {
				enemies.splice(i, 1);
			}
		}
	}

	function updateUI() {
		scoreboard.setBombs(getShip().bombCount());
	}

	function checkForRestart() {
		events = input.get();
		for(var i = 0; i < events.length; i++) {
			event = events[i];
			if(event.input == "SPACE" || (event.input == "LEFT" && event.input == "RIGHT") )
				startGame();
			if(event.input == "e") {
				startGame();
				for(var i = 0; i <100; i++)
					scoreboard.addLevel();
				enemyList = [];
			}
		}
	}

	function run() {
		var runState = {
			GAMESCREEN: function GameScreen() {
				updateSprites();
				checkForHit();
				removeDestroyedObjects();
				updateUI();
			},
			MENUSCREEN: function MenuScreen() {},
			GAMEOVER: function GameOver() {
				checkForRestart();
			}
		}
		
		runState[status]();
		
		canvas.draw(draw);
	}
};

var reqs = ['GameCanvas', 'GameInput', 'UI', 'Enemy', 'Ship'];
define(reqs, function(){ return Shooter; });
