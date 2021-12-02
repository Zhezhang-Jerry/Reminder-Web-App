const express = require("express");
const passport = require("../middleware/passport");
const imgur = require("imgur");
const fs = require("fs");
const loginDatabase = require("../models/userModel").loginDatabase
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const reminderController = require("../controller/reminder_controller"); //

const { ensureAuthenticated } = require("../middleware/checkAuth"); //

const router = express.Router();

router.get("/dashboard", ensureAuthenticated, reminderController.dashboard)

router.post("/uploads/", async (req, res) => {
    const file = req.files[0];
    const id = req.user.id
    try {
      const url = await imgur.uploadFile(`./uploads/${file.filename}`);
      const piclink = url.link.split(".").slice(0,-1).join(".") + "m.jpeg"
      const user = await prisma.user.update({
        where: {id},
        data: { picture: piclink}
      })
      fs.unlinkSync(`./uploads/${file.filename}`);
      res.redirect("/dashboard")
    } catch (error) {
      console.log("error", error);
    }
  });

router.get("/admin", ensureAuthenticated, reminderController.admin);

router.post("/destroy/:id", ensureAuthenticated, reminderController.destroy);

router.get("/", ensureAuthenticated, reminderController.list);

router.get("/new", ensureAuthenticated, reminderController.new);

router.get("/:id", ensureAuthenticated, reminderController.listOne);

router.get("/:id/edit", ensureAuthenticated, reminderController.edit);

router.post("/", ensureAuthenticated, reminderController.create);

router.post("/update/:id", ensureAuthenticated, reminderController.update);

router.post("/delete/:id", ensureAuthenticated, reminderController.delete);

module.exports = router;