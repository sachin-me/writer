const isUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
    return next();
  }
  res.status(403).redirect("/login");
};

module.exports = isUser;
