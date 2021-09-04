const User = require("../models/User");
const passport = require("passport");

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

  loginUser: (req, res, next) => {
    passport.authenticate("local", (err, data, info) => {
      if (err) {
        return res.status(403).json({
          error: "Not able to login user. Please try after sometime :)",
        });
      }
      if (!data) {
        return res.status(404).json({
          error: "No matching user found. Please create a user.",
        });
      }
      const id = data._id;
      const { name, email } = data;
      const sId = req.session.id;
      req.session.userId = id;
      res.cookie("writer_session", sId, {
        expires: new Date(Date.now() + 84000000),
        httpOnly: true,
      });

      res.json({
        message: "You're logged in, successfully.",
        data: {
          name,
          email,
          id,
        },
      });
    })(req, res, next);
  },

  logoutUser: (req, res) => {
    req.session.destroy();
    // req.logOut();
    res.redirect("/");
  },
};
