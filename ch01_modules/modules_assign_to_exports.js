//modules styles

//assignment to exports
var secret = 'zoltan';

module.exports = {
	
	name: 'Packt',
	
	lower: function(input){
		return input.toLowerCase();
	},
	
	upper: function(input){
		return input.toUpperCase();
	},
	
	get_name: function(){
		return this.name;
	},
	
	get_secret: function(){
		return secret;
	}

}
