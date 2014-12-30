var _ = require('lodash');
var createjs = require('createjs');
var enemy = require('../enemy');

var spriteXIndex: 8;
var spriteYIndex: 3;
var data = {
    type: "MAVERICK",
    angle: 0,
    lastUpdate: Date.now(),
    status: 'alive',
    delay: 30,
    destroy: false,
    explosionFrame: 0,
    location: {
        x: 0,
        y: 40
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
    create:  function () {
        var spriteSheet = new createjs.spriteSheet({
            images: [image.collection.sprites],
            frames: {
                width: ENEMYSPRITEWIDTH,
                height: ENEMYSPRITEHEIGHT
                regX: spriteXIndex * ENEMYSPRITEWIDTH,
                regY: spriteYIndex * ENEMYSPRITEWIDTH,
            },
            animations: {
                fly: 0,
            }
        });

        var maverick = {
            data: data,
            sprite: new createjs.sprite(spriteSheet)
        };

        return enemy.extend(maverick);
    }
};
