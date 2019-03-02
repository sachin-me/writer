const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/User');

module.exports = {
  registerUser: (req, res) => {
    const registeredUser = new User(req.body);
    registeredUser.save((err, user) => {
      if (err) throw err;
      res.redirect('/');
    })
  },

  loginUser: () => {
    passport.authenticate('local', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/');
    }
  },

  logoutUser: (req, res) => {
    req.session.destroy();
    // req.logOut();
    res.redirect('/');
  }
}