function notLoggedIn(req, res, next) {
  if (req.session.user) {
     res.redirect('/users/' + req.session.user.username);
  } else {
    next();
  }
}

module.exports = notLoggedIn;