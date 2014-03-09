var buzz = require('node-buzz');
var _ = require('lodash');
var files = require('../assets/assets').snd;

var tracks = {};

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

module.exports = tracks;
