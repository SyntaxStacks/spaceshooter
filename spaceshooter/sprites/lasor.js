var config =  require('../config');
var _ = require('lodash');


var lasor = {
    isDestroyed: function isDestroyed () {
        return getStatus() == 'destroyed';
    },
    get x () {
        return lasor.data.x;
    },
    set x (x) {
        lasor.data.x = x;
    },
    get y () {
        return lasor.data.y;
    },
    set y (y) {
        lasor.data.y = y;
    },
    get originX () {
        return lasor.data.origin.x;
    },
    get originY () {
        return lasor.data.origin.y;
    },
    get angle () {
        return lasor.data.angle;
    },
    get hitBox () { 
        return {
            x1: getLocationX(),
            y1: getLocationY(),
            x2: getLocationX() + getWidth(),
            y2: getLocationY() + getHeight()
        };
    },
    get velocityX () {
        return lasor.data.velocity.x;
    },
    get velocityY () {
        return lasor.data.velocity.y;
    },
    get width () {
        return lasor.data.sprite.width;
    },
    get height () {
        return lasor.data.sprite.height;
    },
    set velocityX (x) {
        lasor.data.velocity.x += x;
    },
    set velocityY (y) {
        lasor.data.velocity.y += y;
    },
    get status () {
        return lasor.data.status;
    },
    update: function update () {
        var withinXBounds = lasor.x > 0 && lasor.x < FRAMEWIDTH; 
        var withinYBounds = lasor.y > 0 && lasor.y < FRAMEHEIGHT; 
        if(!withinXBounds || !withinYBounds)
            lasor.kill();

        lasor.y = lasor.y + lasor.velocityY;
        lasor.x = lasor.x + lasor.velocityX;
    },
    kill: function kill () {
        lasor.data.status = 'destroyed';
    },
};

function angleBetweenObjects(obj1, obj2) {
    var e1x = parseInt( Math.abs( obj1.locationX() ));
    var e2x = parseInt( Math.abs( obj2.locationX() ));
    var e1y = parseInt( Math.abs( obj1.locationY() ));
    var e2y = parseInt( Math.abs( obj2.locationY() ));

    var rise = e1y - e2y;
    var run = e1x - e2x;
    var angle = -Math.atan(run/rise);
    return angle;
}                                            

module.exports = {
    create: function (ship) {
        var data = {
            type: ship.type,
            // angle: ( _.isNull( target ) ) ? 0 : angleBetweenObjects(shooter, target),
            angle: 0,
            status: 'fired',
            origin: {
                x: ship.x + (ship.width/2),
                y: ship.y + ship.height
            },
            sprite: {
                width: 3,
                height: 3
            },
            velocity: {
                x: 0,
                y: 0
            },
            x: ship.x + (ship.width/2),
            y: ship.y + ship.height,
            destroy: false
        };
        var l = Object.create(lasor);
        lasor.data = data;
        lasor.velocityX(xVelocity);
        lasor.velocityY(yVelocity);

        return l;
    }
};
// function drawLasor(canvas,style) {

//     if(style == '2D') {
//         drawLasor2D(canvas);
//     }

//     if(style == 'text') {
//         drawLasorText(canvas);
//     }

// }

// function drawLasor2D(canvas) {
//     canvas.save();
//     canvas.fillStyle = "#F00";
//     if( !_.isNull( lasor ) ) { canvas.fillRect( lasor.x, lasor.y, 3, 3 ); }
//     canvas.restore();
// }

// function drawLasorText(canvas) {
//     canvas.save();
//     canvas.fillStyle = "#F00";
//     if( !_.isNull( lasor ) ) { canvas.fillText( '*', lasor.x, lasor.y ); }
//     canvas.restore();
// }
