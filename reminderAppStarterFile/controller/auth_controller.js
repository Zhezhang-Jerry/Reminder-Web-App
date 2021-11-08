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
    let registerObj = {
      id: database.length + 1,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }
    database.push(registerObj)
    console.log(database)
    res.redirect("/login")
  },
};

module.exports = authController;
