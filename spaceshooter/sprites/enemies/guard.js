var _ = require('lodash');
var createjs = require('createjs');
var enemy = require('../enemy');

var spriteXIndex = 2;
var spriteYIndex = 3;
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

        var guard = {
            data: data,
            sprite: new createjs.sprite(spriteSheet)
        };

        return enemy.extend(guard);
    }
};


// draw functions to convert to createjs
    // explosionFrame: function getExplosionFrame () {
    //     return this.data.explosionFrame;
    // },
    // explosion: function explosion () {
    //     var spriteXIndex = this.explosionFrame();
    //     var spriteYIndex = 0;
    //     var EXPLOSIONSPRITEWIDTH = 32;
    //     var EXPLOSIONSPRITEHEIGHT = 32;
    //     return {
    //         sprite: {
    //             x: spriteXIndex * EXPLOSIONSPRITEWIDTH,
    //             y: spriteYIndex * EXPLOSIONSPRITEWIDTH,
    //             width: EXPLOSIONSPRITEWIDTH,
    //             height: EXPLOSIONSPRITEHEIGHT
    //         },
    //     };
    // },
    // setExplosionFrame: function setExplosionFrame (frame) {
    //     this.data.explosionFrame = frame;
    // },
    // blowUp: function startDestroySequence () {
    //     var startingFrame = 4;
    //     this.setExplosionFrame(startingFrame);
    //     this.setStatus('dying');
    // },
// draw: function draw (canvas, style) {

//     canvas.save();
//     this.drawLasors(canvas, style);
//     this.drawEnemy(canvas, style);
//     canvas.restore();

//     return canvas;
// },
// drawLasors: function drawLasors (canvas, style) {
//     canvas.save();
//     if( !_.isNull(this.lasors()) ) {
//         _.forEach(this.lasors(), function (lasor) {
//             lasor.draw(canvas, style);
//         });
//     }
//     canvas.restore();
// },
// drawEnemy: function drawEnemy (canvas, style) {
//     var enemy = this;

//     var events = {
//         'text': {
//             alive: enemy.drawEnemyAliveText,
//             dying: enemy.drawEnemyDyingText
//         },
//         '2D': {
//             alive: enemy.drawEnemyAlive2D,
//             dying: enemy.drawEnemyDying2D
//         }
//     };

//     events[style][this.status()].call(enemy, canvas);
// },
// drawEnemyAliveText: function drawEnemyAliveText(canvas) {
//     var translateX = this.getCenter().x;
//     var translateY = this.getCenter().y;
//     var x = this.locationX() + this.width()/2;
//     var y = this.locationY() + this.height();
//     canvas.save();
//     canvas.translate( translateX, translateY);
//     canvas.rotate(this.angle());
//     canvas.translate(-(translateX), -(translateY));
//     canvas.fillStyle = '#F00';
//     canvas.font = "18pt Calibri";
//     canvas.fillText("v", x, y);
//     canvas.rotate(0);
//     canvas.restore();
// },
// drawEnemyDyingText: function drawEnemyDyingText(canvas) {
//     var exp = this.explosion();
//     //todo: make image draw logic cleaner
//     canvas.drawImage(canvas.sprites.sprites, exp.sprite.x, exp.sprite.y, exp.sprite.width, exp.sprite.height,
//           this.getCenter().x - (exp.sprite.width/2), this.getCenter().y - (exp.sprite.height/2), exp.sprite.width, exp.sprite.height); 
// },
// drawEnemyAlive2D: function drawEnemyAlive2D(canvas) {
//     var translateX = this.getCenter().x;
//     var translateY = this.getCenter().y;
//     canvas.save();
//     canvas.translate( translateX, translateY);
//     canvas.rotate(this.angle());
//     canvas.translate(-(translateX), -(translateY));
//     canvas.drawImage(canvas.sprites.sprites, this.spriteOriginX(), this.spriteOriginY(), this.width(), this.height(),
//           this.locationX(), this.locationY(), this.width(), this.height());
//     canvas.rotate(0);
//     canvas.restore();
// },
// drawEnemyDying2D: function drawEnemyDying2D(canvas) {
//     var exp = this.explosion();
//     canvas.drawImage(canvas.sprites.sprites, exp.sprite.x, exp.sprite.y, exp.sprite.width, exp.sprite.height,
//           this.getCenter().x - (exp.sprite.width/2), this.getCenter().y - (exp.sprite.height/2), exp.sprite.width, exp.sprite.height); 
// },
