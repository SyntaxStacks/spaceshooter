var loadImage       = document.createElement('img');
var sprites         = document.createElement('img');

function getAngle(ang)       { return this.data.angle; }
function getBombCount()      { return this.data.addon.bombs.inventory; }
function getCenter()         { return { x: this.locationX() + (this.width()/2), y: this.locationY() + (this.height()/2) }; }
function getDirection()      { return this.data.dir; }
function getFloatXRange()    { return this.data.range.x || 0; }
function getFloatYRange()    { return this.data.range.y || 0; }
function getLasors()         { return this.data.addon.lasors; }
function getLocationX()      { return this.data.location.x; }
function getLocationY()      { return this.data.location.y; }
function getOriginX()        { return this.data.origin.x || 0; }
function getOriginY()        { return this.data.origin.y || 0; }
function getShipSprite()     { return this.data.sprite.ship; }
function getShipType()       { return this.data.type; }
function getShipXSpeed()     { return this.data.speed.x || 0; }
function getShipYSpeed()     { return this.data.speed.y || 0; }
function getSpriteOriginX()  { return this.data.sprite.x; }
function getSpriteOriginY()  { return this.data.sprite.y; }
function getSpriteWidth()    { return this.data.sprite.width; }
function getSpriteHeight()   { return this.data.sprite.height; }
function setLastFire(lastfire){ this.data.lastFire = lastfire; }
function setAngle(ang)       { this.data.angle = ang; }
function setDirection(dir)   { this.data.dir = dir; }
function setFloatXRange(x)   { this.data.range.x = x; }
function setFloatYRange(y)   { this.data.range.y = y; }
function setLocationX(x)     { this.data.location.x = x; }
function setLocationY(y)     { this.data.location.y = y; }
function setOriginX(x)       { this.data.origin.x = x; }
function setOriginY(y)       { this.data.origin.y = y; }
function setShipSprite(ship) { this.data.sprite.ship = ship; }
function setShipType(type)   { this.data.type = type; }
function setShipXSpeed(x)    { this.data.speed.x = x; }
function setShipYSpeed(y)    { this.data.speed.y = y; }
function addLasor(lasor)     { this.data.addon.lasors.push(lasor); }
function addBomb(bomb)       { this.data.addon.bombs.fired.push(bomb); }
function firedBombs()        { return this.data.addon.bombs.fired; }
function replenishBombs()    { this.data.addon.bombs.inventory = 3; }
function lastFire()          { return this.data.lastFire; }
function move(moveDistance)  { this.setLocationX(this.locationX() + moveDistance); }

function getHitBox() {
    return {
        x1: this.locationX(),
        y1: this.locationY(),
        x2: this.locationX() + this.width(),
        y2: this.locationY() + this.height()
    };
}

function angleBetweenObjects(obj1, obj2) {
    var e1x = parseInt(Math.abs(obj1.locationX()));
    var e2x = parseInt(Math.abs(obj2.locationX()));
    var e1y = parseInt(Math.abs(obj1.locationY()));
    var e2y = parseInt(Math.abs(obj2.locationY()));

    var rise = e1y - e2y;
    var run = e1x - e2x;
    var angle = -Math.atan(run/rise);
    return angle;
}

function Ship(config) {
    var ship = this;
    return( this );
}

Ship.prototype = {
    angle          : getAngle,
    dir            : getDirection,
    getCenter      : getCenter,
    floatXRange    : getFloatXRange,
    floatYRange    : getFloatYRange,
    height         : getSpriteHeight,
    lasors         : getLasors,
    bombs          : firedBombs, 
    bombCount      : getBombCount,
    locationX      : getLocationX,
    locationY      : getLocationY,
    move           : move,
    originX        : getOriginX,
    originY        : getOriginY,
    setShipSprite  : setShipSprite,
    setFloatXRange : setFloatXRange,
    setFloatYRange : setFloatYRange,
    setOriginX     : setOriginX,
    setOriginY     : setOriginY,
    setLocationX   : setLocationX,
    setLocationY   : setLocationY,
    setType        : setShipType,
    setXSpeed      : setShipXSpeed,
    setYSpeed      : setShipYSpeed,
    setDir         : setDirection,
    setAngle       : setAngle,
    shipSprite     : getShipSprite,
    type           : getShipType,
    width          : getSpriteWidth,
    xSpeed         : getShipXSpeed,
    ySpeed         : getShipYSpeed,
    getHitBox      : getHitBox,
    lastFire       : lastFire,
    setLastFire    : setLastFire,
    spriteOriginX  : getSpriteOriginX,
    spriteOriginY  : getSpriteOriginY,
    addBomb        : addBomb,
    addLasor       : addLasor,
    angleBetweenObjects: angleBetweenObjects,
    replenishBombs : replenishBombs
};

module.exports = Ship;

