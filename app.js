
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();

var mongoose = require('mongoose');

var nowjs = require("now");

var everyone = nowjs.initialize(app);

mongoose.connect('mongodb://localhost/tilegame');

var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var MapData = new Schema({
    name      : String
  , tiles     : []
  , date      : Date
});

var myMap = mongoose.model('MapData', MapData);

var tiles = {};

everyone.now.x = 'test';




// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'Tile Game'
  });
});

app.get('/map.json', function(req, res) {
  myMap.findOne({}, function (err, map){
    if (err) return next(err);
    res.send(JSON.stringify(map.tiles));
  });
});
                

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
