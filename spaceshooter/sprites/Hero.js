var reqs = ['Ship', 'Lasor', 'Bomb', 'LoDash'];
define( reqs, function( Ship, Lasor, Bomb, _ ) {

  var FIREDELAY = 100;

  function setLasors(lasors) { this.data.addon.lasors = lasors; }
  function setBombs(bombs) { this.data.addon.bombs.fired = bombs; }
  function shoot() {
    var lastFire = this.lastFire();
    var fireDelayReached = Date.now() - lastFire > FIREDELAY;
    var withinMaxLasorRange = this.lasors().length <= 2;

    if( fireDelayReached && withinMaxLasorRange ) {
      this.fireLasor();
    }
  }

  function fireLasor() {
      var lasor = new Lasor(this, null, 0, -5);
      this.addLasor(lasor);
      this.setLastFire(Date.now());
  }

  function fireBomb() {
    if(this.bombCount() > 0 && _.isEmpty( this.bombs() ) ) {
      var bomb = new Bomb(this, null);
      this.addBomb(bomb);
      this.data.addon.bombs.inventory--;  
    }
  }

  function update(events) {
    var ship = this;
    var lasors = ship.lasors();
    var bombs = ship.bombs();

    _.map( events, function( event ) {
      if(event.input == "RIGHT")
        ship.move(3);
      if(event.input == "LEFT")
        ship.move(-3);
      if(event.input == "b")
        ship.fireBomb();
      if(event.input == "SPACE" || (event.input == "LEFT" && event.input == "RIGHT"))
        ship.shoot();
    });

    lasors = _.map( lasors, function( lasor ) {
      lasor.update();
      if( lasor.isDestroyed() ) { return null; }
      return lasor;
    });

    bombs = _.map( bombs, function( bomb ) {
      bomb.update();
      if( bomb.isDestroyed() ) { return null; }
      return bomb;
    });

    bombs  = _.compact( bombs );
    lasors = _.compact( lasors );
    ship.setLasors( lasors );
    ship.setBombs( bombs );
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
    canvas.drawImage(this.getSprites(), this.spriteOriginX(), this.spriteOriginY(), this.width(), this.height(),
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

    if(type == "PLAYER")
       spriteXIndex = 1;
      spriteYIndex = 3;
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
    Ship.call(this, config);
    var type = 'PLAYER';
    this.data = shipSpecs(type);

    return( this );
  }

  Hero.prototype = Object.create( Ship.prototype );
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

  return( Hero );
});