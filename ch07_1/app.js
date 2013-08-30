
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var fs = require('fs');

//for RedisStore sessions
var RedisStore = require('connect-redis')(express);


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.bodyParser({//load before the router
	keepExtensions: true,
	uploadDir: './public'
}));
app.use(express.methodOverride());//load after bodyparser, before router
app.use(express.cookieParser('SECRET'));
//app.use(express.session())
app.use(express.session({ store: new RedisStore }));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/get', routes.get);
app.get('/post', routes.post);
app.get('/put', routes.put);
app.get('/upload', routes.upload)

app.get('/search-result', routes.getSubmit);
app.post('/search-result', routes.postSubmit);
app.put('/put', routes.putHdlr)
app.post('/upload', routes.uploadHdlr);

app.get('/file/:name.:ext', function(req,res){
	var name = req.params.name;
	var ext = req.params.ext;
	console.log('File: ' + name + ' Ext: ' + ext);
	res.send('File: ' + name + ' Ext: ' + ext);
});

app.get('/route/:from-:to', function(req,res){
	console.log("FROM: " + req.params.from + " - TO: " + req.params.to);
	res.send("FROM: " + req.params.from + " - TO: " + req.params.to);
});

app.get('/cookiecounter', function(req,res){
	var count = req.cookies.count || 0;
	count++;
	res.cookie('count', count);
	res.send('Count: ' + count);
});

app.get('/clearcookie', function(req,res){
	res.clearCookie(count);
});

app.get('/redis', function(req,res){
	req.session.foo = 'bar';
	res.send(req.session.foo);
});

app.get('/redis2', function(req,res){
	res.send(req.session.foo);
});

app.get('/redisclear', function(req,res){
	req.session.destroy(function(){
		res.send('session destroyed');
	});
});

app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
