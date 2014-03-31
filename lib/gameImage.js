var _ = require('lodash');
var files = require('../assets/assets').img;

var images = {};

var imageDir = './assets/img/';
var fileNames = Object.keys(files);

function addImage (imageName, formats) {
    var filePath = imageDir + imageName + '.' + formats[0];
    images[imageName] = new Image();
    images[imageName].src = filePath;
}

_.map(fileNames, function (name) {
    var formats = files[name];
    addImage(name, formats);
});

module.exports = images;
