var cluster = require('cluster');
//master process, starts the workers
if(cluster.isMaster){
	
	//get the number of available CPUs
	var cpu_count = require('os').cpus().length;
	
	//create a worker for each core
	require('os').cpus().forEach(function(){
		//start a worker process
		cluster.fork();
	});
	
	//if a worker dies, we should re-spawn another
	cluster.on('exit', function(worker, code, signal){
		cluster.fork();
	});	
}else{
	var worker_id = 'Worker' + cluster.worker.id;

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
	app.set('port', process.env.PORT || 8000);
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

	app.get('/', function(req,res){
		//resource intensive operation
		var a = [];
		for(var i=0; i < 100000; i++){
			a.push(i);
		}
		
		res.send(a.toString())
	});
	app.get('/users', user.list);

	http.createServer(app).listen(app.get('port'), function(){
	  console.log('Express server started by ' + worker_id + ' listening on port ' + app.get('port'));
	});

}