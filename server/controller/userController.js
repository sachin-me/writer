const User = require("../models/User");

module.exports = {
  create: (req, res) => {
    const { name, email, password } = req.body;

    if (!name && !email && !password) {
      return res.status(400).json({
        error: "Name, Email, and Password is required.",
      });
    }

    if (!name) {
      return res.status(400).json({
        error: "Name is required.",
      });
    }
    if (!email) {
      return res.status(400).json({
        error: "Email is required.",
      });
    }
    if (!password) {
      return res.status(400).json({
        error: "Password is required.",
      });
    }

    User.findOne({ email: email }, (err, user) => {
      if (err) {
        return res.status(404).json({
          error: "Unable to find the user.",
        });
      } else {
        if (!user) {
          const newUser = new User({
            name,
            email,
            password,
          });
          newUser.save((error) => {
            if (error) {
              return res.status(500).json({
                error: "Failed to create user. Please try again.",
              });
            } else {
              return res.status(200).json({
                message: "User created successfully",
                data: {
                  id: newUser._id,
                  name,
                  email,
                },
              });
            }
          });
        } else {
          return res.status(400).json({
            error: "User already exist. Please login.",
          });
        }
      }
    });
  },

  loginUser: (req, res) => {},

  logoutUser: (req, res) => {
    req.session.destroy();
    // req.logOut();
    res.redirect("/");
  },
};
