var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: {type: String, unique: true},
  name: String,
  password: String,
});

UserSchema.methods.recentArticles = function(callback) {
return this.model('Article')
.find({author: this._id})
//.sort('created_at', 1)
.limit(5)
.exec(callback);
};

module.exports = UserSchema;