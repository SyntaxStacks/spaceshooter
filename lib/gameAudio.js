var buzz = require('node-buzz');
var _ = require('lodash');
var files = require('../assets/assets').snd;

var tracks = {};
var playQueue = [];

var soundDir = './assets/snd/';
var fileNames = Object.keys(files);

function addTrack (trackName, formats) {
    var filePath = soundDir + trackName;
    tracks[trackName] = new buzz.sound(filePath, {
        formats: formats,
        preload: true
    });
};

_.map(fileNames, function (name) {
    var formats = files[name];
    addTrack(name, formats);
});

function queueSound (track) {
    playQueue.push(tracks[track]);  
}

function play () {
    new buzz.group(playQueue).play();
    playQueue = [];
}

module.exports = {
    add: queueSound,
    play: play
};
