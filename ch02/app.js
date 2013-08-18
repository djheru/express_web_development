//Node HTTP
var http = require('http');
//Express
var express = require('express');
//express instance
var app = express();

//Start the app
http.createServer(app).listen(3000, function(){
	console.log("Express app started");
});

//Route for the home page
//You can define the route after creatting the server because the 
//app object is passed to the Node http API by reference, so properties
//can be accessed at any time
app.get('/', function(req,res){
	res.send('Hello World');
});
