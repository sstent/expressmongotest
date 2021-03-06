/*
 * User Routes
 */

var User = require('../data/models/user');
var notLoggedIn = require('./middleware/not_logged_in');
var loggedIn = require('./middleware/logged_in');
var loadUser = require('./middleware/load_user');
var isAdmin = require('./middleware/is_admin');
var restrictUserToSelf = require('./middleware/restrict_user_to_self');
var maxUsersPerPage = 5;

module.exports = function(app) {

  app.get('/users', loggedIn, isAdmin, function(req, res, next){
    var page = req.query.page && parseInt(req.query.page, 10) || 0;

    User.count(function(err, count) {
      if (err) {
      return next(err);
      }
      var lastPage = (page + 1) * maxUsersPerPage >= count;

      User.find({})
      .sort('name')
      .skip(page * maxUsersPerPage)
      .limit(maxUsersPerPage)
      .exec(function(err, users) {
        if (err) {
           return next(err);
        }
        res.render('users/index', {
          title: 'Users',
          users: users,
          page: page,
          lastPage: lastPage
        });
      });
    });
  });

  app.get('/users/new', notLoggedIn,   function(req, res) {
    res.render('users/new', {title: "New User"});
  });

  app.get('/users/:name', loadUser, function(req, res, next){
    req.user.recentworkouts(function(err, workouts) {
    if (err) {
    return next(err);
    }
    res.render('users/profile', {
    title: 'User profile',
    user: req.user,
    requested: req.params.name,
    recentworkouts: workouts
    });
    });
  });

  app.post('/users', notLoggedIn, function(req, res, next) {
    User.create(req.body, function(err) {
        if (err) {
           if (err.code === 11000) {
              res.send('Conflict', 409);
        } else {
          next(err);
        }
        return;
      }
      res.redirect('/users');
    });
  });

  app.del('/users/:name', loadUser,
    function(req, res, next) {
      req.user.remove(function(err) {
        if (err) { return next(err); }
        res.redirect('/users');
      });

  });

};