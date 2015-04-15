var _ = require('lodash');
var enemy = require('../enemy');

var spriteXIndex = 4;
var spriteYIndex = 3;
function generateBlockade () {
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

module.exports = {
    create:  function (opts) {
        var spriteSheet = new createjs.SpriteSheet({
            images: [image.collection.sprites],
            frames: [
                // x, y, width, height, imageIndex*, regX*, regY*
                [spriteXIndex * 16, spriteYIndex * 16, 16, 16],
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

        var blockade = {
            data: generateBlockade(),
            sprite: new createjs.Sprite(spriteSheet, 'fly'),
            scene: opts.scene
        };

        return enemy.extend(blockade);
    }
};
