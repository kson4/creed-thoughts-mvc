const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/upload");

router.get("/", uploadController.show);
router.post("/createPost", uploadController.createPost);

module.exports = router;
