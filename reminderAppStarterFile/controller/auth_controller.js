let database = require("../models/userModel").loginDatabase;
const passport = require("../middleware/passport");
let sessionData = require("../models/userModel").sessionData
const session = require("express-session"); //


let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  loginSubmit: (req, res, next) => {
    passport.authenticate("local", {
    successRedirect: "/reminder/dashboard", // req.login()
    failureRedirect: "/auth/login",
  }) (req, res, next)
    sessionData.push(req.sessionID)
},

  registerSubmit: (req, res) => {
    let registerObj = {
      id: database.length + 1,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }
    database.push(registerObj)
    res.redirect("/auth/login")
  },
  logout: (req, res) => {
    req.logout();
    req.session.destroy();
    sessionData.pop(req.sessionID)
    res.redirect("/auth/login")
  },
  githubLogin: (req, res, next) => {
    passport.authenticate('github', { scope: [ 'user:email' ] })(req, res, next)
  },
  gitback: (req, res, next) => {
    passport.authenticate('github', { failureRedirect: '/auth/login',  successRedirect: "/reminder/dashboard"})(req, res, next)
    
  }}

module.exports = authController;
