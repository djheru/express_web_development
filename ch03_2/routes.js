//load the route handlers
var routes = require('./handlers');
var user = require('./handlers/users');

//extracting the route definitions to this module
module.exports = function(app){
	//define the routes
	app.get('/', routes.index);
	app.get('/users', user.list);
};


