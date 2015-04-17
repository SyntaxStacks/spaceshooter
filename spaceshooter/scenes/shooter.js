var ui = require('./ui');
var enemy = require('../sprites/enemies/maverick');
var hero = require('../sprites/hero');
var _ = require('lodash');

function createShooter () {
    var shooter = {
        get enemies () {
            return this.data.enemyList;
        },
        set enemies (enemies) {
            this.data.enemyList = enemies;
        },
        get ship () {
            return this.data.ship;
        },
        get status () {
            return this.data.status
        },
        set status (status) {
            this.data.status = status;
        },
        get scoreboard () {
            return this.data.scoreboard;
        },
        get frameWidth () {
            return this.data.frameWidth;
        },
        get frameHeight () {
            return this.data.frameHeight;
        },
        get enemyScore () {
            return this.data.enemyScore;
        },
        get stage () {
            return this.data.stage;
        },
        get soundtrack () {
            return this.data.soundtrack;
        },
        getEnemyLasors: function () {
            var lasors = [];
            var enemies = this.enemies;
            _.forEach (enemies, function (e) {
                var enemyLasors = e.lasors;
                if (_.isEmpty(enemyLasors)) {
                    return;
                }
                _.forEach (enemyLasors, function (lasor) {
                    lasors.push(lasor);
                });
            });

            return lasors;
        },
        collides: function (obj1, obj2) {
            var obj1Hitbox = obj1.hitBox;
            var obj2Hitbox = obj2.hitBox;

            if(obj1Hitbox.y1 < obj2Hitbox.y2 && obj1Hitbox.y1 > obj2Hitbox.y1) {
                if(obj1Hitbox.x1 > obj2Hitbox.x1 && obj1Hitbox.x1 < obj2Hitbox.x2) {
                  return true;
                }
            }  

            return false;
        },
        killEnemy: function (enemy) {
            var s = this;
            s.scoreboard.addPoints(100);
            enemy.blowUp();
            assets.sounds.add('enemyExplode');
            _.pull(s.data.enemyList, enemy);
        },
        checkForHit: function () {
            var s = this;
            var lasors = s.ship.lasors;
            var bombs = s.ship.bombs;
            var enemyLasors = s.getEnemyLasors();
            var enemies = s.enemies;

            _.map(enemies, function (enemy) {
                _.map(lasors, function (lasor) {
                    if (enemy.status == 'alive') {
                        if (s.collides(lasor, enemy)) {
                            s.killEnemy(enemy);
                        }
                    }
                });

                _.map(bombs, function (bomb) {
                    if (enemy.status == 'alive') {
                        if (s.collides(enemy, bomb)) {
                            s.killEnemy(enemy)
                        }
                    }
                });
            });

            if (_.isEmpty(enemies) && s.status == 'running') {
                s.status = 'next'
            }  

            debugger;
            _.map(enemyLasors, function (lasor) {
                var ship = s.ship;
                var lasorX = lasor.x || 0;
                var shipX  = ship.x || 0;

                if (lasorX > shipX - 5 && lasorX < shipX + 20) {
                    var lasorY = lasor.y || 0;
                    var shipY = ship.y || 0;
                    if (lasorY > shipY && lasorY < shipY + 10) {
            debugger;
                        s.endGame();
                        console.log("dedz");
                    }
                }  
            });
        },
        goToMenu: function () {
            this.status = 'exit';
            this.nextScene = 'menu';
        },
        endGame: function () {
            assets.sounds.stop(this.soundtrack);
            this.data.enemyList = undefined;
            this.goToMenu();
        },
        createNewLevel: function () {
            var s = this;
            s.status = 'starting';
            s.scoreboard.addLevel();
            var target = s.data.ship;
            target.replenishBombs();

            // TODO: add sprite class to game engine

            var levelIntro = function levelIntro () {
                
                var width = s.stage.canvas.width;
                var height = s.stage.canvas.height;

                var levelAni = new promise(function(resolve, reject) {
                    var level = new createjs.Text('LEVEL', '100 Arial', '#FF0000');
                    s.stage.addChild(level);
                    var origin = {
                        x: (width / 2) - (level.getMeasuredWidth() / 2),
                        y: 0
                    }
                    createjs.Tween.get(level)
                        .set(origin) 
                        .to({ y: (height / 2) - level.getMeasuredHeight() }, 500, createjs.Ease.getPowInOut(2))
                        .wait(750)
                        .to({ y: 0 }, 500, createjs.Ease.getPowInOut(2))
                        .call(function () {
                          console.log('done1');
                          s.stage.removeChild(level);
                          resolve()
                        });
                });

                var levelNumAni = new promise(function(resolve, reject) {
                    var levelNum = new createjs.Text(s.scoreboard.level, '100 Arial', '#FF0000');
                    s.stage.addChild(levelNum);
                    var origin = {
                        x: (width / 2) - (levelNum.getMeasuredWidth() / 2),
                        y: height - levelNum.getMeasuredHeight()
                    };

                    createjs.Tween.get(levelNum)
                        .set(origin)
                        .to({ y: (height / 2) + levelNum.getMeasuredHeight() / 2 }, 500, createjs.Ease.getPowInOut(2))
                        .wait(750)
                        .to({ y: height + levelNum.getMeasuredHeight() }, 500, createjs.Ease.getPowInOut(2))
                        .call(function () {
                            console.log('done2');
                            s.stage.removeChild(levelNum);
                            resolve();
                        });
                });

                // debugger
                return promise.all([levelAni, levelNumAni]);
            };

            var setupLevel = function setupLevel () {
              console.log('setup')
                var enemyOpts = {
                    target: target,
                    scene: s
                };
                for(var i = 0; i < s.scoreboard.level*2; i++) {
                    
                    newEnemy = enemy.create(enemyOpts);
                    newEnemy.x= -50 * i;
                    s.addEnemy(newEnemy);
                }

                s.status = 'running';
            };

            levelIntro().
                then(setupLevel);
        },
          removeDestroyedObjects: function () {
            this.enemies = _.compact(_.map(this.enemies, function (currentEnemy) {
                if (_.isUndefined(currentEnemy) || currentEnemy.isDestroyed()) {
                    return null;
                }
                return currentEnemy;
            }));
        },
        setupStage: function () {
            var stage = this.stage;
            var bg = new createjs.Shape();
            bg.x = 0;
            bg.y = 0;

            bg.graphics.f('#000000').drawRect(0, 0, this.frameWidth, this.frameHeight);

            stage.clear();
            stage.addChild(bg);
            stage.addChild(this.ship.sprite);
        },
        run: function run () {
            var s  = this;

            var statuses = {
                next: function () {
                    s.createNewLevel();
                },
                running: function () {
                    s.checkForHit();
                    s.removeDestroyedObjects();
                }
            };

            var action = statuses[this.status];
            action && action();

            var opts = {
                status: this.status,
                nextScene: this.nextScene
            };
            return promise.resolve(opts);
        },
        addEnemy: function (e) {
            this.data.enemyList.push(e);
            this.stage.addChild(e.sprite);
            e.originX = _.random(100, 200);
            e.x = _.random(100, 200);
            e.y = 100;
        },
    };
    return shooter;
}

module.exports = {
    initialize: function (config) {
        console.log(config)
        var shooter = createShooter();
        shooter.data = {
            scoreboard: ui.initialize(config),
            enemyList: [],
            frameHeight: config.frameHeight,
            frameWidth: config.frameWidth,
            enemyScore: 100,
            delay: 10,
            status: 'next',
            stage: canvas.stage,
            soundtrack: 'reformat'
        };
        shooter.data.ship = hero.create(shooter),

        shooter.setupStage();

        assets.sounds.play(shooter.soundtrack);

        return shooter;
    }
};
