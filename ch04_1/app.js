
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

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

//404 handler
app.use(function(req,res){
	res.status(400);
	res.render('404.jade', {title: "Page not found", message: "Page couldn't be located" });
});
//500 handler
app.use(function(error, req, res, next){
	res.status(500);
	res.render('500.jade', {title: "Server Error", message: "Server crapped out" });
});

//error route to test 500
app.get('/error', function(req,res){
	error();
});

//Prettify HTML
app.locals.pretty = true;

app.get('/', routes.index);
app.get('/users', user.list);

//setting the HTTP status manually
app.get('/setstatus', function(req,res){
	res.status(404);
	res.send('forced 404');//can also just do res.send(404, 'forced 404');
});

//setting HTTP headers
app.get('/setheaders', function(req,res){
	/*
	//status is optional, defaults to 200
	res.status(200);
	res.set('Content-Type', 'text/plain; charset=us-ascii');
	res.set('X-Secret-Message', 'not really secret');
	res.set('X-Test', 'OK');
	*/
	//Or do it like:
	var headers = {
		'Content-Type': 'text/plain; charset=us-ascii',
		'X-Secret-Message': 'not really secret',
		'X-Test': 'OK'
	};
	res.set(headers);
	res.send('welcome!');
});

//sending JSON
app.get('/json', function(req,res){
	resObj = { message: 'welcome', foo: 'bar', baz: 'faz' };
	res.json(resObj);
});

//sending JSONP
app.get('/jsonp', function(req,res){
	resObj = { message: 'welcome', foo: 'bar', baz: 'faz' };
	res.jsonp(resObj);
});

//Serving files programmatically
app.get('/img', function(req,res){
	res.sendfile(path.join(__dirname, 'public/images/img.jpg'), function(err){
		if(err){
			console.log(err);
		}else{
			console.log('file sent');
		}
	});
});
//res.download sets Content-Disposition to attachment
app.get('/imgdl', function(req,res){
	res.download(path.join(__dirname, 'public/images/img.jpg'), 'download.jpg', function(err){
		if(err){
			console.log(err);
		}else{
			console.log('file sent');
		}
	});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
