var mod1 = require('./modules_attach_to_exports.js');
console.log('Modules created using attachment method');
console.log(mod1.name);
console.log(mod1.secret);
console.log(mod1.lower('APPLE'));
console.log(mod1.upper('mango'));
console.log(mod1.get_name());
console.log(mod1.get_secret());
console.log(' ');
var mod2 = require('./modules_assign_to_exports.js');
console.log('Modules created using assignment method');
console.log(mod2.name);
console.log(mod2.secret);
console.log(mod2.lower('APPLE'));
console.log(mod2.upper('mango'));
console.log(mod2.get_name());
console.log(mod2.get_secret());
console.log(' ');
var mod3 = require('./modules_assign_function.js');
console.log('Modules assignment to function');
console.log(mod3('hippopotamus'));
console.log(' ');

var http = require('http');
var express = require('express');
var forbidder = require('./middleware_module.js');
var app = express();

//add the custom middleware
app.use(forbidder('Monday'));

app.get('/', function(req,res){
	res.send('Hi');
});

//start the app
http.createServer(app).listen(3000, function(){
	console.log("Express app started");	
});
