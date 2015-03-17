var config =  require('../config');
var _ = require('lodash');


var lasor = {
    isDestroyed: function isDestroyed () {
        return this.status == 'destroyed';
    },
    get x () {
        return this.sprite.x;
    },
    set x (x) {
        this.sprite.x = x;
    },
    get y () {
        return this.sprite.y;
    },
    set y (y) {
        this.sprite.y = y;
    },
    get originX () {
        return this.data.origin.x;
    },
    get originY () {
        return this.data.origin.y;
    },
    get angle () {
        return this.data.angle;
    },
    get hitBox () { 
        return {
            x1: this.x,
            y1: this.y,
            x2: this.x + this.width,
            y2: this.y + this.height
        };
    },
    get velocityX () {
        return this.data.velocity.x;
    },
    get velocityY () {
        return this.data.velocity.y;
    },
    get width () {
        return this.sprite.width;
    },
    get height () {
        return this.sprite.height;
    },
    set velocityX (x) {
        this.data.velocity.x += x;
    },
    set velocityY (y) {
        this.data.velocity.y += y;
    },
    get status () {
        return this.data.status;
    },
    update: function update () {
        // debugger
        var withinXBounds = this.x > 0 && this.x < this.data.scene.frameWidth; 
        var withinYBounds = this.y > 0 && this.y < this.data.scene.frameHeight; 
        if(!withinXBounds || !withinYBounds)
            this.kill();

        this.sprite.setTransform(this.x + this.velocityX, this.y + this.velocityY);
    },
    kill: function kill () {
        this.data.status = 'destroyed';
    },
};

function angleBetweenObjects(obj1, obj2) {
    var e1x = parseInt( Math.abs( obj1.x ));
    var e2x = parseInt( Math.abs( obj2.x ));
    var e1y = parseInt( Math.abs( obj1.y ));
    var e2y = parseInt( Math.abs( obj2.y ));

    var rise = e1y - e2y;
    var run = e1x - e2x;
    var angle = -Math.atan(run/rise);
    return angle;
}                                            

module.exports = {
    create: function (opts) {
        var ship = opts.ship;

        var target = opts.target;
        var data = {
            scene: ship.scene,
            type: ship.type,
            // angle: ( _.isNull( target ) ) ? 0 : angleBetweenObjects(shooter, target),
            angle: 0,
            status: 'fired',
            origin: {
                x: ship.x + (ship.width/2),
                y: ship.y + ship.height
            },
            velocity: {
                x: opts.velocityX,
                y: opts.velocityY
            },
            destroy: false
        };
        var sprite = new createjs.Shape();
        sprite.graphics.beginFill('#FF0000').drawRect(0,0,10,10);
        var l = Object.create(lasor);
        l.data = data;
        l.sprite = sprite
        l.x = ship.x + (ship.width/2);
        l.y = ship.y + ship.height;

        var update = l.update.bind(l);
        createjs.Ticker.addEventListener('tick', update);
        // lasor.velocityX = opts.velocityX;
        // lasor.velocityY = opts.velocityY;

        return l;
    }
};
