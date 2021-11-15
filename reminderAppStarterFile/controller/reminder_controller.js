let database = require("../database");
let sessionData = require("../models/userModel").sessionData
const userController = require("./userController")
const session = require("express-session");
const sessionStore = require("sessionstore")


let remindersController = {
  dashboard: (req,res) => {
    res.render("reminder/dashboard", { user: req.user})
  },
  admin: (req, res) => {
    let user = userController.getUserPosition(req.user.id)
    const sessionIDArray = Object.keys(req.sessionStore.sessions)
    console.log(sessionData)
    console.log(sessionIDArray)
    if (user.position == "admin") {
      res.render("reminder/admin", { user: req.user, sessionData: sessionIDArray})}
    },
    destroy: (req, res) => {
      let userSessionID = req.params.id;
      delete req.sessionStore.sessions[userSessionID]
      console.log(req.sessionStore)
  },
  list: (req, res) => {
    res.render("reminder/index", { reminders: database.cindy.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database.cindy.reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: database.cindy.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database.cindy.reminders.push(reminder);
    res.redirect("/reminder");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },
  
  update: (req, res) => {
    let reminderToFind = req.params.id;
    let reminderArray = database.cindy.reminders[reminderToFind - 1]
    reminderArray["title"] = req.body.title
    reminderArray["description"] = req.body.description
    reminderArray["completed"] = req.body.completed === "true"
    res.redirect("/reminder");
  },

  delete: (req, res) => {
    let reminderToFind = req.params.id;
    database.cindy.reminders.splice(reminderToFind-1, 1);
    res.redirect("/reminder");
  },
};

module.exports = remindersController;
