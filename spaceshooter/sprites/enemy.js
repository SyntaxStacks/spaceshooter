var lasor = require('./lasor');
var ship = require('./ship');
var _ = require('lodash');

var enemyList           = ['MAVERICK', 'BLOCKADE', 'GUARD'];
var FRAMEHEIGHT;
var FRAMEWIDTH;

function getDestroy()             { return this.data.destroy; }
function getEnemyClass()          { return this.data.className.ship; }
function getEnemyDelay()          { return this.data.delay; }
function getEnemyLasor()          { return this.data.sprite.lasor; }
function getEnemyType()           { return this.data.type; }
function getEnemyXSpeed()         { return this.data.speed.x || 0; }
function getEnemyYSpeed()         { return this.data.speed.y || 0; }
function getExplosionFrame()      { return this.data.explosionFrame; }
function getLasorSprite()         { return this.data.sprite.lasor; }
function getStatus()              { return this.data.status; }
function getLastUpdatedTime()     { return this.data.lastUpdate; }
function setExplosionFrame(frame) { this.data.explosionFrame = frame; }
function setEnemyType(type)       { this.data.type = type; }
function setEnemyXSpeed(x)        { this.data.speed.x = x; }
function setEnemyYSpeed(y)        { this.data.speed.y = y; }
function setStatus(status)        { this.data.status = status; }
function setUpdateTime(time)      { this.data.lastUpdate = time;} 
function addLasor(lasor)          { this.data.lasor.push(lasor); }
function kill()                   { this.data.destroy = true; }

function draw(canvas, style) {

    canvas.save();
    this.drawLasors(canvas, style);
    this.drawEnemy(canvas, style);
    canvas.restore();

    return canvas;
}

function drawEnemy(canvas, style) {
    var enemy = this;

    var events = {
        'text': {
            alive: enemy.drawEnemyAliveText,
            dying: enemy.drawEnemyDyingText
        },
        '2D': {
            alive: enemy.drawEnemyAlive2D,
            dying: enemy.drawEnemyDying2D
        }
    };

    events[style][this.status()].call(enemy, canvas);
}

function drawEnemyAlive2D(canvas) {
    var translateX = this.getCenter().x;
    var translateY = this.getCenter().y;
    canvas.save();
    canvas.translate( translateX, translateY);
    canvas.rotate(this.angle());
    canvas.translate(-(translateX), -(translateY));
    canvas.drawImage(canvas.sprites.sprites, this.spriteOriginX(), this.spriteOriginY(), this.width(), this.height(),
          this.locationX(), this.locationY(), this.width(), this.height());
    canvas.rotate(0);
    canvas.restore();
}

function drawEnemyDying2D(canvas) {
    var exp = this.explosion();
    canvas.drawImage(canvas.sprites.sprites, exp.sprite.x, exp.sprite.y, exp.sprite.width, exp.sprite.height,
          this.getCenter().x - (exp.sprite.width/2), this.getCenter().y - (exp.sprite.height/2), exp.sprite.width, exp.sprite.height); 
}

function drawEnemyAliveText(canvas) {
    var translateX = this.getCenter().x;
    var translateY = this.getCenter().y;
    var x = this.locationX() + this.width()/2;
    var y = this.locationY() + this.height();
    canvas.save();
    canvas.translate( translateX, translateY);
    canvas.rotate(this.angle());
    canvas.translate(-(translateX), -(translateY));
    canvas.fillStyle = '#F00';
    canvas.font = "18pt Calibri";
    canvas.fillText("v", x, y);
    canvas.rotate(0);
    canvas.restore();
}

function drawEnemyDyingText(canvas) {
    var exp = this.explosion();
    //todo: make image draw logic cleaner
    canvas.drawImage(canvas.sprites.sprites, exp.sprite.x, exp.sprite.y, exp.sprite.width, exp.sprite.height,
          this.getCenter().x - (exp.sprite.width/2), this.getCenter().y - (exp.sprite.height/2), exp.sprite.width, exp.sprite.height); 
}

function drawLasors(canvas, style) {
    canvas.save();
    if( !_.isNull(this.lasors()) ) {
        _.forEach(this.lasors(), function (lasor) {
            lasor.draw(canvas, style);
        });
    }
    canvas.restore();
}

function shoot(deps, target) {
  
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
}

function update(deps, spaceship) {
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
}

function updateEnemyLasorPosition() {

    var lasors = this.lasors() || [];

    lasors = _.remove(lasors, function (lasor) {
        lasor.update();  
        if(lasor.isDestroyed()) {
            return true;
        }
        return false;
    })
}

