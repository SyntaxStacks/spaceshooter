//alert(document.getElementById("frame"));({
require.config({
	baseUrl: './',
	paths: {
		Hammer: 'Hammer'
	},
	shim: {}
});

require(['Shooter'], function(shooter){

    var context = document.getElementById("frame").getContext('2d');
	var Game = new Shooter(context);
	setInterval(Game.run , 10);
});