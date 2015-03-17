var config = require('../config');
var _ = require('lodash');

var bomb = {
    get status () {
        return this.data.status;
    },
    set status (status) {
        this.data.status = status;
    },
    get x () {
        return this.data.x;
    },
    get y () {
        return this.data.y;
    },
    get originX () {
        return this.data.origin.x;
    },
    get originY () {
        return this.data.origin.y;
    },
    set x (x) {
        this.data.x = x;
    },
    set y (y) {
        this.data.y = y;
    },
    get angle () {
        return this.data.angle;
    },
    update: function update () {
        var events = {
            fired: function() {
                this.y = this.y - 10;
                if(this.y <= 50) {
                    this.status = 'detonated';
                    assets.sounds.add('bomb');
                    // explosionFrame = 4;
                    // sprite.gotoAndPlay('explsion');
                }
            },
            detonated: function() {
                if(explosionFrame < 0) 
                    return this.kill();

                explosionFrame--;
            },
            destroyed: function() {
                //bombs.splice(i, 1);
            }
        };

        var event = events[this.status] || null;
        if (event) event();
    },
    isDestroyed: function isDestroyed () {
        return this.status == 'destroyed';
    },
    kill: function kill () {
        this.status = 'destroyed';
    },
    get hitBox () { 
        var b = this;
        function fired() {    
            return {
                x1: b.x,
                y1: b.y,
                x2: b.x + b.width,
                y2: b.y + b.height
            };
        }
        function detonated() {    
            return {
                x1: b.x - 50 - (b.width/2),
                y1: b.y - 50,
                x2: b.x + 50 + (b.width/2),
                y2: b.y + 50
            };
        }

        var hitbox = {
            fired: fired(),
            detonated: detonated()
        };

        return hitbox[this.status];
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
