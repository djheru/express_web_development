
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};
exports.include = function(req, res){
  res.render('include');
};
exports.inherit = function(req, res){
	  res.render('inherit');
};
exports.inherit_prepend = function(req, res){
	  res.render('inherit_prepend');
};
exports.inherit_append = function(req, res){
	  res.render('inherit_prepend');
};
exports.comment = function(req, res){
	  res.render('comment');
};
exports.mixin = function(req, res){
	  res.render('mixin', 
			  { heroes: [
							{name:'Fooman', role:'captain'},
							{name:'Barman',role:'entertainer'},
							{name:'Napman',role:'hacker'},
							{name:'Zipman',role:'collector'}
						]
	  });
};