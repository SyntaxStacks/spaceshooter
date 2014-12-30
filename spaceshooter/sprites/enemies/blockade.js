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
        var spriteSheet = new createjs.spriteSheet({
            images: [image.collection.sprites],
            frames: {
                width: ENEMYSPRITEWIDTH,
                height: ENEMYSPRITEHEIGHT,
                regX: spriteXIndex * ENEMYSPRITEWIDTH,
                regY: spriteYIndex * ENEMYSPRITEWIDTH,
            },
            animations: {
                fly: 0,
            }
        });

        var blockade = {
            data: data,
            sprite: new createjs.sprite(spriteSheet)
        };

        return enemy.extend(blockade);
    }
};
