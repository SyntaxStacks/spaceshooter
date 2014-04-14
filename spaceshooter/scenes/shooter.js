var ui = require('./ui');
var enemy = require('../sprites/enemy');
var hero = require('../sprites/hero');
var _ = require('lodash');

function Shooter(config) {
  var scoreboard      = new ui(config);
  var enemyList       = [];


  var FRAMEHEIGHT     = config.frameHeight;
  var FRAMEWIDTH      = config.frameWidth;
  var ENEMYSCOREVALUE = 100;
  var gameover        = false;
  var drawStyle        = '2D';
  var delay           = 10;
  var ship            = new hero(config);
  var status = 'running';

  this.enemies        = getEnemies;
  this.run            = run;
  this.draw           = draw;

  function getEnemies()    { return enemyList; }
  function setEnemies(enemies)    { enemyList = enemies; }
  function getShip()       { return ship; }
  function getShipLasors() { return getShip().lasors(); }
  function getShipBombs() { return getShip().bombs(); }
  function setDrawStyle(style)      { drawStyle = style; }

  function draw(canvas) {
    canvas.rotate(0);
    canvas.translate(0,0);
    canvas.save();

    drawGameScreen(canvas);
    canvas.restore();

  }

  function drawGameScreen(canvas) {

    canvas.save();
    
    if(drawStyle == '2D') {
      canvas.fillSytle = '#000';
      canvas.fillRect(0,0,FRAMEWIDTH,FRAMEHEIGHT);
    }

    if(drawStyle == 'text') {
      canvas.fillSytle = "#FFF";
      canvas.fillRect(0,0,FRAMEWIDTH,FRAMEHEIGHT);
    }

    getShip().draw(canvas, drawStyle);
    canvas.restore();
    canvas.save();
    drawEnemies(canvas, drawStyle);
    canvas.restore();

    canvas.save();
    scoreboard.draw(canvas, drawStyle);
    canvas.restore();
  }


  function drawEnemies(canvas, drawStyle) {
    var enemies = getEnemies();
    for(var i = 0, enemy = enemies[i]; i < enemies.length || 0; enemy = enemies[++i]) { enemy.draw(canvas, drawStyle); }
  }

  function getEnemyLasors() {
    var lasors = [];
    var enemies = getEnemies();
    for(var i = 0; i < enemies.length; i++) {
      var enemyLasors = enemies[i].lasors();
      if(_.isEmpty(enemyLasors)) continue;
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

  function checkForHit(assets) {
    var lasors = getShipLasors();
    var bombs = getShipBombs();
    var enemyLasors = getEnemyLasors();
    var enemies = getEnemies();

    _.map(enemies, function( enemy ) {
      _.map(lasors, function( lasor ) {
        if(enemy.status() == 'alive') {
          if(collides(lasor, enemy)) {
            scoreboard.addPoints(100);
            enemy.blowUp();
            assets.sounds.enemyExplode.play();
          }
        }
      });

      _.map(bombs, function( bomb ) {
        if(enemy.status() == 'alive') {
          if(collides(enemy, bomb)) {
            scoreboard.addPoints(100);
            enemy.blowUp();
          }
        }
      });
    });

    if( _.isEmpty( getEnemies() ) ) {
      createNewLevel();
    }  

    _.map(enemyLasors, function( lasor ) {
      var ship = getShip();
      var lasorX = lasor.x() || 0;
      var shipX  = ship.locationX() || 0;

      if(lasorX > shipX - 5 && lasorX < shipX + 20) {
        var lasorY = lasor.y() || 0;
        var shipY         = ship.locationY() || 0;
        if(lasorY > shipY && lasorY < shipY + 10) {
          endGame();
          console.log("dedz");
        }
      }  
    });
  }

  function startGame() {
    scoreboard.reset();
    status = 'running';
  }

  function goToMenu() {
    status = 'menu';
  }

  function endGame() {
    goToMenu();
    enemyList = [];
  }

  function createNewLevel() {
    scoreboard.addLevel();
    if(scoreboard.level() >= 5) drawStyle = '2D';
    getShip().replenishBombs();
    for(var i = 0; i < scoreboard.level()*2; i++) {
      newEnemy = new enemy(config);
      newEnemy.setLocationX(-50*i);
      enemyList.push(newEnemy);
    }
  }

  function updateSprites(deps) {
    getShip().update(deps);

    var enemies = getEnemies();
    _.map( enemies, function( currentEnemy ) { currentEnemy.update(deps, getShip()); });
  }

  function removeDestroyedObjects(){
    var enemies = getEnemies();

    enemies = _.map( enemies, function( currentEnemy ) {
      if( _.isUndefined( currentEnemy ) || currentEnemy.isDestroyed() ) { return null; }
      return currentEnemy;
    });

    enemies = _.compact(enemies);
    setEnemies(enemies);
  }

  function updateUI() {
    scoreboard.setBombs(getShip().bombCount());
  }

  function checkForRestart() {
    events = input.get();

    _.map( events, function( event ) {
      if(event.input == "SPACE" || (event.input == "LEFT" && event.input == "RIGHT") )
        startGame();
      if(event.input == "e") {
        startGame();
        for(var i = 0; i <100; i++)
          scoreboard.addLevel();
        enemyList = [];
      }
    });
  }

  function run(deps, callback) {

    updateSprites(deps);
    checkForHit(deps.assets);
    removeDestroyedObjects();
    updateUI();

    deps.canvas.render(draw);
    callback(status);
  }
}

module.exports = Shooter;
