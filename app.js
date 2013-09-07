var Shooter = require('./Shooter');
var Enemy = require('./Enemy');
var e1 = new Enemy("MAVERICK");
var e2 = new Enemy("GUARD");


var Canvas = require('canvas')
  , canvas = new Canvas(150, 150)
  , ctx = canvas.getContext('2d')
  , fs = require('fs');
 
ctx.fillRect(0,0,150,150);   // Draw a rectangle with default settings
ctx.save();                  // Save the default state
 
ctx.fillStyle = '#09F'       // Make changes to the settings
ctx.fillRect(15,15,120,120); // Draw a rectangle with new settings
 
ctx.save();                  // Save the current state
ctx.fillStyle = '#FFF'       // Make changes to the settings
ctx.globalAlpha = 0.5;    
ctx.fillRect(30,30,90,90);   // Draw a rectangle with new settings
 
ctx.restore();               // Restore previous state
ctx.fillRect(45,45,60,60);   // Draw a rectangle with restored settings
 
ctx.restore();               // Restore original state
ctx.fillRect(60,60,30,30);   // Draw a rectangle with restored settings
 
var out = fs.createWriteStream(__dirname + '/public/state.png')
  , stream = canvas.createPNGStream();
 
stream.on('data', function(chunk){
  out.write(chunk);
});

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  var body = '<img src="/state.png">';
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', body.length);
  res.end(body);
});

app.listen(3000);
console.log('Listening on port 3000');