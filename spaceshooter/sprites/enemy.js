var _ = require('lodash');
var lasor = require('./weapons/lasor');
var ship = require('./ship');

var DEATH_SND = 'enemyExplode';
function generateEnemy () {
    return {
        get target () {
            return this.data.target;
        },
        set target (targ) {
            this.data.target = targ;
        },
        blowUp: function () {
            this.sprite.gotoAndPlay('explode');    
            assets.sounds.play(DEATH_SND);
            this.status = 'dying'
        },
        shoot: function shoot (target) {
            var originY = 0;
            var angle = this.angleBetweenObjects(this, target);
            var velocityY = 1;
            var velocityX = ((originY - 1)*Math.tan(angle));
            
            if(this.lasors.length >= 2 && this.type != "GUARD") {
                return false;
            }
            var lasorOpts = {
                ship: this, 
                target: target,
                velocityX: velocityX,
                velocityY: velocityY,
            };

            var firedLasor = lasor.create(lasorOpts);
            this.addLasor(firedLasor);
            assets.sounds.add('enemyLaser');
        },
        kill: function kill () {
            this.data.destroy = true;
        },

        events: {
            move: function () {
                var enemy = this;
                var spaceship = enemy.target; 
                var currentTime = Date.now();
                var lastEnemyUpdateTime = this.lastUpdatedTime();
                var enemyUpdateDelay = this.enemyDelay();

                if(this.status == 'alive') {
                    var shipX = spaceship.x;
                    var enemyX = enemy.x;
                    var enemyType = enemy.type;
                    var enemyMoveDir = enemy.dir;

                    if(enemy.dir != 1 && enemy.dir != -1) {
                      var dir = (Math.random() <= 0.5)? -1 : 1;
                      enemy.dir = dir;
                    }

                    var deg = (this.angleBetweenObjects(enemy, spaceship));
                    enemy.sprite.rotation = deg;

                    if(currentTime - lastEnemyUpdateTime > enemyUpdateDelay ) {

                        var enemyXOrigin = enemy.originX;
                        if(enemyX < enemyXOrigin - enemy.floatX) {
                            enemy.dir = 1;
                        }

                        if(enemyX > enemyXOrigin + enemy.floatX) {
                            enemy.dir = -1;
                        }

                        var enemyNextMove = enemy.xSpeed * enemy.dir;
                        enemy.x = enemy.x + enemyNextMove;


                        //blockade specific
                        if(enemy.type == "BLOCKADE" || enemy.type == "GUARD") {
                            if(Math.abs(enemyX - enemyXOrigin) <= enemy.xSpeed ){
                                enemy.x = enemyXOrigin;
                            }
                        }  
                    }  

                    if(this.type != "BLOCKADE") {
                        if(enemyType == "GUARD" && Math.abs(enemyX - shipX) < 16) {
                            this.shoot(spaceship);
                        }
                        else if(enemyType != "GUARD" && Math.random() >= 0.9) {
                            this.shoot(spaceship);
                        }
                    }

                    if(currentTime - lastEnemyUpdateTime > enemyUpdateDelay ) {
                        lastEnemyUpdateTime = Date.now();
                    }
                }
                this.updateEnemyLasorPosition();
            },
            die: function () {
                 // something like sprite.gotoAndPlay('dedz'); instead of .... 
                 //
                // var explosionFrame = this.explosionFrame();
                // if(currentTime - lastEnemyUpdateTime > enemyUpdateDelay ) {
                //     if(explosionFrame < 0 && _.isEmpty( this.lasors() ) ) {
                //         this.kill();
                //     }
                //     else {
                //         this.setExplosionFrame(explosionFrame-1);
                //     }

                //     this.setUpdateTime(Date.now());
                // }
            }
        },
        updateEnemyLasorPosition: function updateEnemyLasorPosition() {

            var lasors = this.lasors || [];

            lasors = _.remove(lasors, function (lasor) {
                lasor.update();  
                if(lasor.isDestroyed()) {
                    return true;
                }
                return false;
            });
        },
        lastUpdatedTime: function getLastUpdatedTime () {
            return this.data.lastUpdate;
        },
        setUpdateTime: function setUpdateTime (time) {
            this.data.lastUpdate = time;
        }, 
        isDestroyed: function getDestroy () {
            return this.data.destroy;
        },
        enemyDelay: function getEnemyDelay () {
            return this.data.delay;
        }
    };
}

module.exports = {
    extend: function (obj) {
        var enemy = ship.extend(generateEnemy());
        obj['__proto__'] = enemy;
        var e = Object.create(obj);

        return e;
    }
};
