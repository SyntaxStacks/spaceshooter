var createjs = require('createjs');

var canvas = {
    initialize: function initialize(config, sprites) {
        canvas.element = document.createElement('canvas');
        canvas.element.width = config.frameWidth;
        canvas.element.height = config.frameHeight;
        document.getElementById(config.id).appendChild(canvas.element);
        canvas.stage = new createjs.Stage(canvas.element);
        canvas.context = canvas.element.getContext("2d");
        canvas.context.sprites = sprites;
    },
    render: function draw(game) {
        game(canvas.context);
    }
};  

module.exports = canvas;
