var config = require('../config');
var _ = require('lodash');

var bomb = {
    get status () {
        return bomb.data.status;
    },
    set status (status) {
        bomb.data.status = status;
    },
    get x () {
        return bomb.data.x;
    },
    get y () {
        return bomb.data.y;
    },
    get originX () {
        return bomb.data.origin.x;
    },
    get originY () {
        return bomb.data.origin.y;
    },
    set x (x) {
        bomb.data.x = x;
    },
    set y (y) {
        bomb.data.y = y;
    },
    get angle () {
        return bomb.data.angle;
    },
    update: function update (deps) {
        var events = {
            fired: function() {
                bomb.y = bomb.y - 10;
                if(bomb.y <= 50) {
                    bomb.status = 'detonated';
                    deps.assets.sounds.add('bomb');
                    // explosionFrame = 4;
                    // sprite.gotoAndPlay('explsion');
                }
            },
            detonated: function() {
                if(explosionFrame < 0) 
                    return bomb.kill();

                explosionFrame--;
            },
            destroyed: function() {
                //bombs.splice(i, 1);
            }
        };

        var event = events[bomb.status] || null;
        if (event) event();
    },
    isDestroyed: function isDestroyed () {
        return bomb.status == 'destroyed';
    },
    kill: function kill () {
        bomb.status = 'destroyed';
    },
    get hitBox () { 
        function fired() {    
            return {
                x1: bomb.data.x,
                y1: bomb.data.y,
                x2: bomb.data.x + bomb.width,
                y2: bomb.y + bomb.height
            };
        }
        function detonated() {    
            return {
                x1: bomb.data.x - 50 - (bomb.data.width/2),
                y1: bomb.data.y - 50,
                x2: bomb.data.x + 50 + (bomb.data.width/2),
                y2: bomb.data.y + 50
            };
        }

        var hitbox = {
            fired: fired(),
            detonated: detonated()
        };

        return hitbox[bomb.status];
    }
};

module.exports = {
    create: function (ship) {

        var data = {
            type: ship.type,
            status: 'fired',
            angle: 0, 
            origin: {
                x: ship.x + (ship.width/2),
                y: ship.y + ship.height
            },
            sprite: {
                width: 10,
                height: 10
            },
            x: ship.x + (ship.width/2),
            y: ship.y + ship.height
        };

        var b = Object.create(bomb);
        b.data = data;

        return b;
    }
};
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
