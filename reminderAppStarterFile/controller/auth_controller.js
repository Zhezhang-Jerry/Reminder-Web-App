let database = require("../models/userModel").loginDatabase;
const passport = require("../middleware/passport");


let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  loginSubmit: passport.authenticate("local", {
    successRedirect: "/reminder", // req.login()
    failureRedirect: "/login",
  }),

  registerSubmit: (req, res) => {
    // implement
  },
};

module.exports = authController;
