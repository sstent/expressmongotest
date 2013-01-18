var mongoose = require('mongoose');
var workoutSchema = require('../schemas/workout');

var workout = mongoose.model('workout', workoutSchema);

module.exports = workout;