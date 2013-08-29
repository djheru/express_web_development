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
exports.post = function(req, res) {
	res.render('post', {
		title : 'Post Submissions'
	});
};
exports.getSubmit = function(req, res) {
	console.log(req.query);
	res.render('get', {
		title : 'Get Submissions Handler'
	});
};
exports.postSubmit = function(req, res) {
	console.log(req.body);
	res.render('post', {
		title : 'Post Submissions Handler'
	});
};
exports.uploads = function(req,res){
	res.render('upload', {
		title: 'Upload a thing',
		msg: ''
	});
}
exports.uploadHdlr = functino(req,res){
	console.log("Body: ", req.body);
	console.log("Files: ", req.files)
	res.render('upload', {
		title: 'Upload a thing',
		msg: 'thing uploaded'
	})
}