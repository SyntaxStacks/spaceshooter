var _ = require('lodash');
var createjs = require('createjs');
var ship = require('./ship');
var lasor = require('./weapons/lasor');
var bomb = require('./weapons/bomb');

var FIREDELAY = 100;

var hero = {
    get scene () {
        return this.data.scene;
    },
    get lastFire () {
        return this.data.lastFire;
    },
    get fireDelay () {
        return this.data.fireDelay;
    },
    shoot: function shoot () {
        var lastFire = this.lastFire;
        var fireDelayReached = Date.now() - lastFire > this.fireDelay;
        var withinMaxLasorRange = this.lasors.length <= 2;

        if( fireDelayReached && withinMaxLasorRange ) {
            var sounds = assets.sounds;
            sounds.add('lasor');
            this.fireLasor();
        }
    },

    fireBomb: function fireBomb () {
        if(this.bombCount > 0 && _.isEmpty(this.bombs) ) {
            var firedBomb = bomb.create(this, null);
            this.addBomb(firedBomb);
            assets.sounds.add('bomb');
        }
    },

    fireLasor: function fireLasor () {
        var lasorOpts = {
            ship: this,
            target: null,
            velocityX: 0,
            velocityY: -15
        };
        var firedLasor = lasor.create(lasorOpts);
        this.addLasor(firedLasor);
        this.lastFire = Date.now();
    },

    get lasors () {
        return this.data.addon.lasors;
    },

    get bombs () {
        return this.data.addon.bombs.fired;
    },

    set lasors (lasors) {
        this.data.addon.lasors = lasors;
    },

    set bombs (bombs) {
        this.data.addon.bombs.fired = bombs;
    },

    events: {
        update: function () {
            var spaceship = this;
            var events = input.get()
            var lasors = spaceship.lasors;
            var bombs = spaceship.bombs;

            _.map(events, function (event) {
                if (event == input.keycode.right)
                    spaceship.move(3);
                if (event == input.keycode.left)
                    spaceship.move(-3);
                if (event == 'B')
                    spaceship.fireBomb();
                if (event == input.keycode.space) {
                    console.log('huehuehuehuehue');
                    spaceship.shoot();
                }
            });

            lasors = _.map(lasors, function (firedLasor) {
                firedLasor.update();
                if (firedLasor.isDestroyed()) {
                    return null;
                }
                return firedLasor;
            });

            bombs = _.map(bombs, function (firedBomb) {
                firedBomb.update();
                if (firedBomb.isDestroyed()) {
                    return null;
                }
                return firedBomb;
            });

            spaceship.lasors = _.compact(lasors);
            spaceship.bombs = _.compact(bombs);
        }
    }
};

module.exports = {
    create: function (scene) {
        var ENEMYSPRITEWIDTH = 16;
        var ENEMYSPRITEHEIGHT = 16;

        var spriteYIndex = 3;
        var spriteXIndex = 1;

        var spriteSheet = new createjs.SpriteSheet({
            images: [image.collection.sprites],
            frames: [
                [spriteXIndex * 16, spriteYIndex * 16, 16, 16, 0, 8, 8]
            ],
            animations: {
                fly: 0,
            }
        });

        var data = {
            type: "PLAYER",
            angle: 0,
            lastFire: Date.now(),
            fireDelay: 500,
            origin: {
                x: 0,
                y: 0 
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
            },
            scene: scene
        };

        
        hero.data = data;
        hero.sprite = new createjs.Sprite(spriteSheet, 'fly');
        hero.sprite.rotation = 180;
        hero.sprite.x = 180;
        hero.sprite.y = 180;

        _.each(hero.events, function (action, name) {
            action = action.bind(hero);
            createjs.Ticker.addEventListener('tick', action);
        });
        return ship.extend(hero);
    }
};
