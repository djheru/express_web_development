/*
 * GET home page.
 */

exports.index = function(req, res) {
	res.render('index', {
		title : 'Express'
	});
};
exports.get = function(req, res) {
	res.render('get', {
		title : 'Get Submissions'
	});
};
exports.getSubmit = function(req, res) {
	console.log(req.query);
	res.render('get', {
		title : 'Get Submissions Handler'
	});
};