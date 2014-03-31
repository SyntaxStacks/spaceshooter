var config = require('../config');
var _ = require('lodash');

function Bomb( shooter, target ) {
    var bomb            = bombData( shooter );
    var FRAMEHEIGHT     = config.frameHeight;
    var FRAMEWIDTH      = config.frameWidth;
    var explosionFrame  = 0;

    this.draw        = drawBomb;
    this.status      = getStatus;
    this.setStatus   = setStatus;
    this.x           = getLocationX;
    this.y           = getLocationY;
    this.originX     = getOriginX;
    this.originY     = getOriginY;
    this.setX        = setLocationX;
    this.setY        = setLocationY;
    this.angle       = getAngle;
    this.update      = update; 
    this.isDestroyed = isDestroyed;
    this.kill        = kill;
    this.getHitBox   = getHitBox;

    function getLocationX()    { return bomb.x; }
    function getLocationY()    { return bomb.y; }
    function getOriginX()      { return bomb.origin.x; }
    function getOriginY()      { return bomb.origin.y; }
    function getWidth()        { return bomb.sprite.width; }
    function getHeight()       { return bomb.sprite.height; }
    function setLocationX(x)   { bomb.x = x; }
    function setLocationY(y)   { bomb.y = y; }
    function getAngle()        { return bomb.angle; }
    function kill()            { setStatus('destroyed'); }
    function getStatus()       { return bomb.status; }
    function setStatus(status) { bomb.status = status; }
    function isDestroyed()     { return getStatus() == 'destroyed'; }
    
    function getHitBox() { 
        function fired() {    
            return {
                x1: getLocationX(),
                y1: getLocationY(),
                x2: getLocationX() + getWidth(),
                y2: getLocationY() + getHeight()
            };
        }
        function detonated() {    
            return {
                x1: getLocationX() - 50 - (getWidth()/2),
                y1: getLocationY() - 50,
                x2: getLocationX() + 50 + (getWidth()/2),
                y2: getLocationY() + 50
            };
        }

        var hitbox = {
            fired: fired(),
            detonated: detonated()
        };

        return hitbox[getStatus()];
    }

    function update(deps) {
        var events = {
            fired: function() {
                setLocationY(getLocationY() - 10);
                if(getLocationY() <= 50) {
                    setStatus('detonated');
                    deps.assets.sounds.add('bomb');
                    explosionFrame = 4;
                }
            },
            detonated: function() {
                if(explosionFrame < 0) 
                    return kill();

                explosionFrame--;
            },
            destroyed: function() {
                //bombs.splice(i, 1);
            }
        };

        var event = events[getStatus()] || null;
        if (event) event();
    }

    function drawBomb(canvas) {
        var events = {
            fired: drawBombFired,
            detonated: drawBombDetonated,
        };

        events[getStatus()](canvas);
    }

    function drawBombFired(canvas) {
        canvas.save();
        canvas.fillStyle = "#0F0";
        var x1 = getLocationX();
        var y1 = getLocationY();
        var width = getWidth();
        var height = getHeight();
        if( !_.isNull( bomb ) ) { canvas.fillRect(x1, y1, width, height); }
        canvas.restore();
    }

    function drawBombDetonated(canvas) {
        var exp = explosion();
        canvas.save();
        canvas.fillStyle = "#0F0";
        if( !_.isNull( bomb ) ) { 
            canvas.drawImage(canvas.sprites.sprites, exp.sprite.x, exp.sprite.y, exp.sprite.width, exp.sprite.height,
            (getLocationX()-50) + (getWidth()/2), (getLocationY()-50) - (getHeight()/2), 100, 100); 
        }
        canvas.restore();
    }

    function bombData(ship) {
        return {
            type: ship.type(),
            status: 'fired',
            angle: 0, 
            origin: {
                x: ship.locationX() + (ship.width()/2),
                y: ship.locationY() + ship.height()
            },
            sprite: {
                width: 10,
                height: 10
            },
            x: ship.locationX() + (ship.width()/2),
            y: ship.locationY() + ship.height()
        };
    }

    function explosion(frame) {
        var spriteXIndex = explosionFrame;
        var spriteYIndex = 0;
        var EXPLOSIONSPRITEWIDTH = 32;
        var EXPLOSIONSPRITEHEIGHT = 32;
        return {
            sprite: {
                x: spriteXIndex * EXPLOSIONSPRITEWIDTH,
                y: spriteYIndex * EXPLOSIONSPRITEWIDTH,
                width: EXPLOSIONSPRITEWIDTH,
                height: EXPLOSIONSPRITEHEIGHT,
            },
        };
    }
}

module.exports = Bomb;
