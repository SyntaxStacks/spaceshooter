require.config({
  baseUrl: './',
  paths: {
    Menu:        './spaceshooter/scenes/Menu',
    Shooter:     './spaceshooter/scenes/Shooter',
    UI:          './spaceshooter/scenes/UI',
    Ship:        './spaceshooter/sprites/Ship',
    Hero:        './spaceshooter/sprites/Hero',
    Enemy:       './spaceshooter/sprites/Enemy',
    Lasor:       './spaceshooter/sprites/Lasor',
    Bomb:        './spaceshooter/sprites/Bomb',
    Config:      './spaceshooter/Config',
    Main:        './spaceshooter/Main',
    Engine:      './lib/Engine',
    GameCanvas:  './lib/GameCanvas',
    GameInput:   './lib/GameInput',
    Hammer:      './vendor/Hammer',
    LoDash:      './vendor/lodash'
  },
  shim: {}
});

require(['Main'], function(Main){
  var canvas = document.getElementById("frame").getContext('2d');
  var Game = new Main(canvas);

  // setInterval(Game.init(), 10);
  Game.play();
});
