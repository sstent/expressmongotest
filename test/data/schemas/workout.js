var Schema = require('mongoose').Schema;


var Split = new Schema({
  reps: { type: String},
  weight: { type: String},
  dropset: { type: Boolean }
});


var Element = new Schema({
  ExerciseID: { type: Schema.ObjectId, ref: 'exercise'},
  splits: [Split]
});


var ArticleSchema = new Schema({

userID: { type: Schema.ObjectId, ref: 'User', required: true },
workoutDate: { type: Date, 'default': Date.now },
workoutTime: { type: Date, 'default': Date.now },
privacySetting: { type: Number},
Notes: { type: String},
templateID: { type: Schema.ObjectId, ref: 'Template'},
circuits: [Number],
elements: [Element]

});

module.exports = ArticleSchema;