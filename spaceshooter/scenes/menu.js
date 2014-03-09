function Menu(config) {

  var MENUSCREEN  = 'MENUSCREEN';
  var GAMESCREEN  = 'GAMESCREEN';
  var GAMEOVER    = 'GAMEOVER';
  var FRAMEHEIGHT = config.frameHeight;
  var FRAMEWIDTH  = config.frameWidth;
  var status;

  init();

  this.run = run;
  
  function draw(canvas) {
    canvas.rotate(0);
    canvas.translate(0,0);
    canvas.save();
    drawMenu(canvas);
    canvas.restore();

  }

  function processInput(input) {
    events = input.get();
    //a utility like lodash should be used for this
    for(var i = 0; i < events.length; i++) {
      event = events[i];

      if(event == input.keycode.space) {
        startNewGame();
      }
    }
  }

  function drawGameOver(canvas) {
    canvas.save();
    canvas.fillSytle = '#000000';
    canvas.fillRect(0,0,FRAMEWIDTH,FRAMEHEIGHT);
    
    canvas.fillStyle = "#FFFFFF";
    canvas.fillText("GAME OVER!!!!!!1", 30, 30);
    canvas.fillText("SCORE: " + scoreboard.score(), 30, 50);
    canvas.fillText("Press Enter To Continue", 30, 80);
    canvas.restore();
  }

  function drawMenu(canvas) {
    canvas.save();
    canvas.fillSytle = '#000000';
    canvas.fillRect(0,0,FRAMEWIDTH,FRAMEHEIGHT);
    
    canvas.fillStyle = "#FFFFFF";
    canvas.fillText("Space Shooter", 30, 30);
    canvas.fillText("PRESS SHOOT", 30, 80);
    canvas.restore();
  }

  function init() {
    status = "running";
  }

  function run(canvas, input, assets, callback) {
    processInput(input);
    canvas.render(draw);
    callback(status);
  }

  function startNewGame() {
    status = 'game';
  }
}

module.exports = Menu;
