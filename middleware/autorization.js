function requireLogin(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  next();
}

function redirectIfLoggedIn(req, res, next) {
  if (req.session.user) {
    return res.redirect("/home");
  }
  next();
}

module.exports = {
  requireLogin,
  redirectIfLoggedIn,
};
