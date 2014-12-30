var _ = require('lodash');
var lasor = require('./lasor');
var ship = require('./ship');

var enemy = {
    shoot: function shoot (deps, target) {
        var originY = this.originY();
        var originX = this.originX();
        var angle = this.angleBetweenObjects(this, target);
        var velocityY = 1;
        var velocityX = ((originY - 1)*Math.tan(angle));
        
        if(this.lasors().length >= 2 && this.type() != "GUARD") {
            return false;
        }
        var firedLasor = new lasor(this, target, velocityX, velocityY);
        this.addLasor(firedLasor);
        deps.assets.sounds.add('enemyLaser');
    },
    kill: function kill () {
        this.data.destroy = true;
    },
    update: function update(deps, spaceship) {
        var currentTime = Date.now();
        var lastEnemyUpdateTime = this.lastUpdatedTime();
        var enemyUpdateDelay = this.enemyDelay();

        if(this.status() == 'alive') {
            var enemy = this;
            var shipX = spaceship.locationX();
            var enemyX = enemy.locationX();

            var enemyType    = enemy.type();
            var enemyMoveDir = enemy.dir();

            if(enemyMoveDir != 1 && enemyMoveDir != -1) {
              var dir = (Math.random() <= 0.5)? -1 : 1;
              enemy.setDir(dir);
            }

            var deg = (this.angleBetweenObjects(enemy, spaceship));
            enemy.setAngle(deg);

            if(currentTime - lastEnemyUpdateTime > enemyUpdateDelay ) {
                var enemyXOrigin = enemy.originX();

                if(enemyX < enemyXOrigin - enemy.floatXRange()) {
                    enemy.setDir(1);
                }

                if(enemyX > enemyXOrigin + enemy.floatXRange()) {
                    enemy.setDir(-1);
                }

                var enemyNextMove =  enemy.xSpeed() * enemyMoveDir;
                enemy.move(enemyNextMove);

                //blockade specific
                if(enemy.type() == "BLOCKADE" || enemy.type() == "GUARD") {
                    if(Math.abs(enemyX - enemyXOrigin) <= enemy.xSpeed() ){
                        enemy.setLocationX(enemyXOrigin);
                    }
                }  
            }  

            if(this.type() != "BLOCKADE") {
                if(enemyType == "GUARD" && Math.abs(enemyX - shipX) < 16) {
                    this.shoot(deps, spaceship);
                }
                else if(enemyType != "GUARD" && Math.random() >= 0.9) {
                    this.shoot(deps, spaceship);
                }
            }

            if(currentTime - lastEnemyUpdateTime > enemyUpdateDelay ) {
                lastEnemyUpdateTime = Date.now();
            }
        }
        else if(this.status() == 'dying') {
            var explosionFrame = this.explosionFrame();
            if(currentTime - lastEnemyUpdateTime > enemyUpdateDelay ) {
                if(explosionFrame < 0 && _.isEmpty( this.lasors() ) ) {
                    this.kill();
                }
                else {
                    this.setExplosionFrame(explosionFrame-1);
                }

                this.setUpdateTime(Date.now());
            }
        }
        this.updateEnemyLasorPosition();
    },
    updateEnemyLasorPosition: function updateEnemyLasorPosition() {

        var lasors = this.lasors() || [];

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

var eship = Object.create(ship);
_.merge(eship, enemy);
module.exports = eship;
