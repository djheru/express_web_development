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
exports.upload = function(req,res){
	res.render('upload', {
		title: 'Upload a thing',
		msg: ''
	});
}
exports.uploadHdlr = function(req,res, next){
	var fs = require('fs');
	var name = req.body.name;
	//refference to the profile image object
	var profile_image = req.files.profile_image;
	
	//tmp location
	var tmp_path = profile_image.path;
	
	//new location: 
	var target_path = './public/images/' + profile_image.name;
	
	//move the file
	fs.rename(tmp_path, target_path, function(err){
		//if an error is encountered, pass it to the next
		if(err){
			next(err);
		}
		//delete the tmp file
		fs.unlink(tmp_path, function(){
			//if an error is encountered, pass it to nex
			if(err){
				next(err);
			}
			console.log('file uploaded to: ', target_path);
			res.redirect('/images/' + profile_image.name);
		});
	});
}