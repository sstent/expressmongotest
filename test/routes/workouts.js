/*
 * workout Routes
 */

var async = require('async');

var Workout = require('../data/models/workout');
var notLoggedIn = require('./middleware/not_logged_in');
var loadWorkout = require('./middleware/load_workout');
var loggedIn = require('./middleware/logged_in');
var qs = require('querystring');
var maxWorkoutsPerPage = 5;

module.exports = function(app) {

  app.get('/workouts', loggedIn, function(req, res, next){
    var page = req.query.page  && parseInt(req.query.page, 10) || 0;
    async.parallel([

        function(next) {
          Workout.count(next);
        },

        function(next) {
          Workout.find({})
            //.sort('title', 1)
            .skip(page * maxWorkoutsPerPage)
            .limit(maxWworkoutsPerPage)
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

        var lastPage = (page + 1) * maxWorkoutsPerPage >= count;

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

  app.get('/workouts/:_id', loadWorkout, function(req, res, next){
    res.render('workouts/workout', {title: req.workout.title,
      workout: req.workout});
  });

  app.post('/workouts', loggedIn, function(req, res, next) {
    console.log("/nreq.body" + JSON.stringify(req.body));
    var workout = req.body;
    workout.author = req.session.user._id;
    Workout.create(workout, function(err) {
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

  app.del('/workouts/:title', loggedIn, loadWorkout, function(req, res, next) {
    req.workout.remove(function(err) {
      if (err) { return next(err); }
      res.redirect('/workouts');
    });

  });

};