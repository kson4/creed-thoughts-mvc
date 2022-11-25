const express = require("express");
const router = express.Router();
const mainController = require("../controllers/main");

router.get("/", mainController.homePage);
router.get("/login", mainController.login);
router.post("/signup", mainController.signup);

module.exports = router;
