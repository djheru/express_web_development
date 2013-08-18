//Node HTTP
var http = require('http');
//Express
var express = require('express');
//INI Parser
var iniparser = require('iniparser');
var config = iniparser.parseSync('./config.ini');
//express instance
var app = express();


//set the view engine
app.set('view engine', 'jade');
//location of view files
app.set('views', './views');


//mark ./public as a static dir
app.use(express.static('./public'));
//responseTime middle
app.use(express.responseTime());
//explicitly use router middleware
app.use(app.router);
//Format nice error messages
app.use(express.errorHandler());


//a route for the home page
app.get('/', function(req,res){
	res.render('index', {title: config.title, message: config.message})
});

//a route for /say-hello
app.get('/say-hello', function(req,res){
	res.render('hello');
});

app.get('/test', function(req,res){
	fail();
});

//Start the app
http.createServer(app).listen(config.port, function(){
	console.log("Express app started");
});