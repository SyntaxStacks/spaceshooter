var config =  require('../config');
var _ = require('lodash');

var data = {
    type: ship.type(),
    angle: ( _.isNull( target ) ) ? 0 : angleBetweenObjects(shooter, target),
    status: 'fired',
    origin: {
        x: ship.locationX() + (ship.width()/2),
        y: ship.locationY() + ship.height()
    },
    sprite: {
        width: 3,
        height: 3
    },
    velocity: {
        x: 0,
        y: 0
    },
    x: ship.locationX() + (ship.width()/2),
    y: ship.locationY() + ship.height(),
    destroy: false;
};

var lasor = {
    data: data,
    isDestroyed: function isDestroyed () {
        return getStatus() == 'destroyed';
    },
    x: function getLocationX () {
        return lasor.x;
    },
    y: function getLocationY () {
        return lasor.y;
    },
    originX: function getOriginX () {
        return lasor.origin.x;
    },
    originY: function getOriginY () {
        return lasor.origin.y;
    },
    setX: function setLocationX (x) {
        lasor.x = x;
    },
    setY: function setLocationY (y) {
        lasor.y = y;
    },
    angle: function getAngle () {
        return lasor.angle;
    },
    update: function update () {
        var withinXBounds = getLocationX() > 0 && getLocationX() < FRAMEWIDTH; 
        var withinYBounds = getLocationY() > 0 && getLocationY() < FRAMEHEIGHT; 
        if(!withinXBounds || !withinYBounds)
            this.kill();

        this.setY(getLocationY() + getVelocityY() );
        this.setX(getLocationX() + getVelocityX() );
    },
    kill: function kill () {
        lasor.status = 'destroyed';
    },
    getHitBox: function getHitBox () { 
        return {
            x1: getLocationX(),
            y1: getLocationY(),
            x2: getLocationX() + getWidth(),
            y2: getLocationY() + getHeight()
        };
    }
};

    function getVelocityX()  { return lasor.velocity.x; }
    function getVelocityY()  { return lasor.velocity.y; }
    function getWidth()    { return lasor.sprite.width; }
    function getHeight()    { return lasor.sprite.height; }
    function setVelocityX(x)  { lasor.velocity.x += x; }
    function setVelocityY(y)  { lasor.velocity.y += y; }
    function getStatus()     { return lasor.status;}


    function drawLasor(canvas,style) {

        if(style == '2D') {
            drawLasor2D(canvas);
        }

        if(style == 'text') {
            drawLasorText(canvas);
        }

    }

    function drawLasor2D(canvas) {
        canvas.save();
        canvas.fillStyle = "#F00";
        if( !_.isNull( lasor ) ) { canvas.fillRect( lasor.x, lasor.y, 3, 3 ); }
        canvas.restore();
    }

    function drawLasorText(canvas) {
        canvas.save();
        canvas.fillStyle = "#F00";
        if( !_.isNull( lasor ) ) { canvas.fillText( '*', lasor.x, lasor.y ); }
        canvas.restore();
    }

    function lasorData(ship) {
        return {
    }


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
}

module.exports = {
  create: function () {
      lasor.data = data;
      var l = Object.create(lasor);
      setVelocityX(xVelocity);
      setVelocityY(yVelocity);

      return l;
  }
};