function enemySpecs(enemyType) {
  
    var ENEMYSPRITEWIDTH = 16;
    var ENEMYSPRITEHEIGHT = 16;
    var spriteXIndex = 0;
    var spriteYIndex = 3;

    function randomEnemy() {
        var enemyIndex = Math.floor(Math.random()*3);
        return enemySpecs(enemyList[enemyIndex]);
    }

    if(enemyType == "MAVERICK") {
        spriteXIndex = 8;
        spriteYIndex = 3;
        return {
            type: "MAVERICK",
            angle: 0,
            lastUpdate: Date.now(),
            status: 'alive',
            delay: 30,
            destroy: false,
            explosionFrame: 0,
            location: {
                x: 0,
                y: 40
            },
            origin: {
                x: 0,
                y: 0 
            },
            sprite: {
                x: spriteXIndex * ENEMYSPRITEWIDTH,
                y: spriteYIndex * ENEMYSPRITEWIDTH,
                width: ENEMYSPRITEWIDTH,
                height: ENEMYSPRITEHEIGHT
            },
            className: {
                ship: 'enemy',
                lasor: 'enemyLasor'
            },
            range: {
                x: 50,
                y: 50
            },
            speed: {
                x: 3,
                y: 0
            },
            addon: {
                lasors: []
            }
        };
    }
    else if(enemyType == "BLOCKADE") {
        spriteXIndex = 5;
        spriteYIndex = 3;
        return {
            type: "BLOCKADE",
            angle: 0,
            status: 'alive',
            delay: 30,
            destroy: false,
            lastUpdate: Date.now(),
            explosionFrame: 0,
            location: {
                x: 0,
                y: 0
            },
            origin: {
                x: 0,
                y: 0 
            },
            sprite: {
                x: spriteXIndex * ENEMYSPRITEWIDTH,
                y: spriteYIndex * ENEMYSPRITEWIDTH,
                width: ENEMYSPRITEWIDTH,
                height: ENEMYSPRITEHEIGHT
            },
            className: {
                ship: 'enemy',
                lasor: 'enemyLasor'
            },
            range: {
                x: 0,
                y: 0 
            },
            speed: {
                x: 10,
                y: 0
            },
            addon: {
                lasors: []
            }
        };
    }
    else if(enemyType == "GUARD") {
        spriteXIndex = 2;
        spriteYIndex = 3;
        return {
            type: "GUARD",
            angle: 0,
            status: 'alive',
            delay: 30,
            destroy: false,
            lastUpdate: Date.now(),
            explosionFrame: 0,
            location: {
                x: 0,
                y: 60
            },
            origin: {
                x: 0,
                y: 0 
            },
            sprite: {
                x: spriteXIndex * ENEMYSPRITEWIDTH,
                y: spriteYIndex * ENEMYSPRITEWIDTH,
                width: ENEMYSPRITEWIDTH,
                height: ENEMYSPRITEHEIGHT
            },
            className: {
                ship: 'enemy',
                lasor: 'enemyLasor'
            },
            range: {
                x: 0,
                y: 5 
            },
            speed: {
                x: 10,
                y: 1
            },
            addon: {
                lasors: []
            }
        };
    }
    else
        return randomEnemy();
}

function explosion() {
    var spriteXIndex = this.explosionFrame();
    var spriteYIndex = 0;
    var EXPLOSIONSPRITEWIDTH = 32;
    var EXPLOSIONSPRITEHEIGHT = 32;
    return {
        sprite: {
            x: spriteXIndex * EXPLOSIONSPRITEWIDTH,
            y: spriteYIndex * EXPLOSIONSPRITEWIDTH,
            width: EXPLOSIONSPRITEWIDTH,
            height: EXPLOSIONSPRITEHEIGHT
        },
    };
}


function startDestroySequence() {
    var startingFrame = 4;
    this.setExplosionFrame(startingFrame);
    this.setStatus('dying');
}

function Enemy(config) {
    ship.call(this, '', config);
    this.data  = enemySpecs("");

    FRAMEHEIGHT         = config.frameHeight;
    FRAMEWIDTH          = config.frameWidth;
    var startingOriginX = (Math.random()*(FRAMEWIDTH - 2 * this.floatXRange())) + this.floatXRange();
    this.setOriginX(startingOriginX);
    this.setDir(0);

    return( this );
}

Enemy.prototype                          = Object.create( ship.prototype );
Enemy.prototype.status                   = getStatus;
Enemy.prototype.shoot                    = shoot;
Enemy.prototype.draw                     = draw;
Enemy.prototype.drawLasors               = drawLasors;
Enemy.prototype.drawEnemy                = drawEnemy;
Enemy.prototype.drawEnemyAliveText       = drawEnemyAliveText;
Enemy.prototype.drawEnemyDyingText       = drawEnemyDyingText;
Enemy.prototype.drawEnemyAlive2D         = drawEnemyAlive2D;
Enemy.prototype.drawEnemyDying2D         = drawEnemyDying2D;
Enemy.prototype.kill                     = kill;
Enemy.prototype.update                   = update;
Enemy.prototype.updateEnemyLasorPosition = updateEnemyLasorPosition;
Enemy.prototype.lastUpdatedTime          = getLastUpdatedTime;
Enemy.prototype.setUpdateTime            = setUpdateTime;
Enemy.prototype.explosionFrame           = getExplosionFrame;
Enemy.prototype.explosion                = explosion;
Enemy.prototype.setExplosionFrame        = setExplosionFrame;
Enemy.prototype.blowUp                   = startDestroySequence;
Enemy.prototype.setStatus                = setStatus;
Enemy.prototype.isDestroyed              = getDestroy;
Enemy.prototype.enemyDelay               = getEnemyDelay;

module.exports = Enemy;
