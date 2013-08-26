var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	bcrypt = require('bcrypt'),
	SALT_WORK_FACTOR = 10,
	MAX_LOGIN_ATEMPTS = 5,
	LOCK_TIME = 2 * 60 * 60 * 1000;

var UserSchema = new Schema({
	username: {type: String, required: true, index: {unique: true}},
	password: {type: String, required: true},
	loginAttempts: {type: Number, required: true, default: 0},
	lockUntil: { type: Number }
});

UserSchema.virtual('isLocked').get(function(){
	//check for a future lockUntil timestamp
	return !!(this.lockUntil && this.lockUntil > Date.now());
});

//Constants to track the login failure reason
var reasons = UserSchema.statics.failedLogin = {
	NOT_FOUND: 0,
	PASSWORD_INCORRECT: 1,
	MAX_ATTEMPTS: 2
};

//mongoose middleware to hash the new or changed password
UserSchema.pre('save',function(next){
	var user = this;
	
	//only hash pw if it's new or modified
	if(!user.isModified('password')) return next();
	
	//generate a salt
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		if(err){
			return next(err);
		}
		
		//hash the password with the salt
		bcrypt.hash(user.password, salt, function(err, hash){
			if(err){
				return next(err);
			}
			
			//override the cleartext password with the hashed one
			user.password = hash;
			next();
		});//end hash
	}); //end genSalt
}); //end pre hook

UserSchema.methods.comparePassword = function(candidatePassword, cb){
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
		if(err){
			return cb(err);
		}
		cb(null, isMatch);
	});
};

USerSchema.methods.incLoginAttempts = function(cb){
	
	//if we have a previous lock that expired, restart loginAttempts at 1
	if(this.lockUntil && this.lockUntil < Date.now()){
		return this.update({
			$set: { loginAttempts: 1}, 
			$unset: { lockUntil: 1}
		}, cb);
	}
	
	//otherwise we update it
	var updates = { $inc: { loginAttempts: 1 }};
	//lock the account if max login attempts reached and it's not already locked
	if(this.loginAttempts + 1 > MAX_LOGIN_ATEMPTS && !this.isLocked){
		updates.$set = {lockUntil: Date.now() + LOCK_TIME};
	}
	return this.update(updates, cb);
}

UserSchema.statics.getAuthenticated = function(username, password, cb){
	this.findOne({username: username}, function(err, user){
		if(err) {
			return cb(err);
		}
		
		//make sure the user exists
		if(!user){
			return cb(null, null, reasons.NOT_FOUND);
		}
		
		//check if the account is locked
		if(user.isLocked){
			return user.incLoginAttempts(function(err){
				if(err){
					return cb(err);
				}
				return cb(null,null, reasons.MAX_ATTEMPTS);
			});
		}
		
		user.comparePassword(password, function(err, isMatch){
			if(err){
				return cb(err);
			}
			
			if(isMatch){
				//if there's no lock or failed attempts, return the user
				if(!user.loginAttempts && !user.lockUntil){
					return cb(null, user);
				}
				//reset attempts and lock timer
				var updates = {
						$set: {loginAttempts: 0},
						$unset: {lockUntil: 1}
				};
				return user.update(updates, function(err){
					if(err){
						return cb(err);
					}
					return cb(null, user);
				});
			}
			
			//incorrect pw
			user.incLoginAttempts(function(err){
				if(err){
					return cb(err);
				}
				return cb(null, null, reasons.PASSWORD_INCORRECT);
			});
		});
	});
};

module.exports = mongoose.model('User', UserSchema);