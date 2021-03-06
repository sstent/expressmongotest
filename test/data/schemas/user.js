var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: {type: String, unique: true, required: true},
  name: String,
  password: String,
  is_admin: {type: Boolean, 'default': false }
});

UserSchema.methods.recentworkouts = function(callback) {
return this.model('workout')
.find({author: this._id})
//.sort('created_at', 1)
.limit(5)
.exec(callback);
};

module.exports = UserSchema;