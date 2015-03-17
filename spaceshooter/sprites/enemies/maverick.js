var _ = require('lodash');
var createjs = require('createjs');
var enemy = require('../enemy');

var spriteXIndex = 8;
var spriteYIndex = 3;

var data = {
    type: "MAVERICK",
    angle: 0,
    lastUpdate: Date.now(),
    status: 'alive',
    delay: 30,
    destroy: false,
    explosionFrame: 0,
    origin: {
        x: 0,
        y: 0 
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

module.exports = {
    create:  function (opts) {
        var d = _.clone(data);
        var spriteSheet = new createjs.SpriteSheet({
            images: [image.collection.sprites],
            frames: [
                // x, y, width, height, imageIndex*, regX*, regY*
                [spriteXIndex * 16, spriteYIndex * 16, 16, 16],
                [0*32,0,32,32],
                [1*32,0,32,32],
                [2*32,0,32,32],
                [3*32,0,32,32],
            ],
            animations: {
                fly: 0,
                explode: [1, 4, null, 2]
            }
        });

        var maverick = {
            data: _.merge(d, opts),
            sprite: new createjs.Sprite(spriteSheet),
            scene: opts.scene
        };

        var e = enemy.extend(maverick);
        _.each(e.events, function (action, name) {
            // move to engine
            var action = action.bind(e);
            createjs.Ticker.addEventListener('tick', action);
        });
        return e;
    }
};
