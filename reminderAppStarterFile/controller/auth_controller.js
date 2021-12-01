let database = require("../models/userModel").loginDatabase;
const passport = require("../middleware/passport");
let userObject = require("../controller/reminder_controller").userObject
const session = require("express-session"); //
const fetch = require("node-fetch")
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


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

//     userObject[req.sessionID] = req.user.id
},

  registerSubmit: async (req, res) => {
    const { id, name, email, password } = req.body;
    const picid = process.env.UNSPLASH_ACCESS_ID;
    const url = `https://api.unsplash.com/photos/random/?client_id=${picid}`;
    const getPicture = async (url) => {
      const Data = await fetch(url);
      const newData = await Data.json();
      let picture = newData.urls.small;
      return picture
    }
      let picture = await getPicture(url)

      const user = await prisma.user.create({
        data: {  email, password, name, picture}
      })
      res.redirect("/auth/login")
    },
  logout: (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect("/auth/login")
  },
  githubLogin: (req, res, next) => {
    passport.authenticate('github', { scope: [ 'user:email' ] })(req, res, next)
  },
  gitback: (req, res, next) => {
    passport.authenticate('github', { failureRedirect: '/auth/login',  successRedirect: "/reminder/dashboard"})(req, res, next)
    
  },
  unsplashpic: () => {
    const clientID = process.env.UNSPLASH_ACCESS_ID;
  },
}

module.exports = authController;
