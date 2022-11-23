const mongoDB = require("mongodb");
const Post = require("../models/Post");

module.exports = {
  show: async (req, res) => {
    res.render("create-post.ejs");
  },
  createPost: async (req, res) => {
    await Post.create({
      title: req.body.title,
      date: Date.now(),
      content: req.body.content,
      featured: req.body.featured,
      category: req.body.category,
      img: req.body.img,
    });
  },
};
