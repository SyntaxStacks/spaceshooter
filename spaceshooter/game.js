require.config({
	baseUrl: './',
	paths: {
		Hammer:      './vendor/Hammer',
		Shooter:     './spaceshooter/Shooter',
		Enemy:       './spaceshooter/Enemy',
		Ship:        './spaceshooter/Ship',
		Lasor:       './spaceshooter/Lasor',
		UI:          './spaceshooter/UI',
		GameCanvas:  './lib/GameCanvas',
		GameInput:   './lib/GameInput',
		lodash:      './vendor/lodash'
	},
	shim: {}
});

require(['Shooter'], function(shooter){
	var context = document.getElementById("frame").getContext('2d');
	var Game = new Shooter(context);

	setInterval(Game.run , 10);
});
