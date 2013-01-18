var Schema = require('mongoose').Schema;

var workoutSchema = new Schema({
  title: {
    type: String
  },
  body: String,
  author: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  created_at: {
    type: Date,
    'default': Date.now
  }
});

module.exports = workoutSchema;