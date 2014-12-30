var ui = require('./ui');
var enemy = require('../sprites/enemies/maverick');
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
    var obj1Hitbox = obj1.hitBox;
    var obj2Hitbox = obj2.hitBox;

    if(obj1Hitbox.y1 < obj2Hitbox.y2 && obj1Hitbox.y1 > obj2Hitbox.y1) {
        if(obj1Hitbox.x1 > obj2Hitbox.x1 && obj1Hitbox.x1 < obj2Hitbox.x2) {
          return true;
        }
    }  

    return false;
}

function killEnemy (enemy) {
    shooter.scoreboard.addPoints(100);
    enemy.blowUp();
    assets.sounds.add('enemyExplode');
    _.pull(shooter.data.enemyList, enemy);
}

function checkForHit() {
    var lasors = shooter.ship.lasors;
    var bombs = shooter.ship.bombs;
    var enemyLasors = getEnemyLasors();
    var enemies = shooter.enemies;

    _.map(enemies, function (enemy) {
        _.map(lasors, function (lasor) {
            if (enemy.status == 'alive') {
                if (collides(lasor, enemy)) {
                    killEnemy(enemy);
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
    engine.clearEvents();
    goToMenu();
    shooter.enemyList = [];
}

function createNewLevel () {
    var target = shooter.data.ship;
    shooter.scoreboard.addLevel();
    target.replenishBombs();
    var enemyOpts = {
        target: target,
        scene: shooter
    };
    for(var i = 0; i < shooter.scoreboard.level()*2; i++) {
        
        newEnemy = enemy.create(enemyOpts);
        newEnemy.x= -50 * i;
        shooter.addEnemy(newEnemy);
    }
}

function removeDestroyedObjects () {
    shooter.enemies = _.compact(_.map(shooter.enemies, function (currentEnemy) {
        if (_.isUndefined(currentEnemy) || currentEnemy.isDestroyed()) {
            return null;
        }
        return currentEnemy;
    }));
}

// function checkForRestart () {
//     events = input.get();

//     _.map( events, function( event ) {
//         if(event.input == "SPACE" || (event.input == "LEFT" && event.input == "RIGHT") )
//             startGame();
//         if(event.input == "e") {
//             startGame();
//             for(var i = 0; i <100; i++)
//                 shooter.scoreboard.addLevel();
//             enemyList = [];
//         }
//     });
// }

function setupStage (sceneData) {
    var stage = sceneData.stage;
    var bg = new createjs.Shape();
    bg.x = 0;
    bg.y = 0;

    bg.graphics.f('#000000').drawRect(0, 0, shooter.frameWidth, shooter.frameHeight);

    stage.clear();
    stage.addChild(bg);
    stage.addChild(sceneData.ship.sprite);
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
    run: function run () {
        // shooter.scoreboard.setBombs(shooter.ship.bombCount);

        return promise.resolve(shooter.status);
    },
    addEnemy: function (e) {
        shooter.data.enemyList.push(e);
        shooter.stage.addChild(e.sprite);
        e.originX = _.random(100, 200);
        // e.originY = 100;
        e.x = _.random(100, 200);
        e.y = 100;
    },
    initialize: function (config) {
        shooter.data = {
            scoreboard: new ui(config),
            enemyList: [],
            frameHeight: config.frameHeight,
            frameWidth: config.frameWidth,
            enemyScore: 100,
            gameover: false,
            delay: 10,
            status: 'running',
            stage: canvas.stage
        };
        shooter.data.ship = hero.create(shooter),

        setupStage(shooter.data);

        var contact = checkForHit.bind(shooter);
        createjs.Ticker.addEventListener('tick', contact);

        var remove = removeDestroyedObjects.bind(shooter);
        createjs.Ticker.addEventListener('tick', remove);
    }
};

module.exports = shooter;
