var main = require('./main');

var canvas = document.getElementById("frame").getContext('2d');
var Game = new main(canvas);

Game.play();
