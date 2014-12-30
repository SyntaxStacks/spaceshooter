var _ = require('lodash');
var loadImage = document.createElement('img');
var sprites = document.createElement('img');

var character = {

    data: {},

    get status () {
        return character.data.status;
    },

    set status (status) {
        character.data.status = status;
    },
    
    get angle () {
        return character.data.angle;
    },

    set angle (ang) {
        character.data.angle = ang;
    },

    get dir () {
        return character.data.dir;
    },
    
    set dir (dir) {
        character.data.dir = dir;
    },

    get getCenter () {
        return {
            x: character.locationX() + (character.width()/2),
            y: character.locationY() + (character.height()/2)
        };
    },

    get floatXRange () {
        return character.data.range.x || 0;
    },

    set floatXRange (x) {
        character.data.range.x = x;
    },

    get floatYRange () {
        return character.data.range.y || 0;
    },

    set floatYRange (y) {
        character.data.range.y = y;
    },

    get lasors () {
        return character.data.addon.lasors;
    },

    get bombs () {
        return character.data.addon.bombs.fired;
    },

    get bombCount () {
        return character.data.addon.bombs.inventory;
    },

    get x () {
        return character.data.location.x;
    },

    set x (x) {
        character.data.location.x = x;
    },

    get y () {
        return character.data.location.y;
    },

    set y (y) {
        character.data.location.y = y;
    },

    move: function move (moveDistance) {
        character.setLocationX(character.locationX() + moveDistance);
    },

    get originX () {
        return character.data.origin.x || 0;
    },

    set originX (x) {
        character.data.origin.x = x;
    },

    get originY () {
        return character.data.origin.y || 0;
    },

    set originY (y) {
        character.data.origin.y = y;
    },

    setType: function setShipType (type) {
        character.data.type = type;
    },

    setXSpeed: function setShipXSpeed (x) {
        character.data.speed.x = x;
    },

    setYSpeed: function setShipYSpeed (y) {
        character.data.speed.y = y;
    },

    setDir: function setDirection (dir) {
        character.data.dir = dir;
    },

    setAngle: function setAngle (ang) {
        character.data.angle = ang;
    },

    get type () {
        return character.data.type;
    },

    get xSpeed () {
        return character.data.speed.x || 0;
    },

    get ySpeed () {
        return character.data.speed.y || 0;
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
        return character.data.lastFire;
    },

    set lastFire (lastfire) {
        character.data.lastFire = lastfire;
    },

    addBomb: function addBomb (bomb) {
        character.data.addon.bombs.fired.push(bomb);
    },

    addLasor: function addLasor (lasor) {
        character.data.addon.lasors.push(lasor);
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
        character.data.addon.bombs.inventory = 3;
    }
};

module.exports = character;
