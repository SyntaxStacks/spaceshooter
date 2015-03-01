var _ = require('lodash');
var createjs = require('createjs');
var enemy = require('../enemy');

var spriteXIndex = 4;
var spriteYIndex = 3;
var data = {
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

module.exports = {
    create:  function () {
        var spriteSheet = new createjs.SpriteSheet({
            images: [image.collection.sprites],
            frames: [
                // x, y, width, height, imageIndex*, regX*, regY*
                [spriteXIndex * 16, spriteYIndex * 16, 16, 16]
            ],
            animations: {
                fly: 0,
            }
        });

        var blockade = {
            data: data,
            sprite: new createjs.Sprite(spriteSheet, 'fly')
        };

        return enemy.extend(blockade);
    }
};
