const express = require("express"); //
const app = express(); //
require("dotenv").config()
const path = require("path"); //
const ejsLayouts = require("express-ejs-layouts"); //
const session = require("express-session"); //
const sessionStore = require("sessionstore")


const reminderRoute = require("./routes/reminderRoute");
const authRoute = require("./routes/authRoute");

app.use(express.static(path.join(__dirname, "public"))); //

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false })); // req.body
app.use(ejsLayouts); //

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
      store: sessionStore.createSessionStore()
    },
  })
); //

// app.use((req, res, next) => {
//   console.log(`User details are: `);
//   console.log(req.user);

//   console.log("Entire session object:");
//   console.log(req.session);

//   console.log("SessionID: ")
//   console.log(req.sessionID)

//   console.log("store")
//   console.log(req.sessionStore)

//   console.log(`Session details are: `);
//   console.log(req.session.passport);
//   next();
// });

const passport = require("./middleware/passport"); //
app.use(passport.initialize()); // use passport
app.use(passport.session()); // use session

app.use("/reminder", reminderRoute);
app.use("/auth", authRoute);

app.listen(3001, function () {
  console.log(
    "Server running. Visit: localhost:3001 in your browser 🚀"
  );
});

