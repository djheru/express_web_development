
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
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
/* Bootstrap code
app.get('/', routes.index);
app.get('/users', user.list);
*/

/*
//Catch all
app.all('/', function(req,res,next){
	res.set('X-Catch-All', 'true');
	next();
});
*/

//GET
app.get('/', function(req,res){
	res.send('/ GET OK');
});
//POST
app.post('/', function(req,res){
	res.send('/ POST OK');
});
//PUT
app.put('/', function(req,res){
	res.send('/ PUT OK');
});
//PATCH
app.patch('/', function(req,res){
	res.send('/ PATCH OK');
});
//DELETE
app.delete('/', function(req,res){
	res.send('/ DELETE OK');
});
//OPTIONS
app.options('/', function(req,res){
	res.send('/ OPTIONS OK');
});
//M-SEARCH
app['m-search']('/', function(req,res){
	res.send('/ M-SEARCH OK');
});
//NOTIFY
app.notify('/', function(req,res){
	res.send('/ NOTIFY OK');
});
//SUBSCRIBE
app.subscribe('/', function(req,res){
	res.send('/ SUBSCRIBE OK');
});
//UNSUBSCRIBE
app.unsubscribe('/', function(req,res){
	res.send('/ UNSUBSCRIBE OK');
});


//PATTERN MATCHING IN ROUTES

//string based routes

//will match /abcd
app.get('/abcd', function(req,res){
	res.send('abcd');
});

//will match /bcde, /bde
app.get('/bc?de', function(req,res){
	res.send('/bc?de');
});

//will match /cdef, /cddddddef
app.get('/cd+ef', function(req,res){
	res.send('/cd+ef');
});

//will match /efxyzgh
app.get('/ef*gh', function(req,res){
	res.send('/bc?de');
});

//will match /fgj and /fghij
app.get('/fg(hi)?j', function(req,res){
	res.send('/fg(hi)?j');
});

//Named Placeholders
app.get('/user/:id', function(req, res){
	res.send('User ID: ' + req.params.id);
});

app.get('/country/:country/state/:state',function(req,res){
	res.send(req.params.country + ' - ' + req.params.state);
});

//named placeholders with special characters
app.get('/route/:from-:to', function(req,res){
	res.send("From: " + req.params.from + " - TO: " + req.param.to);
});

app.get('/file/:name.:ext', function(req,res){
	res.send("File: " + req.params.name + '.' + req.params.ext.toLowerCase());
});

//Pattern matching with named placeholders

//optional named parameters
app.get('/feed/:format?', function(req,res){
	if(req.params.format){
		res.send('Format: ' + req.params.format);
	}else{
		res.send('default format');
	}
});

//Route order of precedence

app.get('/ab*', function(req,res){
	res.send('ab*');
});
app.get('/abc', function(req,res){//only this gets executed
	res.send('abc');
});

//Use next() to get more matching 
app.get('/xy*', function(req,res, next){
	//if the path is /xyz, dont handle it, pass it along
	if(req.path == '/xyz'){
		next();
	}else{
		res.send('/xy*');
	}
});
app.get('/xyz', function(req,res){//only this gets executed
	res.send('xyz');
});

//Multiple callbacks on a route, is like coupling middleware in route
app.get('/mc', 
	function(req,res,next){
		res.set('X-One', 'foo');
		next();
	},
	function(req,res,next){
		res.set('X-Two', 'bar');
		next();
	},
	function(req,res){
		res.send('BazFaz!');
	}
)



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
