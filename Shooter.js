function Shooter(canvas){
	var canvas = new GameCanvas(canvas);
	var enemyList = [];

	//::key input::
	var RIGHT = 39;
	var LEFT = 37;
	var SPACE = 32;

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
	var enemyList = [];
	var ship = new Ship("PLAYER");

<<<<<<< HEAD
=======

>>>>>>> gh-pages
	this.enemies = getEnemies;
	this.run = run;
	this.draw = draw;
	document.addEventListener('keydown', processInput, false);
<<<<<<< HEAD
=======
	
	var leftElement = document.getElementById('left');
	var rightElement = document.getElementById('right');

    var hammertime = Hammer(leftElement).on("hold", function(event) {
        processTouch("LEFT");
    });

    var hammertime = Hammer(rightElement).on("hold", function(event) {
    	processTouch("RIGHT");
    });
>>>>>>> gh-pages

	function getEnemies(){ return enemyList; }
	function getShip(){ return ship; }
	function getShipLasors(){ return getShip().lasors(); }
	function getLevel(){ return level; }
	function addLevel(){ level++; }

	function draw(canvas){
		var ctx = canvas;
		ctx.rotate(0);
		ctx.translate(0,0);
		ctx.save();

		ctx.fillRect(0,0,FRAMEWIDTH,FRAMEHEIGHT);
		getShip().draw(ctx);

		ctx.restore();
		ctx.save();
		drawEnemies(ctx);
		ctx.restore();

		return ctx;
	}

	function drawEnemies(canvas){
		var enemies = getEnemies();
		for(var i = 0, enemy = enemies[i]; i < enemies.length || 0; enemy = enemies[++i]) { enemy.draw(canvas); }
	}

	function processInput(event){
		//console.log(event);
		event.preventDefault();
		if(event.keyCode == RIGHT){
			ship.move(10);
		} else 
		if (event.keyCode == LEFT){
			ship.move(-10);
		} 
		else if (event.keyCode == SPACE){
			ship.shoot();
		}
		else if (event.keyCode == 80){
			;//createEnemy();
		}
		//	49 50 51 52
	};

<<<<<<< HEAD

=======
	function processTouch(event){
		if(event == "LEFT"){
			ship.move(-10);
		}

		if(event == "RIGHT"){
			ship.move(10);
		}
	}
>>>>>>> gh-pages

	function getEnemyLasors(){
		var lasors = [];
		var enemies = getEnemies();
		for(var i = 0; i < enemies.length; i++){
			var enemyLasors = enemies[i].lasors();
			if(enemyLasors == null) continue;
			for(var j = 0; j < enemyLasors.length; j++)
				lasors.push(enemyLasors[j]);
		}
		return lasors;
	}

	function checkForHit(){
		var lasors = getShipLasors();
		var enemyLasors = getEnemyLasors();
		var enemies = getEnemies();

		for(var i = 0; i < lasors.length; i++){
			for(var j = 0; j < enemies.length; j++){
				var currentLasor = lasors[i];
				var currentEnemy = enemies[j];

				if(currentEnemy.status() == 'alive')

				var currentLasorX = currentLasor.x() || 0;
				var currentEnemyX = currentEnemy.locationX() || 0;

				if(currentLasorX > currentEnemyX - 5 && currentLasorX < currentEnemyX + 15){
					var currentLasorY = currentLasor.y() || 0;
					var currentEnemyY = currentEnemy.locationY() || 0;
					if(currentLasorY < currentEnemyY && currentLasorY > currentEnemyY - 10){
						addPoints();
						currentEnemy.blowUp();
					}
				}	
			}
		}


		if(getEnemies().length == 0){
			createNewLevel();
		}	

		for(var i = 0; i < enemyLasors.length; i++){
			var currentLasor = enemyLasors[i];
			var ship = getShip();

			var currentLasorX = currentLasor.x() || 0;
			var shipX         = ship.locationX() || 0;

			if(currentLasorX > shipX - 5 && currentLasorX < shipX + 30){
				var currentLasorY = currentLasor.y() || 0;
				var shipY         = ship.locationY() || 0;
				if(currentLasorY > shipY && currentLasorY < shipY + 10){
					//removeElement(currentEnemy);
					endGame();
					console.log("dedz");
				}
			}	
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

	function updateSprites(){
		getShip().update();

		var enemies = getEnemies();
		for(var i = 0; i < enemies.length; i++){

			enemies[i].update(getShip());
		}
	}

	function removeDestroyedObjects(){
		var enemies = getEnemies();
		for(var i = 0; i < enemies.length; i++){
			var enemy = enemies[i];
			if(enemy == undefined)
				continue;

			if(enemy.isDestroyed() == true)
				enemies.splice(i, 1);
		}
	}

	function run(){
		if (status == GAMESCREEN){
			updateSprites();
			checkForHit();
			removeDestroyedObjects();
		}
		else if(status == MENUSCREEN){}
		else if(status == GAMEOVER){}

		
		canvas.draw(draw);
	}
};

<<<<<<< HEAD
define(['GameCanvas', 'Enemy', 'Ship'], function(){ return Shooter; });
=======
define(['GameCanvas', 'Enemy', 'Ship', 'Hammer'], function(){ return Shooter; });
>>>>>>> gh-pages