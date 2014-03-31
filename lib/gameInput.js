var hammer = require('hammerjs');
var _ = require('lodash');

var inputQueue = [];
var inputCode  = {
    right: toKey(39),
    left: toKey(37),
    space: toKey(32),
    enter: toKey(13),
    touch: {
        left:  'left',
        right: 'right',
        shoot: 'shoot'
    }
};


init();

function init() {
    var eventListeners = ['keydown', 'keyup'];
    _.map(eventListeners, function(listener) {
        document.addEventListener(listener, processInput, false);
    });

    var leftElement = document.getElementById('left');
    var rightElement = document.getElementById('right');
    var topElement = document.getElementById('shoot');

    var leftTouch = hammer(leftElement).on("touch", processInput).on("release", processInput);
    var rightTouch = hammer(rightElement).on("touch", processInput).on("release", processInput);
    var topTouch = hammer(topElement).on("touch", processInput).on("release", processInput);
}

function getInputs () { return inputQueue; }

function toKey (keyCode) {
    var patt = /^[a-zA-Z0-9_\-\+=~`!@#$%\^&\*()\[\]{}\?\/\.,<>\\|\"\'\;:]*$/i;
    var key = String.fromCharCode(keyCode).match(patt);
    key = key || keyCode;

    if (typeof key === 'object') { return key[0]; }
    return key;
}

function addInput(key) {
    if (!_.contains(inputQueue, key)) {
        inputQueue.push(key);
    }
}

function removeInput(key) {
    _.pull(inputQueue, key);
}

function processInput(event) {
    event.preventDefault();
    var key = toKey(event.keyCode);

    if(event.type == 'keydown') {
        addInput(key);
    }
    else if(event.type == 'keyup') {
        removeInput(key);
    }
    else if(event.type == 'touch') {
      event.gesture.preventDefault();
      if(event.srcElement.id == inputCode.touch.right)
        addInput(inputCode.right);
      if(event.srcElement.id == inputCode.touch.left)
        addInput(inputCode.left);
      if(event.srcElement.id == inputCode.touch.shoot)
        addInput(inputCode.space);
    }
    else if(event.type == 'release') {
      if(event.srcElement.id == inputCode.touch.right)        
        removeInput(inputCode.right);
      if(event.srcElement.id == inputCode.touch.left)
        removeInput(inputCode.left);
      if(event.srcElement.id == inputCode.touch.shoot)
        removeInput(inputCode.space);
    }
}

module.exports = {
    get: getInputs,
    addInput: addInput,
    keycode: inputCode
}; 
