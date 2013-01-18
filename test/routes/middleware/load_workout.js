var workout = require('../../data/models/workout');

function loadworkout(req, res, next) {
  workout.findOne({title: req.params.title})
    .populate('author')
    .exec(function(err, workout) {
      if (err) {
        return next(err);
      }
      if (! workout) {
        return res.send('Not found', 404);
      }
      req.workout = workout;
      next();
    });
}

module.exports = loadworkout;