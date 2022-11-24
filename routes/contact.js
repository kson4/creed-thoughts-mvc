const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contact");

router.get("/", contactController.show);
router.post("/sendMsg", contactController.sendMsg);

module.exports = router;
