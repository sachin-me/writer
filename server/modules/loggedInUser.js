const User = require("../models/User");

module.exports = {
  async isLoggedIn(req, res, next) {
    const { userId } = req.session;
    if (userId) {
      const user = await User.findOne({ _id: userId }).select("-password");
      if (!user) {
        return res.json({
          error: "No matching user found.",
        });
      } else {
        next();
      }
    } else {
      return res.json({
        error: "Please login to continue.",
      });
    }
  },
};
