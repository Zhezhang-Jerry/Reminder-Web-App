const express = require("express");
const app = express();
require("dotenv").config()
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const session = require("express-session"); 
const sessionStore = require("sessionstore")
const multer = require("multer");
const imgur = require("imgur")
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient;

const reminderRoute = require("./routes/reminderRoute");
const authRoute = require("./routes/authRoute");

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, callback) => {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
});

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false })); // req.body
app.use(ejsLayouts); 
app.use(upload.any())

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
); 

const passport = require("./middleware/passport");
app.use(passport.initialize()); // use passport
app.use(passport.session()); // use session

app.use("/reminder", reminderRoute);
app.use("/auth", authRoute);

app.listen(3002, function () {
  console.log(
    "Server running. Visit: localhost:3002 in your browser 🚀"
  );
});

