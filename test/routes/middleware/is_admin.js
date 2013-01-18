function isAdmin(req, res, next) {
  if (req.session.user.is_admin === false) {
  console.log("not an admin - sending to profile");
	res.redirect('/users/' + req.session.user.username);
  } else {
  console.log("Admin detected");
    next();
  }
}

module.exports = isAdmin;