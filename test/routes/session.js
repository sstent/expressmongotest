/*
* Session Routes
*/
  var User = require('../data/models/user');
  var notLoggedIn = require('./middleware/not_logged_in');

module.exports = function(app) {
  app.get('/session/new', notLoggedIn, function(req, res) {
    res.render('session/new', {title: "Log in"});
    });

  app.post('/session', notLoggedIn, function(req, res) {
    User.findOne({username: req.body.username, password: req.body.password},
      function(err, user) {
        if (err) {
          return next(err);
        }
        if (user) {
          req.session.user = user;
          console.log("req.session.user= " + JSON.stringify(req.session.user));
          res.redirect('/users');
          } else {
          res.redirect('/session/new');
          }
      });
  });

  app.del('/session', function(req, res, next) {
      req.session.destroy();
      res.redirect('/session/new');
  });
};