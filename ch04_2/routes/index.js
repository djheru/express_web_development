
/*
 * GET home page.
 */

exports.index = function(req, res){
  //res.render('index', { title: 'Express' });
  res.format({
  	//you can also just use the subtype (e.g. html) as the keys
  	'text/plain': function(){
  		res.send('welcome');
  	}, 
  	
  	'text/html': function(){
  		res.send('<h1>Welcome</h1>');
  	},
  	
  	'application/json': function(){
  		res.json({ message: 'welcome' });
  	},
  	
  	'default': function(){
  		res.send(406, 'Not Acceptable');
  	}
  });
};