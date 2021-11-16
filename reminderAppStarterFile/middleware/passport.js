const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GitHubStrategy = require("passport-github2").Strategy
const userController = require("../controller/userController");
const localLogin = new LocalStrategy(
  {
    usernameField: "email",
    // passwordField: "password",
  },
  (email, password, done) => {
    const user = userController.getUserByEmailIdAndPassword(email, password);
    return user
      ? done(null, user)
      : done(null, false, {
          message: "Your login details are not valid. Please try again",
        });
  }
);


// session has been created.  req.user = user
passport.serializeUser((user, done) => {
  done(null, user.id);
  console.log(user.id)
});

passport.deserializeUser((id, done) => {
  let user = userController.getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET

const gitHubLogin = (new GitHubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:3001/auth/github/callback"
},
(accessToken, refreshToken, profile, done) => {
  console.log(profile)
  let user = userController.getUserByGitHubIdOrCreate(profile);
  return done(null, user);
}
));

module.exports = passport.use(localLogin).use(gitHubLogin);
