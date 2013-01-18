
/*
 * GET home page.
 */

var loggedIn = require('./middleware/logged_in');
var isAdmin = require('./middleware/is_admin');

module.exports = function(app) {
	app.get('/', loggedIn, isAdmin, function(req, res){
		res.render('index', { title: 'Express' });
	});
};