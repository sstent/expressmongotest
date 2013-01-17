function loggedIn(req, res, next) {
  if (! req.session.user) {
    //res.send('Forbidden. Please log in first.', 403);
    res.redirect('/session/new');
  } else {
    next();
  }
}

module.exports = loggedIn;