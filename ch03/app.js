
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



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
