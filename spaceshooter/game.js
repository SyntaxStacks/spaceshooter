require.config({
  baseUrl: './',
  paths: {
    Shooter:     './spaceshooter/Shooter',
    Enemy:       './spaceshooter/Enemy',
    Ship:        './spaceshooter/Ship',
    Lasor:       './spaceshooter/Lasor',
    Bomb:        './spaceshooter/Bomb',
    UI:          './spaceshooter/UI',
    Config:      './spaceshooter/Config',
    Menu:        './spaceshooter/Menu',
    Main:        './spaceshooter/Main',
    GameCanvas:  './lib/GameCanvas',
    GameInput:   './lib/GameInput',
    Engine:      './lib/Engine',
    Hammer:      './vendor/Hammer',
    lodash:      './vendor/lodash'
  },
  shim: {}
});

require(['Main'], function(shooter){
  var canvas = document.getElementById("frame").getContext('2d');
  var Game = new Main(canvas);

  // setInterval(Game.init(), 10);
  Game.play();
});
