var context, canvas;

function initialize(config, sprites) {
    canvas = document.createElement('canvas');
    canvas.width = config.frameWidth;
    canvas.height = config.frameHeight;
    document.getElementById(config.id).appendChild(canvas);
    context = canvas.getContext("2d");
    context.sprites = sprites;
}

function draw(game) {
    game(context);
}

module.exports = {
    render: draw,
    initialize: initialize
};  
