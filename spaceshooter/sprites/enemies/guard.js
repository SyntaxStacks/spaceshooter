var _ = require('lodash');
var enemy = require('../enemy');

var data = {
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
    },
};

module.exports = {
    create:  function (opts) {
        var spriteXIndex = 2;
        var spriteYIndex = 3;
        var spriteSheet = new createjs.SpriteSheet({
            images: [image.collection.sprites],
            frames: [
                [32, 48, 16, 16], //, 0, 32, 48] // spriteXIndex * 16, spriteYIndex * 16]
                [0*32,0*32,32,32],
                [1*32,1*32,32,32],
                [2*32,2*32,32,32],
                [3*32,3*32,32,32]
            ],
            animations: {
                fly: 0,
                explode: [1, 2, 3, 4]
            }
        });

        var guard = {
            data: data,
            sprite: new createjs.Sprite(spriteSheet),
            scene: opts.scene
        };

        return enemy.extend(guard);
    }
};
