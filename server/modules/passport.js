const mongoose = require('mongoose');
const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
let User = require('../models/User');

module.exports = () => {

  // Searializing USer
  passport.serializeUser(function(user, done) {
    console.log(user, 'inside serializeUser');
    done(nulll, user.id)
  })

  // Deserializing User
  passport.deserializeUser(function(id, done) {
    User.findById(id, (err, user) => {
      console.log(user, 'inside deserialize user');
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
      console.log(user, 'in local strategy');
      if (err) return done(err);
      if (!user) return done(null, false);
      if (!bcrypt.compareSync(password, this.password, done)) {
        return done(null, false)
      }
      return done(err, user);
    })
  }))
}