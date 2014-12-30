var _ = require('lodash');

function processInput (input) {
    var keypresses = input.get();
    _.forEach(keypresses, function (keypress) {
        if (keypress == input.keycode.space) {
            menu.startNewGame();
        }
    });
}

function drawGameOver (canvas) {
    canvas.save();
    canvas.fillSytle = '#000000';
    canvas.fillRect(0,0, menu.FRAMEWIDTH, menuFRAMEHEIGHT);
    
    canvas.fillStyle = "#FFFFFF";
    canvas.fillText("GAME OVER!!!!!!1", 30, 30);
    // canvas.fillText("SCORE: " + scoreboard.score(), 30, 50);
    canvas.fillText("Press Enter To Continue", 30, 80);
    canvas.restore();
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
    initialize: function (deps, config) {
        menu.MENUSCREEN  = 'MENUSCREEN';
        menu.GAMESCREEN  = 'GAMESCREEN';
        menu.GAMEOVER    = 'GAMEOVER';
        menu.FRAMEHEIGHT = config.frameHeight;
        menu.FRAMEWIDTH  = config.frameWidth;
        menu.status = 'running';
        menu.stage = deps.canvas.stage;
        setupStage(menu.stage);
    },

    run: function run (deps, callback) {
        processInput(deps.input);
        callback(menu.status);
    },

    startNewGame: function startNewGame () {
        menu.status = 'game';
    }
}

module.exports = menu;
