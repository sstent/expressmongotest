function isAdmin(req, res, next) {
  if (req.session.user.is_admin === false) {
	res.redirect('/users/' + req.session.user.username);
  } else {
    next();
  }
}

module.exports = isAdmin;