
/*
 * GET home page.
 */

exports.index = function(req, res){
	var resData = {
		title: 'Superheroes',
		heroes: [
			{name: 'FooMan', role: 'captain', skills: ['dancing', 'invisibility']},
			{name: 'BarMan', role: 'entertainer', skills: ['bartending', 'mind control']},
			{name: 'BazWoman', role: 'enforcer', skills: ['kicking ass', 'taking names']}
		],
		message: 'The champs are back!', 
		html_message: 'The <b>CHAMPS</b> are back!'
	};
  res.render('index', resData);
};