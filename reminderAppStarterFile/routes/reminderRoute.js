const express = require("express");
const passport = require("../middleware/passport");

const reminderController = require("../controller/reminder_controller"); //

const { ensureAuthenticated } = require("../middleware/checkAuth") //

const router = express.Router();

router.get("/dashboard", ensureAuthenticated, reminderController.dashboard)

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