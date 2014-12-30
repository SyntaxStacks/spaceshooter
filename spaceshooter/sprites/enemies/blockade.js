var _ = require('lodash');
var createjs = require('createjs');
var enemy = require('../enemy');

var spriteXIndex = 5;
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
    sprite: {
        x: spriteXIndex * ENEMYSPRITEWIDTH,
        y: spriteYIndex * ENEMYSPRITEWIDTH,
        width: ENEMYSPRITEWIDTH,
        height: ENEMYSPRITEHEIGHT
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
            frames: {
                width: 16,
                height: 16,
                regX: spriteXIndex * 16,
                regY: spriteYIndex * 16,
            },
            animations: {
                fly: 0,
            }
        });

        var blockade = {
            data: data,
            sprite: new createjs.Sprite(spriteSheet)
        };

        return enemy.extend(blockade);
    }
};
