const mongoose = require('mongoose');
const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
let User = require('../models/User');

module.exports = (passport) => {

  // Searializing USer
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  })

  // Deserializing User
  passport.deserializeUser(function(id, done) {
    User.findById(id, (err, user) => {
      if (err) throw err;
      return done(err, user);
    })
  })

  passport.use(new LocalStrategy({
    usernameField: "email"
  }, function(email, password, done) {
    User.findOne({
      email: email
    }, function(err, user) {
      if (err) return done(err);
      if (!user) return done(null, false);
      if (!bcrypt.compareSync(password, user.password, done)) {
        return done(null, false)
      }
      return done(err, user);
    })
  }))
}