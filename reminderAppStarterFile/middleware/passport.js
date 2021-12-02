const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GitHubStrategy = require("passport-github2").Strategy
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient;
const localLogin = new LocalStrategy(
  {
    usernameField: "email",
    // passwordField: "password",
  },
  async(email, password, done) => {
    const user = await prisma.user.findUnique({
      where: {email}
        })
      if (user && user.password == password ) {
        return done(null, user)
      }
      return done(null, false, {
        message: "Your login details are not valid. Please try agian"
      }) 

  }
);


// session has been created.  req.user = user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  let user = await prisma.user.findUnique({ where: {id}});
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

const gitHubLogin = new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3002/auth/github/callback",
  },
  async (accessToken, refreshToken, profile, done) => {
    let user = await prisma.user.findUnique( {where: {id: parseInt(profile.id)}})
    if (user) {
      return done(null, user);
    } else {
      user = await prisma.user.create({
        data: {
          id : parseInt(profile.id),
          name: profile.username,
          picture: profile.photos[0].value,
        }
      })
      return done(null, user)
    }
  }
);

module.exports = passport.use(localLogin).use(gitHubLogin);
