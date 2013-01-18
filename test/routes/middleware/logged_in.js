function loggedIn(req, res, next) {
  if (! req.session.user) {
    console.log("not logged in - redirecting to login");
    res.redirect('/session/new');
  } else {
    console.log("user logged in");
    next();
  }
}

module.exports = loggedIn;