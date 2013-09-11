//alert(document.getElementById("frame"));({
require.config({
	baseUrl: './',
<<<<<<< HEAD
	paths: {},
	shim: {}
});
require(['Shooter'], function(canvas, shooter){
	//var GameCanvas = require('GameCanvas');
	var context = document.getElementById("frame").getContext('2d');
=======
	paths: {
		Hammer: 'Hammer'
	},
	shim: {}
});
require(['Shooter'], function(shooter){

    var context = document.getElementById("frame").getContext('2d');
>>>>>>> gh-pages
	var Game = new Shooter(context);
	setInterval(Game.run , 10);
});