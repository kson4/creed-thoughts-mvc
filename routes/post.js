const express = require("express");
const router = express.Router();
const postController = require("../controllers/post");

router.get("/:id", postController.showPost);

module.exports = router;
