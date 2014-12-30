var _ = require('lodash');
var loadImage = document.createElement('img');
var sprites = document.createElement('img');

var character = {

    get status () {
        return this.data.status;
    },

    set status (status) {
        this.data.status = status;
    },
    
    get angle () {
        return this.data.angle;
    },

    set angle (ang) {
        this.data.angle = ang;
    },

    get dir () {
        return this.data.dir;
    },
    
    set dir (dir) {
        this.data.dir = dir;
    },

    get getCenter () {
        return {
            x: character.locationX() + (character.width()/2),
            y: character.locationY() + (character.height()/2)
        };
    },

    get floatXRange () {
        return this.data.range.x || 0;
    },

    set floatXRange (x) {
        this.data.range.x = x;
    },

    get floatYRange () {
        return this.data.range.y || 0;
    },

    set floatYRange (y) {
        this.data.range.y = y;
    },

    get lasors () {
        return this.data.addon.lasors;
    },

    get bombs () {
        return this.data.addon.bombs.fired;
    },

    get bombCount () {
        return this.data.addon.bombs.inventory;
    },

    get x () {
        return this.data.location.x;
    },

    set x (x) {
        this.data.location.x = x;
    },

    get y () {
        return this.data.location.y;
    },

    set y (y) {
        this.data.location.y = y;
    },

    move: function move (moveDistance) {
        character.setLocationX(character.locationX() + moveDistance);
    },

    get originX () {
        return this.data.origin.x || 0;
    },

    set originX (x) {
        this.data.origin.x = x;
    },

    get originY () {
        return this.data.origin.y || 0;
    },

    set originY (y) {
        this.data.origin.y = y;
    },

    setType: function setShipType (type) {
        this.data.type = type;
    },

    setXSpeed: function setShipXSpeed (x) {
        this.data.speed.x = x;
    },

    setYSpeed: function setShipYSpeed (y) {
        this.data.speed.y = y;
    },

    setDir: function setDirection (dir) {
        this.data.dir = dir;
    },

    setAngle: function setAngle (ang) {
        this.data.angle = ang;
    },

    get type () {
        return this.data.type;
    },

    get xSpeed () {
        return this.data.speed.x || 0;
    },

    get ySpeed () {
        return this.data.speed.y || 0;
    },

    get hitBox () {
        return {
            x1: character.locationX(),
            y1: character.locationY(),
            x2: character.locationX() + character.width(),
            y2: character.locationY() + character.height()
        };
    },
    get lastFire () {
        return this.data.lastFire;
    },

    set lastFire (lastfire) {
        this.data.lastFire = lastfire;
    },

    addBomb: function addBomb (bomb) {
        this.data.addon.bombs.fired.push(bomb);
        this.data.addon.bombs.inventory--;  
    },

    addLasor: function addLasor (lasor) {
        this.data.addon.lasors.push(lasor);
    },

    angleBetweenObjects: function angleBetweenObjects (obj1, obj2) {
        var e1x = parseInt(Math.abs(obj1.locationX()));
        var e2x = parseInt(Math.abs(obj2.locationX()));
        var e1y = parseInt(Math.abs(obj1.locationY()));
        var e2y = parseInt(Math.abs(obj2.locationY()));

        var rise = e1y - e2y;
        var run = e1x - e2x;
        var angle = -Math.atan(run/rise);
        return angle;
    },
    
    replenishBombs: function replenishBombs () {
        this.data.addon.bombs.inventory = 3;
    }
};

module.exports = {
    extend: function (obj) {
        obj['__proto__'] = character;
        return Object.create(obj);
    }
};
