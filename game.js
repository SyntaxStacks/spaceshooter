//alert(document.getElementById("frame"));({
require.config({
	baseUrl: './',
	paths: {},
	shim: {}
});
require(['Shooter'], function(canvas, shooter){
	//var GameCanvas = require('GameCanvas');
	var context = document.getElementById("frame").getContext('2d');
	var Game = new Shooter(context);
	setInterval(Game.run , 10);
});