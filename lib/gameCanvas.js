var canvas = {
    initialize: function initialize(config) {
        canvas.element = document.createElement('canvas');
        canvas.element.width = config.frameWidth;
        canvas.element.height = config.frameHeight;
        document.getElementById(config.id).appendChild(canvas.element);
        canvas.stage = new createjs.Stage(canvas.element);
        canvas.context = canvas.element.getContext("2d");
    },
    update: function draw(game) {
        canvas.stage.update();
    }
};  

module.exports = canvas;
