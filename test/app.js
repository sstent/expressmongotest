
/**
 * Module dependencies.
 */

var express = require('express');
http = require('http');
routes = require('./routes');
var async = require('async');
//var app = module.exports = express.createServer();
var app = express();

var dbURL = 'mongodb://localhost/database';
var db = require('mongoose').connect(dbURL);
var qs = require('qs');

// Configuration



app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('my secret string'));
  app.use(express.session({
    secret: 'my secret string',
    maxAge: 3600000
  }));
  app.use(function(req, res, next){
    res.locals.session = req.session;
    next();
  });
  app.set('port', 3000);
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

require('./routes/index')(app);
require('./routes/users')(app);
require('./routes/session')(app);
require('./routes/workouts')(app);

http.createServer(app).listen(app.get("port"), function(){
  console.log ("Server listening on port " + app.get("port"));
});

