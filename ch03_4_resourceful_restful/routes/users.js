
/*
 * GET users listing.
 */

exports.index = function(req, res){
  res.send("respond with users index");
};
exports.new = function(req, res){
  res.send("respond with form for new user");
};
exports.create = function(req, res){
  res.send("handle new user form post");
};
exports.show = function(req, res){
  res.send("respond with user " + req.params.user);
};
exports.edit = function(req, res){
  res.send("respond with form to edit " + req.params.user);
};
exports.update = function(req, res){
  res.send("handle edit user form put for " + req.params.user);
};
exports.destroy = function(req, res){
  res.send("Delete user " + req.params.user);
};