let database = require("../models/userModel").loginDatabase;
const passport = require("../middleware/passport");
let userObject = require("../models/userModel").userObject
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
    // userObject[req.sessionID] = req.user.id
},

  registerSubmit: async (req, res) => {
    const { id, name, email, password } = req.body;
    const picid = process.env.UNSPLASH_ACCESS_ID;
    const url = `https://api.unsplash.com/photos/random/?client_id=${picid}`;
    let picture = ""
    // const getPicture = async () => {
    //   const Data = await fetch(url);
    //   console.log(Data)
    //   const newData = Data.json();
    //   console.log(newData)
    //   let picture = newData.urls.small;
    //   console.log(picture)
    //   return picture
    // }
    let pic = fetch(url)
    .then((data) => data.json(data))
    .then((newData) => newData.urls.small)
    console.log(pic)
    const user = await prisma.user.create({
      data: { name, email, password, picture }
    })
      // const user = await prisma.user.create({
      //   data: {  email, password, name}
      // })
      res.redirect("/auth/login")
    },
  // registerSubmit: (req, res) => {
  //   const picid = process.env.UNSPLASH_ACCESS_ID;
  //   const url = `https://api.unsplash.com/photos/random/?client_id=${picid}`;
  //   fetch(url)
  //   .then((data) => data.json())
  //   .then((newData) => {
  //     console.log(newData)
  //     let userImage = newData.urls.small;
  //     console.log(userImage)
  //     let registerObj = {
  //       id: database.length + 1,
  //       name: req.body.name,
  //       email: req.body.email,
  //       password: req.body.password,
  //       pic: userImage,
  //     };
  //     database.push(registerObj)
  //   })
  //   res.redirect("/auth/login")
  // },
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
