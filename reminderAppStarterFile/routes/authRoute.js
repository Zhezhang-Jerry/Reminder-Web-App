const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated, ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");
const authController = require("../controller/auth_controller")
// const fetch = require("node-fetch");

const router = express.Router();

router.get("/login", forwardAuthenticated, authController.login);
router.get("/register", authController.register);
router.post("/login", authController.loginSubmit);
router.post("/register", authController.registerSubmit);
router.get("/logout", authController.logout)
router.get("/github", authController.githubLogin)
router.get("/github/callback", authController.gitback)
router.get("/admin", isAdmin, authController.admin)

module.exports = router;
