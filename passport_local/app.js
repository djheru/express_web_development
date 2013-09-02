
/**
 * Module dependencies.
 */

var express = require('express');
var passport = require('passport');
var LocalStrategy =  require('passport-local').Strategy;
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');	
var SALT_WORK_FACTOR = 10;


mongoose.connect('localhost', 'test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function callback(){
	console.log('Connection to DB');
});

//User schema
var userSchema = mongoose.Schema({
	username: { type: String, reqired: true, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true }
});
//Bcrypt middleware
userSchema.pre('save', function(next){
	
	var user = this;
	
	if(!user.isModified('password')){
		return next();
	}
	
	//hash the password
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
		if(err){
			return next(err);
		}
		bcrypt.hash(user.password, salt, function(err,hash){
			if(err){
				return next(err);
			}
			user.password = hash;
			next();
		});
	});
});

//Password verification
userSchema.methods.comparePassword = function(candidatePassword, cb){
	console.log('comparing pw', candidatePassword);
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
		console.log(candidatePassword, this, isMatch)
		if(err){;
			return cb(err);
		}
		cb(null, isMatch);
	});
}

//seed a User
var User = mongoose.model('User', userSchema);
var user = new User({ username: 'bob', email: 'bob@example.com', password: 'secret' });
user.save(function(err){
	if(err){
		console.log(err);
	}else{
		console.log('user: ' + user + ' saved');
	}
});

//passport session setup
//to support persistence, passport needs to be able to serialize and deserialize
//users. This can be as simple as storing the user id when serializing
//and finding the user id when deserializing
passport.serializeUser(function(user, done){
	done(null, user.id);
});

passport.deserializeUser(function(id, done){
	User.findById(id, function(err, user){
		done(err, user)
	});
});

//Using LocalStategy within Passport
//strategies require a 'verify' function that accepts credentials and invokes a callback with
//a user object.
passport.use(new LocalStrategy(function(username, password, done){
	User.findOne({ username: username }, function(err, user){
		if(err){
			return done(err);
		}
		
		//username not found
		if(!user){
			return done(null, false, {message: 'unknown user: ' + username });
		}
		console.log('user found', user);
		//if user, compare password hashes
		user.comparePassword(password, function(err, isMatch){
			if(err){
				return done(err);
			}
			if(isMatch){
				return done(null, user);
			} else {
				return done(null, false, { message: 'invalid password' });
			}
		});
	});
}));

var routes = require('./routes/index');
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
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.session({ secret: 'secret' }));
//initialize Passport. Also use passport.session() middleware to support persistent login sessions
app.use(passport.initialize());
app.use(passport.session());
//
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req,res){
	res.render('index', { user: req.user });
});
app.get('/account', ensureAuthenticated, function(req,res){
	res.render('account', { user: req.user });
});
app.get('/login', function(req,res){
	res.render('login', { user: req.user, message: req.session.messages });
});

//POST /login
//use passport.authenticate() as route middleware to authenticate the
//request. If authentication fails, the the user will be redirected back
//to the login page.Otherwise, the primary route function handler will be 
//called.
app.post('/login', function(req,res,next){
	passport.authenticate('local', function(err, user, info){
		if(err){
			return next(err);
		}
		if(!user){
			req.session.messages = [info.message];
			return res.redirect('/login');
		}
		req.logIn(user, function(err){
			if(err){
				return next(err);
			}
			console.log('attempting to log in with user: ', user.username)
			return res.redirect('/');
		});
	})(req, res, next);
});

app.get('/logout', function(req,res){
	req.logout();
	res.redirect('/');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

//route middleware to ensure the user is authenticated
//call this middleware on any resource that needs to be protecgted
//If the request is authenticated, the request will succeed, otherwise, 
//they'll be redirected to the login page.
function ensureAuthenticated(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
}