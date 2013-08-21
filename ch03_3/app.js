
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var namespace = require('express-namespace');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

//Using namespacing for articles routes
//put all your handlers inside the callback
app.namespace('/articles', function(){
	app.get('/', function(req,res){
		res.send('Route: /');
	});
	app.get('/new', function(req,res){
		res.send('Route: /new');
	});
	app.get('/edit/:id', function(req,res){
		res.send('Route: /edit/:id');
	});
	app.get('/delete/:id', function(req,res){
		res.send('Route: /delete/:id');
	});
	
	//Namespaces can be nested
	app.namespace('/2013/jan', function(){
		app.get('/', function(req,res){
			res.send('articles from jan 2013');
		});
	})
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
