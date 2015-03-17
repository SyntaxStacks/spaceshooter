var _ = require('lodash');

function processInput () {
    var keypresses = input.get();
    _.forEach(keypresses, function (keypress) {
        if (keypress == input.keycode.space) {
            menu.startNewGame();
        }
    });
}

function setupStage (stage) {
    stage.clear();
    var bg = new createjs.Shape();
    var title = new createjs.Text('Space Shooter', ' 20px Arial', '#999999');
    var start = new createjs.Text('Press Space To Start', ' 20px Arial', '#99CC99');
    bg.x = 0;
    bg.y = 0;
    start.x = 30;
    start.y = 80;
    title.x = 30;
    title.y = 30;

    bg.graphics.f('#000000').drawRect(0, 0, menu.FRAMEWIDTH, menu.FRAMEHEIGHT);

    stage.addChild(bg);
    stage.addChild(title);
    stage.addChild(start);
    stage.update();
}

var menu = {
    initialize: function (config) {
        menu.MENUSCREEN  = 'MENUSCREEN';
        menu.GAMESCREEN  = 'GAMESCREEN';
        menu.GAMEOVER    = 'GAMEOVER';
        menu.FRAMEHEIGHT = config.frameHeight;
        menu.FRAMEWIDTH  = config.frameWidth;
        menu.status = 'running';
        menu.stage = canvas.stage;
        setupStage(menu.stage);
    },

    run: function run () {
        processInput();
        return promise.resolve(menu.status);
    },

    startNewGame: function startNewGame () {
        menu.status = 'game';
    }
}

module.exports = menu;
