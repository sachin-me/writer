const User = require("../models/User");

module.exports = {
  registerUser: (req, res) => {
    const registeredUser = new User(req.body);
    registeredUser.save((err, user) => {
      if (err) throw err;
      res.redirect("/");
    });
  },

  loginUser: (req, res) => {},

  logoutUser: (req, res) => {
    req.session.destroy();
    // req.logOut();
    res.redirect("/");
  },
};
