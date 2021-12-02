const session = require("express-session");
const sessionStore = require("sessionstore")
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient;
let userObject = require("../models/userModel")

let remindersController = {
  dashboard: async (req,res) => {
    let id = req.user.id
    let user = await prisma.user.findUnique( {where: {id}})
    userObject[req.sessionID] = id
    res.render("reminder/dashboard", { user: user, userPosition: user.role})
  }, 
  admin: async (req, res) => {
    let id = req.user.id
    let user = await prisma.user.findUnique( {where: {id}})
    if (user.role == "admin") {
      res.render("reminder/admin", { user: req.user, userObject: userObject })}
    },
  destroy: (req, res) => {
      let userSessionID = req.params.id;
      delete req.sessionStore.sessions[userSessionID]
      delete userObject[userSessionID]
      res.render("reminder/admin", {user: req.user, userObject: userObject})
  },
  list: async (req, res) => {
    let reminders = await prisma.reminder.findMany({
      where: { userID: req.user.id}
    })
    res.render("reminder/index", { reminders: reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: async (req, res) => {
    let reminderToFind = req.params.id;
    // });
    let reminder = await prisma.reminder.findUnique({ where: {id: parseInt(reminderToFind)}})
    let reminders = await prisma.reminder.findMany({where: {userID: req.user.id}})
    if (reminder != undefined) {
      res.render("reminder/single-reminder", { reminderItem: reminder });
    } else {
      res.render("reminder/index", { reminders: reminders });
    }
  },

  create: async (req, res) => {
    let userID = req.user.id;
    let title = req.body.title;
    let description = req.body.description;
    let completed = (req.body.completed === "true");
    const reminder = await prisma.reminder.create({
      data: {userID, title, description, completed}
    })
    res.redirect("/reminder");
  },

  edit: async (req, res) => {
    let reminderToFind = req.params.id;
    let reminder = await prisma.reminder.findUnique({ where: {id: parseInt(reminderToFind)}})
    res.render("reminder/edit", { reminderItem: reminder });
  },
  
  update: async (req, res) => {
    let reminderToFind = req.params.id;
    // let reminderArray = database.cindy.reminders[reminderToFind - 1]
    // reminderArray["title"] = req.body.title
    // reminderArray["description"] = req.body.description
    // reminderArray["completed"] = req.body.completed === "true"
    let reminder = await prisma.reminder.findUnique({ where: {id: parseInt(reminderToFind)}})
    let title = req.body.title;
    let description = req.body.description;
    let completed = (req.body.completed === "true");
    console.log(completed)
    const user = await prisma.reminder.update({
      where: {id: reminder.id},
      data: {title, description, completed}
    })
    res.redirect("/reminder");
  },

  delete: async (req, res) => {
    let reminderToFind = req.params.id;
    // database.cindy.reminders.splice(reminderToFind-1, 1);
    let reminder = await prisma.reminder.findUnique({ where: {id: parseInt(reminderToFind)}})
    let reminderTodelete = await prisma.reminder.delete({
      where: {id: reminder.id}
    })
    res.redirect("/reminder");
  },
};

module.exports = remindersController;
