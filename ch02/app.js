//Node HTTP
var http = require('http');
//Express
var express = require('express');
//express instance
var app = express();


//set the view engine
app.set('view engine', 'jade');
//location of view files
app.set('views', './views');

//mark ./public as a static dir
app.use(express.static('./public'));

//a route for the home page
app.get('/', function(req,res){
	res.render('index')
});

//a route for /say-hello
app.get('/say-hello', function(req,res){
	res.render('hello');
});

app.get('/test', function(req,res){
	res.send('this is a test');
});

//Start the app
http.createServer(app).listen(3000, function(){
	console.log("Express app started");
});