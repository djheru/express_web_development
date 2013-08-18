//example middleware module
module.exports = function(forbidden_day){
	var days = [
		'Sunday', 
		'Monday', 
		'Tuesday', 
		'Wednesday', 
		'Thursday', 
		'Friday', 
		'Saturday'
	];
	
	//interface for middleware
	return function(req, res, next){
		
		//get current day
		var day = new Date().getDay();
		
		//check if current day is the forbidden day
		if(days[day] === forbidden_day){
			//if it is, send an error response
			res.send('No visitors allowed on ' + forbidden_day + 's!');
		}
		
		//You have to call the next middleware
		else{
			//keep working through the request/response
			next();
		}
	}
}
