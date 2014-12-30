var config = require('../config');
var _ = require('lodash');

var data = {
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

var bomb = {
    data: data,
    status: function getStatus () {
        return bomb.status;
    },
    setStatus: function setStatus (status) {
        bomb.status = status;
    },
    x: function getLocationX () {
        return bomb.x;
    },
    y: function getLocationY () {
        return bomb.y;
    },
    originX: function getOriginX () {
        return bomb.origin.x;
    },
    originY: function getOriginY () {
        return bomb.origin.y;
    },
    setX: function setLocationX (x) {
        bomb.x = x;
    },
    setY: function setLocationY (y) {
        bomb.y = y;
    },
    angle: function getAngle () {
        return bomb.angle;
    },
    update: function update (deps) {
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
    },
    isDestroyed: function isDestroyed () {
        return getStatus() == 'destroyed';
    },
    kill: function kill () {
        setStatus('destroyed');
    },
    getHitBox: function getHitBox () { 
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
};

module.exports = Bomb;
// function drawBombFired(canvas) {
//     canvas.save();
//     canvas.fillStyle = "#0F0";
//     var x1 = getLocationX();
//     var y1 = getLocationY();
//     var width = getWidth();
//     var height = getHeight();
//     if( !_.isNull( bomb ) ) { canvas.fillRect(x1, y1, width, height); }
//     canvas.restore();
// }

// function drawBombDetonated(canvas) {
//     var exp = explosion();
//     canvas.save();
//     canvas.fillStyle = "#0F0";
//     if( !_.isNull( bomb ) ) { 
//         canvas.drawImage(canvas.sprites.sprites, exp.sprite.x, exp.sprite.y, exp.sprite.width, exp.sprite.height,
//         (getLocationX()-50) + (getWidth()/2), (getLocationY()-50) - (getHeight()/2), 100, 100); 
//     }
//     canvas.restore();
// }


// function explosion(frame) {
//     var spriteXIndex = explosionFrame;
//     var spriteYIndex = 0;
//     var EXPLOSIONSPRITEWIDTH = 32;
//     var EXPLOSIONSPRITEHEIGHT = 32;
//     return {
//         sprite: {
//             x: spriteXIndex * EXPLOSIONSPRITEWIDTH,
//             y: spriteYIndex * EXPLOSIONSPRITEWIDTH,
//             width: EXPLOSIONSPRITEWIDTH,
//             height: EXPLOSIONSPRITEHEIGHT,
//         },
//     };
// }
// draw: function drawBomb (canvas) {
//     var events = {
//         fired: drawBombFired,
//         detonated: drawBombDetonated,
//     };

//     events[getStatus()](canvas);
// },
