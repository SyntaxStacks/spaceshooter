var ui = require('./ui');
var enemy = require('../sprites/enemies/guard');
var hero = require('../sprites/hero');
var _ = require('lodash');

function getEnemyLasors() {
    var lasors = [];
    var enemies = shooter.enemies;
    _.forEach (enemies, function (enemy) {
        var enemyLasors = enemy.lasors;
        if (_.isEmpty(enemyLasors)) {
            return;
        }
        _.forEach (enemyLasors, function (lasor) {
            lasors.push(lasor);
        });
    });

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
    var lasors = shooter.ship.lasors;
    var bombs = shooter.ship.bombs;
    var enemyLasors = getEnemyLasors();
    var enemies = shooter.enemies;

    _.map(enemies, function (enemy) {
        _.map(lasors, function (lasor) {
            if (enemy.status == 'alive') {
                if (collides(lasor, enemy)) {
                  shooter.scoreboard.addPoints(100);
                  enemy.blowUp();
                  assets.sounds.add('enemyExplode');
                }
            }
        });

        _.map(bombs, function (bomb) {
            if (enemy.status == 'alive') {
                if (collides(enemy, bomb)) {
                    shooter.scoreboard.addPoints(100);
                    enemy.blowUp();
                }
            }
        });
    });

    if (_.isEmpty(shooter.enemies)) {
        createNewLevel();
    }  

    _.map(enemyLasors, function (lasor) {
        var ship = shooter.ship;
        var lasorX = lasor.x || 0;
        var shipX  = ship.x || 0;

        if (lasorX > shipX - 5 && lasorX < shipX + 20) {
            var lasorY = lasor.y || 0;
            var shipY = ship.y || 0;
            if (lasorY > shipY && lasorY < shipY + 10) {
                endGame();
                console.log("dedz");
            }
        }  
    });
}

function startGame () {
    shooter.scoreboard.reset();
    status = 'running';
}

function goToMenu () {
    shooter.status = 'menu';
}

function endGame () {
    goToMenu();
    shooter.enemyList = [];
}

function createNewLevel () {
    shooter.scoreboard.addLevel();
    shooter.ship.replenishBombs();
    for(var i = 0; i < shooter.scoreboard.level()*2; i++) {
        newEnemy = enemy.create();
        newEnemy.x= -50 * i;
        shooter.addEnemy(newEnemy);
    }
}

function updateSprites (deps) {
    shooter.ship.update(deps);
    _.map(shooter.enemies, function (currentEnemy) {
        currentEnemy.update(deps, shooter.ship);
    });
}

function removeDestroyedObjects () {
    shooter.enemies = _.compact(_.map(shooter.enemies, function (currentEnemy) {
        if (_.isUndefined(currentEnemy) || currentEnemy.isDestroyed()) {
            return null;
        }
        return currentEnemy;
    }));
}

function checkForRestart () {
    events = input.get();

    _.map( events, function( event ) {
        if(event.input == "SPACE" || (event.input == "LEFT" && event.input == "RIGHT") )
            startGame();
        if(event.input == "e") {
            startGame();
            for(var i = 0; i <100; i++)
                shooter.scoreboard.addLevel();
            enemyList = [];
        }
    });
}

function setupStage (stage) {
    stage.clear();
    var bg = new createjs.Shape();
    var start = new createjs.Text('mo-fukken gme stuff', ' 50px Arial', '#99CC99');
    bg.x = 0;
    bg.y = 0;
    start.x = 30;
    start.y = 80;

    bg.graphics.f('#000000').drawRect(0, 0, shooter.frameWidth, shooter.frameHeight);

    stage.addChild(bg);
    stage.addChild(start);
    stage.update();

}

var shooter = {
    get enemies () {
        return shooter.data.enemyList;
    },
    set enemies (enemies) {
        shooter.data.enemyList = enemies;
    },
    get ship () {
        return shooter.data.ship;
    },
    get status () {
        return shooter.data.status
    },
    set status (status) {
        shooter.data.status = status;
    },
    get scoreboard () {
        return shooter.data.scoreboard;
    },
    get frameWidth () {
        return shooter.data.frameHeight;
    },
    get frameHeight () {
        return shooter.data.frameWidth;
    },
    get enemyScore () {
        return shooter.data.enemyScore;
    },
    get stage () {
        return shooter.data.stage;
    },
    run: function run (deps, callback) {
        updateSprites(deps);
        checkForHit(deps.assets);
        removeDestroyedObjects();
        shooter.scoreboard.setBombs(shooter.ship.bombCount);

        // deps.canvas.render(shooter.draw);
        callback(shooter.status);
    },
    draw: function draw(canvas) {
        canvas.rotate(0);
        canvas.translate(0,0);
        canvas.save();

        drawGameScreen(canvas);
        canvas.restore();
    },
    addEnemy: function (e) {
        shooter.data.enemyList.push(e);
        shooter.stage.addChild(e.sprite);
    },
    initialize: function (deps, config) {
        shooter.data = {
            scoreboard: new ui(config),
            enemyList: [],
            frameHeight: config.frameHeight,
            frameWidth: config.frameWidth,
            enemyScore: 100,
            gameover: false,
            delay: 10,
            ship: hero.create(config),
            status: 'running',
            stage:deps.canvas.stage
        };

        setupStage(shooter.data.stage);
    }
};

module.exports = shooter;

// function drawGameScreen(canvas) {

//     canvas.save();
    
//     if(drawStyle == '2D') {
//       canvas.fillSytle = '#000';
//       canvas.fillRect(0,0,FRAMEWIDTH,FRAMEHEIGHT);
//     }

//     if(drawStyle == 'text') {
//       canvas.fillSytle = "#FFF";
//       canvas.fillRect(0,0,FRAMEWIDTH,FRAMEHEIGHT);
//     }

//     getShip().draw(canvas, drawStyle);
//     canvas.restore();
//     canvas.save();
//     drawEnemies(canvas, drawStyle);
//     canvas.restore();

//     canvas.save();
//     scoreboard.draw(canvas, drawStyle);
//     canvas.restore();
// }


// function drawEnemies(canvas, drawStyle) {
//     var enemies = getEnemies();
//     _.map(enemies, function (enemy) {
//         enemy.draw(canvas, drawStyle);
//     });
// }
