function Config() {

  var config = {
    frameHeight: 300,
    frameWidth: 600
  };

  this.frameHeight = config.frameHeight;
  this.frameWidth = config.frameWidth;

}

define(['Config'], function() { return Config; }); 

