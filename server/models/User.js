const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String
})

userSchema.pre('save', function(next) {
  if (this.password) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    console.log(this.password, 'inside pre hooks');
    next();
  } else {
    next();
  }
})

const User = mongoose.model('User', userSchema);
module.exports = User;