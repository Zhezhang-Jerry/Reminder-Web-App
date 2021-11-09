const express = require("express"); //
const app = express(); //
const path = require("path"); //
const ejsLayouts = require("express-ejs-layouts"); //
const session = require("express-session") //

const reminderRoute = require("./routes/reminderRoute")
const authRoute = require("./routes/authRoute")

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
    },
  })
); //

const passport = require("./middleware/passport"); //
app.use(passport.initialize()); // use passport
app.use(passport.session()); // use session

app.use("/reminder", reminderRoute);
app.use("/auth", authRoute);

app.listen(3001, function () {
  console.log(
    "Server running. Visit: localhost:3001/reminder in your browser 🚀"
  );
});
