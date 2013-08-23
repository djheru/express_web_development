
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