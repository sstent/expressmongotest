
/*
 * GET home page.
 */

var loggedIn = require('./middleware/logged_in');


module.exports = function(app) {
	app.get('/', loggedIn, function(req, res){
		res.render('index', { title: 'Express' });
	});
};