const express = require("express");
const router = express.Router();
const mainController = require("../controllers/main");

router.get("/", mainController.homePage);
router.post("/login", mainController.login);
router.post("/signup", mainController.signup);
router.get("/logout", mainController.logout);

module.exports = router;
