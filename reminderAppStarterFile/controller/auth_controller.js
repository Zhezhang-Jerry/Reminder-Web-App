let database = require("../models/userModel").loginDatabase;
const passport = require("../middleware/passport");


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
  }) (req, res, next)},

  registerSubmit: (req, res) => {
    let registerObj = {
      id: database.length + 1,
      name: req.body.name,
      email: req.body.email,
      role: "basic",
      password: req.body.password
    }
    database.push(registerObj)
    res.redirect("/auth/login")
    console.log(database[database.length -1])
  },
  logout: (req, res) => {
    req.logout();
    res.redirect("/auth/login")
  },
  githubLogin: (req, res, next) => {
    passport.authenticate('github', { scope: [ 'user:email' ] })(req, res, next)
  },
  gitback: (req, res, next) => {
    passport.authenticate('github', { failureRedirect: '/auth/login',  successRedirect: "/reminder/dashboard"})(req, res, next)
  },
  admin: (req, res, next) => {
    // Will display active users on admin.ejs
    res.render("auth/admin", {
      name: req.user.name, 
      seshLis: req.sessionStore.all((err, sessions) => {
        return sessions
      })
    });
    //testing the output
    console.log(req.sessionStore.all((err, sessions) => {
      for (i of sessions){
        console.log(i)
      }
    }))
  }
}

module.exports = authController;
