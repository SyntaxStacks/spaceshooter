/*var Shooter = require('./Shooter');

var ShooterGame = new Shooter();
console.log(ShooterGame.enemies());
ShooterGame.run();
console.log(ShooterGame.enemies());*/


var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

/*app.get('/', function(req, res){
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', body.length);
  res.end(body);
});*/

app.listen(3000);
console.log('Listening on port 3000');
