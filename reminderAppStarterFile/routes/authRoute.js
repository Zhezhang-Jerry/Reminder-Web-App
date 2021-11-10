const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");
const authController = require("../controller/auth_controller")
const fetch = require("node-fetch");

const router = express.Router();

router.get("/login", forwardAuthenticated, authController.login);
router.get("/register", authController.register);
router.post("/login", authController.loginSubmit);
router.post("/register", authController.registerSubmit);
router.get("/logout", authController.logout)
router.get("/github", authController.githubLogin)
router.get("/github/callback", authController.gitback)

module.exports = router;
