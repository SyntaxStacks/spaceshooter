var ship = require('./ship');
var lasor = require('./lasor');
var bomb = require('./bomb');
var _ = require('lodash');

var FIREDELAY = 100;

function setLasors(lasors) { this.data.addon.lasors = lasors; }
function setBombs(bombs) { this.data.addon.bombs.fired = bombs; }

function shoot(deps) {
    var lastFire = this.lastFire();
    var fireDelayReached = Date.now() - lastFire > FIREDELAY;
    var withinMaxLasorRange = this.lasors().length <= 2;

    if( fireDelayReached && withinMaxLasorRange ) {
        var sounds = deps.assets.sounds;
        sounds.add('lasor');
        this.fireLasor();
    }
}

function fireLasor() {
    var firedLasor = new lasor(this, null, 0, -5);
    this.addLasor(firedLasor);
    this.setLastFire(Date.now());
}

function fireBomb(deps) {
    if(this.bombCount() > 0 && _.isEmpty( this.bombs() ) ) {
        var firedBomb = new bomb(this, null);
        this.addBomb(firedBomb);
        this.data.addon.bombs.inventory--;  
        deps.assets.sounds.add('bomb');
    }
}

function update(deps) {
    var spaceship = this;
    var input = deps.input;
    var events = input.get()
    var lasors = spaceship.lasors();
    var bombs = spaceship.bombs();

    _.map( events, function( event ) {
        if(event == input.keycode.right)
            spaceship.move(3);
        if(event == input.keycode.left)
            spaceship.move(-3);
        if(event == 'B')
            spaceship.fireBomb(deps);
        if(event == input.keycode.space) {
            spaceship.shoot(deps);
        }
    });

    lasors = _.map( lasors, function( firedLasor ) {
        firedLasor.update();
        if( firedLasor.isDestroyed() ) { return null; }
        return firedLasor;
    });

    bombs = _.map( bombs, function( firedBomb ) {
        firedBomb.update(deps);
        if( firedBomb.isDestroyed() ) { return null; }
        return firedBomb;
    });

    bombs  = _.compact( bombs );
    lasors = _.compact( lasors );
    spaceship.setLasors( lasors );
    spaceship.setBombs( bombs );
}

function draw(canvas, style) {
    canvas.save();
    if(style == '2D') {
        this.drawShip2D(canvas);
        this.drawLasors2D(canvas);
    }
    if(style == 'text') {
        this.drawShipText(canvas);
        this.drawLasorsText(canvas);
    }
    canvas.restore();
    return canvas;
}

function drawShip2D(canvas) {
    canvas.save();
    canvas.translate(this.width(), this.height());
    canvas.rotate(Math.PI);
    canvas.drawImage(canvas.sprites.sprites, this.spriteOriginX(), this.spriteOriginY(), this.width(), this.height(),
          (-this.locationX()), (-this.locationY()), this.width(), this.height());
    canvas.rotate(0);
    canvas.restore();
}

function drawLasors2D(canvas) {
    var style = '2D';
    canvas.save();
    canvas.fillStyle = "#F00";
    _.map( this.lasors(), function( lasor ) { lasor.draw(canvas, style); } );
    _.map( this.bombs(),  function( bomb )  {  bomb.draw(canvas, style); } );
    canvas.restore();
}

function drawShipText(canvas) {
    var x = this.locationX() + this.width()/2;
    var y = this.locationY() + this.height();

    canvas.save();
    canvas.fillStyle = "#F00"; 
    canvas.fillText('^', x, y );
    canvas.restore();
}

function drawLasorsText(canvas) {
    var style = 'text';

    canvas.save();
    _.map( this.lasors(), function( lasor ) { lasor.draw(canvas, style); } );
    _.map( this.bombs(),  function( bomb )  {  bomb.draw(canvas, style); } );
    canvas.restore();
}

function shipSpecs(type) {

    var ENEMYSPRITEWIDTH = 16;
    var ENEMYSPRITEHEIGHT = 16;

    var spriteYIndex = 3;
    var spriteXIndex = 1;
    return {
        type: "PLAYER",
        angle: 0,
        lastFire: Date.now(),
        location: {
            x: 0,
            y: 250
        },
        origin: {
            x: 0,
            y: 0 
        },
        sprite: {
            x: spriteXIndex * ENEMYSPRITEWIDTH,
            y: spriteYIndex * ENEMYSPRITEWIDTH,
            width: ENEMYSPRITEWIDTH,
            height: ENEMYSPRITEHEIGHT
        },
        className: {
            ship: "class",
            lasor: "lasorclass"
        },
        speed: {
            x: 10,
            y: 1
        },
        addon: {
            lasors: [],
            bombs: {
                inventory: 3,
                fired: []
            }
        }
    };
}

function Hero(config) {
    ship.call(this, config);
    var type = 'PLAYER';
    this.data = shipSpecs(type);

    return( this );
}

Hero.prototype = Object.create( ship.prototype );
Hero.prototype.shoot          = shoot;
Hero.prototype.fireBomb       = fireBomb;
Hero.prototype.fireLasor      = fireLasor;
Hero.prototype.setLasors      = setLasors;
Hero.prototype.setBombs       = setBombs;
Hero.prototype.update         = update;
Hero.prototype.draw           = draw;
Hero.prototype.drawShip2D     = drawShip2D;
Hero.prototype.drawShipText   = drawShipText;
Hero.prototype.drawLasors2D   = drawLasors2D;
Hero.prototype.drawLasorsText = drawLasorsText;

module.exports = Hero;
