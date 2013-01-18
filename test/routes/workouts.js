/*
 * workout Routes
 */

var async = require('async');

var workout = require('../data/models/workout');
var notLoggedIn = require('./middleware/not_logged_in');
var loadworkout = require('./middleware/load_workout');
var loggedIn = require('./middleware/logged_in');
var qs = require('querystring');
var maxworkoutsPerPage = 5;

module.exports = function(app) {

  app.get('/workouts', loggedIn, function(req, res, next){
    var page = req.query.page  && parseInt(req.query.page, 10) || 0;
    async.parallel([

        function(next) {
          workout.count(next);
        },

        function(next) {
          workout.find({})
            //.sort('title', 1)
            .skip(page * maxworkoutsPerPage)
            .limit(maxworkoutsPerPage)
            .exec(next);
        }
      ],

      //  callback from async
      function(err, results) {

        if (err) {
          return next(err);
        }

        var count = results[0];
        var workouts = results[1];

        var lastPage = (page + 1) * maxworkoutsPerPage >= count;

        res.render('workouts/index', {
          title: 'workouts',
          workouts: workouts,
          page: page,
          lastPage: lastPage
        });

      }
    );
  });

  app.get('/workouts/new', loggedIn, function(req, res) {
    res.render('workouts/new', {title: "New workout"});
  });

  app.get('/workouts/:_id', loadworkout, function(req, res, next){
    res.render('workouts/workout', {title: req.workout.title,
      workout: req.workout});
  });

  app.post('/workouts', loggedIn, function(req, res, next) {
    console.log("/nreq.body" + JSON.stringify(req.body));
    var workout = req.body;
    workout.author = req.session.user._id;
    workout.create(workout, function(err) {
      if (err) {
        if (err.code === 11000) {
          res.send('Conflict', 409);
        } else {
          if (err.name === 'ValidationError') {
            return res.send(Object.keys(err.errors).map(function(errField) {
              return err.errors[errField].message;
            }).join('. '), 406);
          } else {
            next(err);
          }
        }
        return;
      }
      res.redirect('/workouts');
    });
  });

  app.del('/workouts/:title', loggedIn, loadworkout, function(req, res, next) {
    req.workout.remove(function(err) {
      if (err) { return next(err); }
      res.redirect('/workouts');
    });

  });

};