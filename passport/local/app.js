
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var mongoose = require('mongoose')
var User = require('./models/user');

var app = express();

//Mongoose connect
var connStr = 'mongodb://localhost:27017/mongoose-bcrypt-test';
mongoose.connect(connStr, function(err){
	if(err){
		console.log(err);
		throw err;
	}
	console.log('Connected to the Mongoose');
});

//create a user 
var testUser = new User({
	username: 'djheru',
	password: 'hjklay'
});

//save user to db
testUser.save(function(err){
	console.log('attempting to save user');
	if(err){
		console.log(err);
		throw err;
	}
	else{
		console.log('user saved');
	}
	
	User.getAuthenticated('djheru', 'hjklay', function(err, user, reason){
		if(err){
			console.log(err);
			throw err;
		}
		
		//if user, login successfull
		if(user){
			console.log('login success: ' + user);
			return
		}
		
		//Otherwise, look at the reason
		var reasons = User.failedLogin;
		switch(reason){
			case reasons.NOT_FOUND:
			case reasons.PASSWORD_INCORRECT:
				console.log('wrong login info');
				break;
			case reasons.MAX_ATTEMPTS:
				console.log('uh oh, they are banging your box');
				break;
		}
	});
});

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

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
