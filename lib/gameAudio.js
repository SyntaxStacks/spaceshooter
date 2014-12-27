var buzz = require('node-buzz');
var _ = require('lodash');
var files = require('../assets/assets').snd;

var tracks = {};
var playQueue = [];

var soundDir = './assets/snd/';
var fileNames = Object.keys(files);

var audio = {
    initialize: function () {
        _.map(fileNames, function (name) {
            var formats = files[name];
            audio.addTrack(name, formats);
        });

    },

    addTrack: function addTrack (trackName, formats) {
        var filePath = soundDir + trackName;
        tracks[trackName] = new buzz.sound(filePath, {
            formats: formats,
            preload: true
        });
    },

    add: function queueSound (track) {
        playQueue.push(tracks[track]);  
    },

    play: function play () {
        new buzz.group(playQueue).play();
        playQueue = [];
    }
};

module.exports = audio;
